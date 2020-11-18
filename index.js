const express = require("express");
const data = require("./data.json");
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const app = express();

let { NODE_ENV = 'development', PORT = 5000 } = process.env
PORT = process.env.NODE_ENV === 'test' ? 5001 : 5000;

app.use(express.json());

app.get('/api/data', (req, res, next) => {
  res.json(data.notes);
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

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', PORT);
});
