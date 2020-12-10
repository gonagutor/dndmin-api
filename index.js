// FileName: index.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Console = require('console');
const apiRoutes = require('./api-routes');

const app = express();
const port = process.env.PORT || 8080;
dotenv.config();
mongoose.connect(process.env.USERANDPWD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
Console.log(!db ? 'Error connecting db' : 'Db connected successfully');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('http://*', (req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
});
app.use('/', apiRoutes);
app.listen(port, () => {
  Console.log(`DnDmin API now running on port: ${port}`);
});
