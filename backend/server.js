const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'NUSA Backend LIVE!' });
});

app.listen(5000, () => {
  console.log('Server: http://localhost:5000');
});