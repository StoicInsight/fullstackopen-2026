const mongoose = require('mongoose');
require('dotenv').config();
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { family: 4 })
  .then((result) => {
    console.log('Connected to DB', result);
  })
  .catch((error) => console.log('Error connecting', error));

module.exports = mongoose.model('Blog', blogSchema);
