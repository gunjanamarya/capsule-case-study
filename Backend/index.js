var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express(),
    port = 3000,
    Project = require('./api/models/Project'),
    Task = require('./api/models/Task'),
    User = require('./api/models/User'),
    Parent_Task = require('./api/models/Parent_Task')

mongoose.connect('mongodb://localhost/project-manager', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Can not connect to db :('));
db.once('open', function () {
    console.log('Database connected @ 27017')
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./api/routes/route');
routes(app);

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});