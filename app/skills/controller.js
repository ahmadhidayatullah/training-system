const Skill = require('../skills/model')

module.exports = {
  list: async (req, res, next) => {
    try {

      const data = await Skill.find().select('id name');
  
      res.status(200).json({ data })

    } catch (err) {
      next(err)
    }
  }
}