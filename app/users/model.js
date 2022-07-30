const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

let userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'email is required']
  },
  name: {
    type: String,
    require: [true, 'name is required'],
    maxlength: [225, "the length of the username must be between 3 to 225 characters"],
    minlength: [3, "the length of the username must be between 3 to 225 characters"]
  },
  username: {
    type: String,
    require: [true, 'username is required'],
    maxlength: [225, "the length of the username must be between 3 to 225 characters"],
    minlength: [3, "the length of the username must be between 3 to 225 characters"]
  },
  password: {
    type: String,
    require: [true, 'password is required'],
    maxlength: [225, "maxlength is 255 characters"],
    select: false
  },
  profile: {
    type: String,
    enum: ['board', 'expert', 'trainer', 'competitor'],
    default: 'competitor'
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    require: false
  },

}, { timestamps: true })

userSchema.path('email').validate(async function (value) {
  try {
    const count = await this.model('Users').countDocuments({ email: value })
    return !count;
  } catch (err) {
    throw err
  }

}, attr => `${attr.value} already exists`)

userSchema.path('username').validate(async function (value) {
  try {
    const count = await this.model('Users').countDocuments({ username: value })
    return !count;
  } catch (err) {
    throw err
  }

}, attr => `${attr.value} already exists`)

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, HASH_ROUND)
  next()
})

module.exports = mongoose.model('Users', userSchema)
