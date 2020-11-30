// FileName: index.js

let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let apiRoutes = require("./api-routes");
const dotenv = require("dotenv");
let app = express();
var port = process.env.PORT || 8080;
dotenv.config();
mongoose.connect(process.env.USERANDPWD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
console.log(!db ? "Error connecting db" : "Db connected successfully");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('http://*', function(req, res) {  
  res.redirect('https://' + req.headers.host + req.url);
})
app.use("/", apiRoutes);
app.listen(port, function () {
  console.log("DnDmin API now running on port: " + port);
});
