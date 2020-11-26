// FileName: index.js
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRoutes = require("./api-routes");
const { userandpwd } = require('./secrets');
let app = express();
var port = process.env.PORT || 8080;

mongoose.connect(userandpwd, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
console.log((!db) ? "Error connecting db" : "Db connected successfully" );

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('REST API Landing Page'));
app.use('/api', apiRoutes);
app.listen(port, function () {
	console.log("DnDmin API now running on port: " + port);
});
