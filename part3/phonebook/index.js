const express = require('express');
const morgan = require('morgan');
const logger = require('./middleware');
const mongoose = require('mongoose');
const Phone = require('./models/phone');
const app = express();
require('dotenv').config();

app.use(express.static('dist'));
app.use(express.json());
app.use(morgan());
app.use(logger.requestLogger);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' });
  }

  next(error);
};

const generateId = () => {
  const max =
    people.id > 0
      ? Math.max(
          ...people,
          people.map((p) => Number(p.id)),
        )
      : 0;

  return String(max + 1);
};

app.post('/people', (request, response) => {
  const body = request.body;
  if (!body) {
    return response.status(400).json({ error: 'Content missing' });
  }

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'Missing name or number' });
  }

  const person = new Phone({
    name: body.name,
    number: String(body.number),
  });

  person.save().then((savedPerson) => {
    console.log('Added new person:', savedPerson);
    response.json(savedPerson);
    mongoose.connection.close();
  });
});

app.get(`/people`, (request, response) => {
  console.log('Request:', request, 'Response: ', response);
  // response.send(people);
  Phone.find({}).then((phone) => {
    console.log('Finding phone' + phone);
    response.json(phone);
  });
});

app.get('/info', (request, response) => {
  const count = people.length;
  const time = new Date().toISOString();
  response.send(`Phonebook has info for ${count} people </br> ${time}`);
});

app.get('/people/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then((phone) => {
      console.log('Found phone', phone);
      response.json(phone);
    })
    .catch((error) => {
      console.log('Error getting person', error);
      next(error);
      response.status(500).send({ error: 'Malformated id' });
    });
});

app.put('/people/:id', (request, response, next) => {
  const { name, number } = request.body;

  Phone.findById(request.params.id)
    .then((phone) => {
      if (!phone) {
        return response.status(404).end();
      }
      phone.name = name;
      phone.number = number;
      return phone.save().then((updatedPhone) => {
        response.json(updatedPhone);
      });
    })
    .catch((error) => next(error));
});

app.delete('/people/:id', (request, response, next) => {
  const id = request.params.id;
  Phone.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end;
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);

const port = process.env.PORT || 3005;
app.listen(port);
