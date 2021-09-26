const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
   },
   handle: {
      type: String,
      required: true,
      max: 40
   },
   school: {
      type: String
   },
   status: {
      type: String,
      required: true
   },
   location: {
      type: String
   },
   skills: {
      type: [String],
      required: true
   },
   article: [
    {
       title: {
          type: String,
          required: true
       },
       description: {
          type: String,
          required: true
       },
       like: {
           type: Number,
           default: 0
       },
       hate: {
            type: Number,
            default: 0
       },
       date: {
           type: Date,
           default: Date.now
       }
    }
   ],
   date: {
      type: Date,
      default: Date.now
   }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);