
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

// get ticket

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
