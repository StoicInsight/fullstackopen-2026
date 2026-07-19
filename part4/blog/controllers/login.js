const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const loginRouter = require('express').Router();
require('dotenv').config();

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const passwordCheck =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCheck)) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  const userToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: 60 * 60 });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id });
});

module.exports = loginRouter;
