const express = require('express');
const app = express();

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'Hello from the server side!',
  });
});

app.post('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'Hello POST Req Here!',
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
