// classDescription.model.js

var mongoose = require("mongoose");
var classDescriptionSchema = mongoose.Schema(
{
	class: String,
	description: String,
}
);

var ClassDescription = (module.exports = mongoose.model("classDescription", classDescriptionSchema));
module.exports.get = function (callback, limit) {
  ClassDescription.find(callback).limit(limit);
};
