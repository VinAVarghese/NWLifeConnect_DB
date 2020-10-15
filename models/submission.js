const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  updating:Boolean,
  name: {
    type: String,
    required: true,
  },
  address: String,
  apt: String,
  city: String,
  zip: String,
  email: String,
  phone: String,
  birthday: String,
  occupation: String,
  age: String,
  invitedBy: String,
  attendance: String,
  nextStepRelationship: Boolean,
  readyToServe: Boolean,
  nextStepOther: Boolean,
  otherContent: String,
  prayerPraise: String,
  confidential: Boolean
}, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;