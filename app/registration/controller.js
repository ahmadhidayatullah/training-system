const User = require('../users/model')

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const payload = req.body
      
      let user = new User(payload)
      
      await user.save()

      res.status(200).json({ message: 'create success' })

    } catch (err) {
      next(err)
    }
  }
}