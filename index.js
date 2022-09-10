var express = require('express');
var app = express();
var users = require('./api/users');


app.use(express.json());

app.use('/api/users', users);

app.listen((process.env.PORT || 8080), () => {
    console.log('server is listening on port : ' + (process.env.PORT || 8080));
});