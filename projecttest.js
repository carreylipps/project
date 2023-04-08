const { MongoClient } = require("mongodb");

// The uri string must be the connection string for the database (obtained on Atlas).
const uri = "mongodb+srv://carrey:beauxbella@clmdb.xd8c4zo.mongodb.net/?retryWrites=true&w=majority";

// --- This is the standard stuff to get it to work on the browser
const express = require('express');
const app = express();
const port = 3000;
const tickets = ('./tickets');
app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to access database:
app.get('/rest/ticket/:id', async function(req, res) {
  const client = new MongoClient(uri);
  const searchKey = { ticketID: req.params.id };
  console.log("Looking for: " + searchKey);

  try {
    await client.connect();
    const database = client.db('clmdb');
    const tickets = database.collection('cmps415');

    const ticket = await tickets.findOne(searchKey);
    console.log(ticket);
    res.send('Found this: ' + JSON.stringify(ticket));  
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  } finally {
    await client.close();
  }
});

app.post("/rest/ticket/", async function(req, res) {
  console.log("Adding ticket ");

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("clmdb");
    const ticket = database.collection("ticket");
    let newDocument = req.body;
    newDocument.id = "574628";
    let result = await ticket.insertOne(newDocument);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  } finally {
    await client.close();
  }
});

app.get('/rest/list/', async function(req, res) {
  console.log("looking for every ticket");

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('clmdb');
    const ticket = database.collection('Ticket');

    let results = await ticket.find({})
      .toArray();

    res.send(results).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  } finally {
    await client.close();
  }
});


