"use strict";

let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');


let app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.set('Content-Type', 'application/json');
	next();
});

app.get('/', (req, res) => {
	res.send('API is running.');
});

app.get('/notes', (req,  res) => {
	fs.readFile(__dirname + '/data/notes.json', (err, data) => {
		if (err) {
			res.status(500).end();
			return console.log(err);
		}

		res.status(200).send(data);
	});
});

app.listen(5000, () => {
	console.log('Server started. Open http://localhost:5000 in your browser.');
});

console.log("YAYlol");