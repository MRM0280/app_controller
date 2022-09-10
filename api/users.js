var fs = require('fs');
var express = require('express');
var router = express.Router();

var users = [];
var read = fs.readFileSync('./data/users.json', 'utf-8');

users = JSON.parse(read);

router.post('/', (req, res) => {
    if (req.body['device_name'] == null) {
        res.send(users);
    } else {
        var objIndex = users.findIndex((obj => obj.device_name == req.body['device_name']));
        res.send(users[objIndex]);
    }
});

router.post('/add', (req, res) => {
    var json = req.body;
    AddUser(json, res);
});

router.post('/edit', (req, res) => {
    var json = req.body;
    editUser(json, res);
});
router.post('/del', (req, res) => {
    var json = req.body;
    DelUser(json['device_name'], res);
});

function AddUser(json, res) {
    var user = {
        name: json['device_name'],
        device_name: json['device_name'],
        is_signal_validate: true,
        is_online: true,
        get_signal: true,
    };
    users.push(user);
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
    res.send(user);
}

function editUser(json, res) {
    var user = {
        device_name: json['device_name'],
        is_signal_validate: json['is_signal_validate'],
        is_online: json['is_online'],
        get_signal: json['get_signal'],
    };
    var objIndex = users.findIndex((obj => obj.device_name == user.device_name));
    console.log(user.is_signal_validate);
    if (json['name'] != null) {
        console.log(json['name']);
        users[objIndex].name = json['name'];
    }
    users[objIndex].device_name = user.device_name;
    users[objIndex].is_signal_validate = user.is_signal_validate;
    users[objIndex].is_online = user.is_online;
    users[objIndex].get_signal = user.get_signal;
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
    res.send({ message: 'Item Edited' });
}

function DelUser(device_name, res) {
    var find = users.filter(function (index) {
        return index.device_name === device_name;
    });
    for (var i = 0; i < users.length; i++) {

        if (users[i] === find[0]) {

            users.splice(i, 1);
        }

    }
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
    res.send({ message: 'item deleted' });
}

module.exports = router;

