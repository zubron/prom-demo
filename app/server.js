// Setup
const express = require('express');
const app = express();                          // create our app w/ express
const mongoose = require('mongoose');           // mongoose for mongodb
const port = process.env.PORT || 3000;          // set the port from envs, fallback to 3000
const database = require('./config/database');  // load the database config
const paths = require('./config/paths');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Configuration
app.use(express.static(paths.staticFiles));
app.use(bodyParser.urlencoded({'extended': 'true'}));         // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                   // parse application/json
app.use(morgan('dev'));

// Routes
require('./api/routes.js')(app);

const databaseOptions = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

mongoose.connect(database.remoteUrl, databaseOptions).then(
    () => {
        // Start listening
        app.listen(port);
        console.log("App listening on port " + port);
    },
    err => {
        console.log("Could not connect to database: ", err);
    }
);