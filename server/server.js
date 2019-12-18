const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.post('/api/images/',(req,res,next) => { // Create
  // Grab information from request
  // Format
  // Send off to db
  // Return response
});

app.get('/api/images/:restaurantId',(req,res,next) => { // Read
  // Grab the images from the database
  // Return to client
});

app.patch('/api/images/:restaurantId',(req,res,next) => { // Update
  // Find images from database
  // If exists
    // update
  // Else
    // Return error

  //return success
});

app.delete('/api/images/:restaurantId',(req,res,next) => { // Delete
  // Find images from database
  // If exists
    // delete
  // Else
    // Return error

  //return success
});

app.listen((err) => {
  console.log(`[Server] Running on port ${PORT}`);
})