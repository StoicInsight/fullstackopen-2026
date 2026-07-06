const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(morgan());
app.use(cors());

const PORT = process.env.PORT || 3005;
const phones = [
  {
    name: 'Kial',
    number: '3213232323232',
    id: '1',
  },
  {
    name: 'Yasw',
    number: '9081232123',
    id: '2',
  },
];

// GET PHONES
app.get('/', (request, response) => {
  return response.send(phones);
});

app.listen(PORT, () => {
  console.log('App running on PORT: ', PORT);
});
