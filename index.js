const express = require("express");
const data = require("./data.json");
const fs = require('fs');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const app = express();

// let { NODE_ENV = 'development', PORT = 5000 } = process.env
// PORT = process.env.NODE_ENV === 'test' ? 5001 : 5000;
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/data', (req, res, next) => {
  res.json(data.notes);
});

app.get('/api/data/:id', (req, res, next) => {
  const notes = data.notes;
  const id = parseInt(req.params.id);
  if (!notes[id]) {
    res.status(404).send('The note with the given ID was not found')
  }
  res.json(data.notes[id]);
});

app.post('/api/data', (req, res, next) => {
  const newNote = req.body;
  newNote['id'] = data.nextId;
  data.notes[newNote.id] = newNote;
  data.nextId++;
  if (!req.body.content || req.body.content.length < 3) {
    res.status(400).send('Content is required and should be a minimum of 3 characters')
    return;
  }
  fs.writeFile('./data.json', JSON.stringify(data, null, 2), err => {
    if (err) {
      next(err);
    }
    res.json(newNote);
  })
});



app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}...`);
});
