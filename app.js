if (process.env.NODE_ENV !== 'test') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const server = require('http').Server(app);
const routes = require('./app/Routes');
const winston 	= require('winston');
const bodyParser  =  require('body-parser');
const db = require('./app/utils/db');
require('winston-loggly-bulk');

/*middleware*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*headers*/
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(function(req, res, next) {
    db.connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    }); 
    next();
});

app.use('/', routes);

/* Logger */
winston.level = process.env.PA_LOG_LEVEL || 'debug';
winston.add(winston.transports.File,{filename:'mgh.log',timestamp:true,level:'info',maxsize:22020096});

/* Local server */
server.listen(3200, function(){
	console.log("Listening " + ':' + 3200);
});
