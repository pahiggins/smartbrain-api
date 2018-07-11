const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = {
    users: [
        {
            id: '123',
            name: 'Peter',
            email: 'pah@cenabo.com',
            password: 'pw123',
            entries: 0,
            createdAt: new Date()
        },
        {
            id: '456',
            name: 'Mary',
            email: 'mary@gmail.com',
            password: 'pw456',
            entries: 0,
            createdAt: new Date()
        }
    ]
};

app.get('/', (req, res) => {
    res.send(db.users);
});

app.post('/signin', (req, res) => {
    if (req.body.email === db.users[0].email && req.body.password === db.users[0].password) {
        res.status(200).json(db.users[0]);
    } else {
        res.status(400).json('Error');
    }
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    db.users.push({
        id: '123abc',
        name,
        email,
        entries: 0,
        createdAt: new Date()
    });
    res.json(db.users[db.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    db.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });

    if (!found) {
        res.status(400).json('User not found');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;

    db.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    });

    if (!found) {
        res.status(400).json('User not found');
    }
});

app.listen(3000, () => {
    console.log('Running...');
});