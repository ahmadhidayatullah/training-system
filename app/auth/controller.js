const User = require('../users/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  signup: async (req, res, next) => {
    try {
      const payload = req.body

      let user = new User(payload)

      await user.save()

      delete user._doc.password

      res.status(200).json({ data: user })

    } catch (err) {
      if (err && err.name === "ValidationError") {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors
        })
      }
      next(err)
    }
  },

  login: (req, res, next) => {
    const { username, password } = req.body

    User.findOne({ username: username }).select('+password').then((user) => {
      if (user) {
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (checkPassword) {
          const token = jwt.sign({
            user: {
              id: user.id
            }
          }, config.jwtKey)

          res.status(200).json({
            'token': token,
            'profile': user.profile
          })

        } else {
          res.status(401).json({
            message: 'invalid login'
          })
        }
      } else {
        res.status(401).json({
          message: 'invalid login'
        })
      }

    }).catch((err) => {
      res.status(500).json({
        message: err.message || `Internal server error`
      })

      next()
    })
  },

  logout: (req, res) => {
    res.status(200).json({
      message: 'logout success'
    })
  }
}