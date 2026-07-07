const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.MONGO_URI

mongoose
  .connect(url, { family: 4 })
  .then((result) => {
    console.log('Connected to mongo', result)
  })
  .catch((error) => {
    console.log('Error connecting', error)
  })

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
  },
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Phone', phoneSchema)
// const phone = new Phone({
//   name: 'Pierre',
//   number: '932-213-3212',
// });

// phone.save().then((result) => {
//   console.log('Phone saved');
//   mongoose.connection.close();
// });
