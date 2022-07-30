const mongoose = require('mongoose')

let skillSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'name is required']
  }

}, { timestamps: true })

module.exports = mongoose.model('Skills', skillSchema)
