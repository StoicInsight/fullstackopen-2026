const express = require('express');
const Blog = require('./models/blog');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blog');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const config = require('./utils/config');
const app = express();

logger.info('Connecting to', config.mongoURI);

mongoose
  .connect(config.mongoURI, { family: 4 })
  .then((result) => {
    console.log('Connected to DB', result);
  })
  .catch((error) => console.log('Error connecting', error));

app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
