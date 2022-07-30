const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

let activitySchema = mongoose.Schema({
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skills'
  },
  title: {
    type: String,
    require: [true, 'name is title'],
    maxlength: [225, "the length of the username must be between 3 to 225 characters"],
    minlength: [3, "the length of the username must be between 3 to 225 characters"]
  },
  description: {
    type: String,
    require: [true, 'description is required']
  },
  start_date: {
    type: Date,
    require: [true, 'start date is required']
  },
  end_date: {
    type: Date,
    require: [true, 'end date is required']
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }]
}, { timestamps: true })

activitySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Activities', activitySchema);
