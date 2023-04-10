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
// routes will go here
// Default route:
app.get('/', function(req, res) {
  const myquery = req.query;
  var outstring = 'Starting... ';
  res.send(outstring);
});
app.get('/say/:name', function(req, res) {
  res.send('Hello ' + req.params.name + '!');
});
// Route to access database:
app.get('/rest/ticket/id', function(req, res) {
const client = new MongoClient(uri);
const searchKey = "{ ticketID: '" + req.params.item + "' }";
console.log("Looking for: " + searchKey);
async function run() {
  try {
    const database = client.db('clmdb');
    const tickets = database.collection('ticket');
    // Hardwired Query for a part that has partID '12345'
    //const query = { partID: '12345' };
    // But we will use the parameter provided with the route
    const query = { ticketID: req.params.item };
    const ticket = await tickets.findOne(query);
    console.log(ticket);
    res.send('Found this: ' + JSON.stringify(ticket));  //Use stringify to print a json
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
}
};

app.post("/rest/ticket/", async function(req,res){
  console.log("Adding ticket ");
  
  const client = new MongoClient(uri);
  
  async function run() {
    try{
      await client.connect();
      const database = client.db("clmdb");
      const ticket = database.collection("ticket");
      
      let newDocument = req.body;
      newDocument.id = new ObjectId();
      
      let result = await ticket.insertOne(newDocument);
      res.status(204).send(result);
    } catch(error){
    console.error(error);
      res.status(500).send(error.message);
    finally{
      await client.close();
    }
  }
  run(req,res).catch(console.dir);
});
app.get('/rest/list/', function(req, res) {
  console.log("looking for every ticket");
  
  async function run() {
    const client = new MongoClient(uri);
    try {
      await client = new MongoClient(uri);
      const database = client.db('clmdb');
      const ticket = database.collection('ticket');
      
      let results = await ticket.find({})
        .toArray();
      
      res.send(results).status(200); }
    finally {  await client.close();
            }
  }
  run().catch(console.dir);
});
 
