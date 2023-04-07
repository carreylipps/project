
// --- This is the standard stuff to get it to work on the browser
const express = require('express');
const ticket = require('./tickets');
const app = express();
const port = 3000;
app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes will go here

// Route to access database:
app.get('/rest/ticket:id', function(req, res) {
const ticket = tickets.getTicketById(req.params.id);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404).json({
      error: 'Not found' });
  }
});

app.listen(port, () => {
  console.log('Server is listening at http://localhost:3000');
});
