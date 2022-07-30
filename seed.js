const db = require('./db')
const mongoose = require('mongoose')
const user = require('./app/users/model')
const skill = require('./app/skills/model')

user.findOneAndRemove({
  _id: '5e96cbe292b97300fc903345'
});

skill.deleteMany(
  {_id: '5e96cbe292b97300fc901111'},
  {_id: '5e96cbe292b97300fc901112'},
  {_id: '5e96cbe292b97300fc901113'}
)

let userData = {
  _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
  name: 'admin',
  email: 'admin@mail.com',
  username: 'admin',
  password: 'admin',
  profile: 'board',
  skill: mongoose.Types.ObjectId('5e96cbe292b97300fc901113'),
};

let skillData = [
  {
    _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901111'),
    name: 'Skill 1'
  },
  {
    _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901112'),
    name: 'Skill 2'
  },
  {
    _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901113'),
    name: 'Skill 3'
  }
];

user.create(userData)
skill.insertMany(skillData)