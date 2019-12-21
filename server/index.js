const express = require('express');
require('dotenv').config();
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db/index.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/api/images/:restaurantId', (req, res) => {
  const id = req.params.restaurantId;
  db.get(id)
    .then(entry => res.status(200).send(entry))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

app.post('/api/images', (req, res) => {
  const data = req.body;
  db.insert(data)
    .then(res.status(201).end())
    .catch(err => console.log('Error occurs in Post'))
});

app.put('/api/images/:restaurantId', (req, res) => {
  const data = req.body;
  const id = req.params.restaurantId;
  console.log("=============");
  console.log(data);
  console.log(id);
  db.updateData(id, data)
    .then(res.status(201).end())
    .catch(error => console.log('Error occurs in Put'))
});

app.delete('/api/images/:restaurantId', (req, res) => {
  const id = req.params.restaurantId;
  console.log("ID==========="+id);
  db.del(id)
    .then(res.status(201).end())
    .catch(error => console.log('Error occurs in Delete'))
});

const port = process.env.PORT || 3001;

app.listen(port, console.log(`Server running on port: ${port}`));
