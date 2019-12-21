const express = require('express'),
      client  = require('./db/database');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/api/images/',(req,res,next) => { // Create
  const query = `INSERT INTO zagat.restaurants (id,images,name) VALUES (${req.body.id},${req.body.images},${req.body.name})`;

  client.execute(query)
    .then(() => {
      res.send({
        ok: true,
        message: "Post success"
      })
    }).catch(() => {
      res.send({
        ok: false,
        message: "Post error"
      })
    })
});

app.get('/api/images/:restaurantId',(req,res,next) => { // Read
  const id = parseInt(req.params.restaurantId);

  const query = `SELECT * FROM restaurants WHERE id = ${id}`;
  client.execute(query)
    .then((result) => {
      res.send(result.rows[0]);
    });
});

app.patch('/api/images/:restaurantId',(req,res,next) => { // Update
  // req.body.updates should be an array of changes (ex: ["name=hello","images=['googe.com']"])
  // const query = `UPDATE ${...req.body.updates} FROM restaurants WHERE id = ${req.body.id}`;

  let updates = "";
  for(var i = 0; i < req.body.updates.length; i++) {
    updates += req.body.updates[i] + " ";
  }

  const query = `UPDATE ${updates} FROM restaurants WHERE id = ${req.body.id}`;
  client.execute(query)
    .then(() => {
      res.send({
        ok: true,
        message: "Updated"
      })
    }).catch(() => {
      res.send({
        ok: false,
        message: "Update error"
      })
    })
});

app.delete('/api/images/:restaurantId',(req,res,next) => { // Delete
  const query = `DELETE FROM zagat.restaurants WHERE id = ${req.body.id}`;
  client.execute(query)
    .then(() => {
      res.send({
        ok: true,
        message: "Deleted"
      })
    }).catch(() => {
      res.send({
        ok: false,
        message: "Delete error"
      })
    })
});

app.listen(PORT, (err) => {
  console.log(`[Server] Running on port ${PORT}`);
})