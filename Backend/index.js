var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('./winston');
var morgan = require('morgan');

var app = express(),
    port = 3000,
    Project = require('./api/models/Project'),
    Task = require('./api/models/Task'),
    User = require('./api/models/User'),
    Parent_Task = require('./api/models/Parent_Task')

app.use(morgan('combined', { stream: logger.stream }));
mongoose.connect('mongodb://localhost:27017/project-manager', { useCreateIndex: true, useNewUrlParser: true }, function (err) {
    if (err) { logger.error('Can not connect to db :(') }
});
const db = mongoose.connection;
db.once('open', function () {
    logger.info('Database connected @ 27017')
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./api/routes/route');
routes(app);

app.listen(port, () => {
    logger.info('Server started on port: ' + port);
});