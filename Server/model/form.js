const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the form schema
const formSchema = new Schema({
  labno: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  fromTime: {
    type: String,
    required: true,
  },
  toTime: {
    type: String,
    required: true,
  },
  personID: {
    type: String,
    required: true,
  },
  personName: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: false,
  },
}, {
  timestamps: true, 
});

formSchema.pre('save', function(next) {
  const currentDate = new Date();
  const istOffset = 330; // IST offset in minutes (5 hours 30 minutes)
  
  // Adjusting createdAt and updatedAt to IST
  if (this.isNew) {
    this.createdAt = new Date(currentDate.getTime() + istOffset * 60000);
  }
  this.updatedAt = new Date(currentDate.getTime() + istOffset * 60000);

  next();
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
