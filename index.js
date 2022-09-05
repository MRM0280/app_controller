var express = require('express');
var app = express();
var fs = require('fs');
var users = require('./api/online_users');


app.use(express.json());

app.use('/api/online_users', users);
var users = [];
var read = fs.readFileSync('./data/users.json', 'utf-8');

users = JSON.parse(read);

console.log(users);

app.listen((process.env.PORT || 8080), () => {
    console.log('server is listening on port : ' + (process.env.PORT || 8080));
});