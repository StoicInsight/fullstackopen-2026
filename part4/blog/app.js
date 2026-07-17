const express = require('express');
const Blog = require('./models/blog');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
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

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
