const mongoose = require('mongoose')
const { urlDb } = require('../config')

mongoose.connect(urlDb).then(()=>console.log('connected'))
.catch(e=>console.log(e));

const db =  mongoose.connection

module.exports = db