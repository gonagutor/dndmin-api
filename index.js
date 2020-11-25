// FileName: index.js
let express = require('express')
let app = express();
var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('REST API Landing Page'));

app.listen(port, function () {
	console.log("DnDmin API now running on port: " + port);
});
