const express = require('express');

const shortid = require('shortid');

const server = express();

const port = 5000;

server.use(express.json());

let users = []


server.post('/api/users', (req, res) => {

    

    const user = { id: shortid.generate(), name: '', body: '', ...req.body }

    users = [...users, user]

try {
    if (user) {
            res.status(201).json(users);
        } else {
            res.status(400).json({ errorMessage: 'Please provide name and bio for the user' });
        } 
        } catch {
            res.status(500).json({errorMessage: 'There was an error while saving the user to the database'})
        }
})


server.get('/api/users', (req, res) => {


        if (users) {
             res.status(200).json(users);
        } else {
            res.status(500).json({errorMessage: 'The users could not be retrieved'})
        }
    
})


server.get('/api/users/:id', (req, res) => {

    const user = users.find(u => u.id == req.params.id);

    try {
        if (user) {
          res.status(200).json(user);
        } else {
            res.status(404).json({errorMessage: 'The user with the specified ID does not exist'})
    }
        } catch {
            res.status(500).json({errorMessage: 'The user information could not be retrieved'})
        }
})

server.delete('/api/users/:id', (req, res) => {

    const { id } = req.params;

    const deleted = users.find(u => u.id === id)

    try {
          if (deleted) {

        users = users.filter(u => u.id !== id);

        res.status(200).json(deleted)
          } else {
            res.status(404).json({errorMessage: 'The user with the specified ID does not exist'})
        }
    } catch {
        res.status(500).json({errorMessage: 'The user could not be removed'})
    }
})


server.put('/api/users/:id', (req, res) => {
    
    const { id } = req.params;

    const changes = req.body;

    let index = users.findIndex(u => u.id === id);

    try {
          if (index !== -1) {

        changes.id = id;
        users[index] = changes;
        res.status(200).json(users[index]);

        } else {
            res.status(404).json({errorMessage: 'The user with the specified Id does not exist'})
        }
        } catch {
            res.status(500).json({errorMessage: 'The user information could not be modified'})
    }
})



server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})