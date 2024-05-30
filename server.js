// Import Express
const express = require('express');

// Import Node path module
const path = require('path');

// Set dynamic server port
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving up the public directory to the browser
app.use(express.static('public'));

// Serve single HTML file when user visit /services endpoint
app.get('/services', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/services.html'))
);

// CREATE -> http POST
// READ ---> http GET
// UPDATE -> http PUT
// DELETE -> http DELETE

const shows = ['Mr. Robot', 'GOT', 'Fringe', '3 Body Problem'];

// GET ALL SHOWS
app.get('/api/shows', (req, res) => {
  console.info(`GET /api/shows`);

  // Send back all shows
  res.json(shows);
});

// GET SINGLE SHOW by ID (index in the shows array)
app.get('/api/shows/:id', (req, res) => {
  console.info(`GET /api/shows/${req.params.id}`);

  // Extract show id (show's index position in shows array)
  const id = req.params.id;

  // If no matching show is found, respond 404 and return out of function
  if (!shows[id]) {
    res.status(404).json({ msg: 'Show not found' });
    return;
  }

  // Send back the single show
  res.status(200).json(shows[id]);
});

// ADD NEW SHOW
app.post('/api/shows', (req, res) => {
  console.info(`POST /api/shows`);

  // Extract the new show from the req.body
  // Note that the new show is in a property called show in a JSON request body
  const newShow = req.body.show;

  // Add the new shows to the existing shows
  shows.push(newShow);

  // Send back the udpated shows with a status code of 200
  res.status(200).json(shows);
});

// UPDATE EXISTING SHOW BY ID
app.put('/api/shows/:id', (req, res) => {
  // Capture show id from req.params
  const id = req.params.id;

  // Capture updated show title from req.body
  const updatedShow = req.body.show;

  // If no matching show is found, respond 404 and return out of function
  if (!shows[id]) {
    res.status(404).json({ msg: 'Show not found' });
    return;
  }

  // Update selected show with new show title
  shows[id] = updatedShow;

  // Respond to client with updated shows list
  res.status(200).json(shows);
});

// DELETE SHOW BY ID
app.delete('/api/shows/:id', (req, res) => {
  // Capture show id from req.params
  const id = req.params.id;

  // Remove the selected show from the shows array
  // Check out docs on array.splice() for info about the args passed into that function
  shows.splice(id, 1);

  // Send back updated list of shows
  res.status(200).json(shows);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
