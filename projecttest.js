const { MongoClient, ObjectId } = require("mongodb");  // Added ObjectId to import

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

// Default route:
app.get('/', function(req, res) {
  const myquery = req.query;
  var outstring = 'Starting... ';
  res.send(outstring);
});

app.get('/say/:name', function(req, res) {
  res.send('Hello ' + req.params.name + '!');
});


// Route to access database by ticket ID:
app.get('/rest/ticket/:id', function(req, res) {  // Changed route to include ':id' parameter
  const client = new MongoClient(uri);

  async function run() {
    try {
      await client.connect();  // Added connect() method
      const database = client.db('clmdb');
      const tickets = database.collection('cmps415');

      const ticket = await tickets.findOne({ _id: ObjectId(req.params.id) });  // Changed query to use _id and ObjectId
      console.log(ticket);
      res.send('Found this: ' + JSON.stringify(ticket));  //Use stringify to print a json

    } catch (err) {  // Added error handling
      console.log(err);
      res.send(err.message).status(500);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  run().catch(console.dir);
});

// Route to add a new ticket to the database:
app.post("/rest/ticket/", function(req,res){
  console.log("Adding ticket ");

  const client = new MongoClient(uri);

  async function run() {
    try{
      await client.connect();  // Added connect() method
      const database = client.db("clmdb");
      const tickets = database.collection("cmps415");  // Changed collection name to 'cmps415'

      let newDocument = req.body;
      newDocument._id = new ObjectId();  // Added _id using ObjectId
      let result = await tickets.insertOne(newDocument);
      res.send(result).status(204);
    } catch (err) {  // Added error handling
      console.log(err);
      res.send(err.message).status(500);
    } finally{
      await client.close();
    }
  }
  run().catch(console.dir);
});

// Route to get a list of all tickets:
app.get('/rest/list/', function(req, res) {
  console.log("Looking for every ticket");

  const client = new MongoClient(uri);

  async function run() {
    try {
      await client.connect();  // Added connect() method
      const database = client.db('clmdb');
      const tickets = database.collection('cmps415');

      let results = await tickets.find({})
        .toArray();

      res.send(results).status(200);
    } catch (err) {  // Added error handling
      console.log(err);
      res.send(err.message).status(500);
    } finally {
      await client.close;
    }
