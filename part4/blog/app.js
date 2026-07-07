const express = require('express');
const Blog = require('./models/blog');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blog');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const config = require('./utils/config');
const app = express();

logger.info('Connecting to', config.mongoDBURI);

mongoose
  .connect(config.mongoDBURI, { family: 4 })
  .then((result) => {})
  .catch((error) => console.log('Error connecting', error));

app.use(express.json());
app.use(middleware.requestLogger);

app.use(blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
