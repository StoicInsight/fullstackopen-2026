const express = require('express');
const morgan = require('morgan');
const logger = require('./middleware');
const mongoose = require('mongoose');
const Phone = require('./models/phone');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(morgan());
app.use(express.static('dist'));
app.use(logger.requestLogger);
// const url = '/api';
// let people = [
//   {
//     id: '1',
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: '2',
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: '3',
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: '4',
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//   },
// ];

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

app.post('/api/people', (request, response) => {
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

app.get(`/api/people`, (request, response) => {
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

app.get('/api/people/:id', (request, response) => {
  Phone.findById(request.params.id).then((phone) => {
    console.log('Found phone', phone);
    response.json(phone);
  });
});

app.delete('/api/people/:id', (request, response) => {
  const id = request.params.id;
  const newPeople = people.filter((pep) => pep.id !== id);

  response.send(newPeople);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);

const port = process.env.PORT || 3005;
app.listen(port);
