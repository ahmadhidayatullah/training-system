const config = require('../../config')
const jwt = require('jsonwebtoken')
const User = require('../users/model')

module.exports = {
  authenticate: async (req, res, next) => {
    try {
      const token = req.query.token ? req.query.token : null
      // const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

      const data = jwt.verify(token, config.jwtKey)

      const user = await User.findOne({ _id: data.user.id })

      if (!user) {
        throw new Error()
      }
      req.user = user
      req.token = token
      next()
    } catch (err) {
      res.status(401).json({
        message: 'Unauthorized user'
      })
    }

  },

  permission: (profile) => {
    return (req, res, next) => {
      try {

        if (req.user.profile !== profile) {
          throw new Error()
        }

        next()
      } catch (err) {
        res.status(401).json({
          message: 'Unauthorized user'
        })
      }
    }
  }
}