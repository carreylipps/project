const {mongoclient} = require('mongodb')

const uri = 'mongodb+srv://carrey:Beauxbella13@clmdb.xd8c4zo.mongodb.net/?retryWrites=true&w=majority'
// --- This is the standard stuff to get it to work on the browser
const chalk = require('chalk');
const express = require('express');
const ticket = require('./tickets');
const app = express();
const port = 3000;
app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//created tickets
tickets = [
    {
        "id": 56738,
        "created_at": "2023-04-07T19:46:46Z",
        "updated_at": "2023-04-07T20:30:43Z",
        "type": "ticket",
        "subject": "Phase 1 test",
        "description": "Phase 1 CMPS415 project",
        "priority": "high",
        "status": "open",
        "recipient": "you@selu.edu",
        "submitter": "carrey.lipps@selu.edu",
        "assignee_id": 43521,
        "follower_ids": [76538, 876],
        "tags": ["winner", "tickets"],
       },
       {
        "id": 2314,
        "created_at": "2023-04-07T19:13:34Z",
        "updated_at": "2023-04-07T20:45:13Z",
        "type": "ticket",
        "subject": "phase 1",
        "description": "Phase 1 tester for cmps415 project",
        "priority": "high",
        "status": "open",
        "recipient": "you@selu.edu",
        "submitter": "carrey.lipps@selu.edu",
        "assignee_id": 12345,
        "follower_ids": [987654, 852],
        "tags": ["lg", "tickets"],
       }
];


// routes will go here

// get all tickets

app.get('/rest/list', function(req, res) {

    res.status(200).send(JSON.stringify(tickets));
});

//find a single ticket

app.get('/rest/ticket/id'. function(req,res){
        const search= "{id: '" + req.params.id + "'}";
        console.log("Looking for " + search);
});

//create ticket

app.post('/rest/ticket', function (req, res)   {
    ticket =   {
        id: req.body.id,
        createdat: req.body.createdat,
        updatedat: req.body.updatedat,
        type: req.body.type,
        subject: req.body.subject,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        recipient: req.body.recipient,
        submitter: req.body.submitter,
        assignee_id: req.body.assignee_id,
        follower_id: req.body.follower_id,
        tags: req.body.tags
    };
    tickets.push(ticket);
    res.status(200).send(JSON.stringify(ticket));
});
