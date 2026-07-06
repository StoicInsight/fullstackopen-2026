const express = require('express');
const morgan = require('morgan');
const logger = require('./middleware');

const app = express();
app.use(express.json());
app.use(morgan());
app.use(express.static('dist'));
app.use(logger.requestLogger);
// const url = '/api';
let people = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

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

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  if (!person.name || !person.number) {
    return response.status(400).json({ error: 'Missing name or number' });
  }

  people.forEach((pep) => {
    if (pep.name === person.name) {
      return response.status(400).json({ error: 'Name already exists' });
    }
    if (pep.number === person.number) {
      return response.status(400).json({ error: 'Number already exists' });
    }
  });

  people = people.concat(person);
  return response.json(people);
});

app.get(`/`, (request, response) => {
  console.log('Request:', request, 'Response: ', response);
  response.send(people);
});

app.get('/info', (request, response) => {
  const count = people.length;
  const time = new Date().toISOString();
  response.send(`Phonebook has info for ${count} people </br> ${time}`);
});

app.get('/person/:id', (request, response) => {
  const id = request.params.id;
  const person = people.find((per) => per.id === id);

  response.send(person);
});

app.delete('/person/:id', (request, response) => {
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
