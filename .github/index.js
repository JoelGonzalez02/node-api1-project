const express = require('express');

const shortid = require('shortid');

const server = express();

const port = 5000;

server.use(express.json());

let users = []


server.post('/api/users', (req, res) => {

    const user = { id: shortid.generate(), name: '', bio: '', ...req.body }

    users = [...users, user]

    if (user) {
        res.status(201).json(users);
      } else {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user' });
      }

})


server.get('/api/users', (req, res) => {

})

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})