var User = require("../auth/auth.model");
var ClassDescription = require("./classDescription.model");
var errorMessages = require("../utilities/errorMessages");

exports.index = function (req, res) {
  ClassDescription.get(function (err, classDescriptions) {
    if (err) errorMessages.databaseError(res, err);
    res.json({
      status: "success",
      data: classDescriptions,
    });
  });
};

exports.find = function (req, res) {
  ClassDescription.findOne(
    { class: req.params.class_name },
    function (err, classDescription) {
      if (err) errorMessages.databaseError(res, err);
      res.json({
        status: "success",
        data: classDescription,
      });
    }
  );
};

exports.delete = function (req, res) {
  if (req.body.token != null) {
    User.findOne({ token: req.body.token }, function (err, user) {
      if (!err) {
        if (user != null) {
          if (user.authorization >= 3) {
            ClassDescription.findOneAndDelete({ class: req.params.class_name }, function (err, classDescription) {
                if (err) errorMessages.databaseError(res, err);
                res.json({
                  status: "success",
                  data: "Class description succesfully deleted",
                });
              },
            );
          } else errorMessages.wrongAuthority(res);
        } else errorMessages.invalidToken(res);
      } else errorMessages.databaseError(res, err);
    });
  } else errorMessages.wrongRequest(res);
};

exports.new = function (req, res) {
  if (req.body.token != null && req.body.description != null && req.body.class != null) {
    let newClassDescription = new ClassDescription();
    newClassDescription.class = req.body.class;
    newClassDescription.description = req.body.description;
    User.findOne({ token: req.body.token }, function (err, user) {
      if (!err) {
        if (user != null) {
          if (user.authorization >= 3) {
            newClassDescription.save(function (err, newClassDescription) {
                if (err) errorMessages.databaseError(res, err);
                res.json({
                  status: "success",
                  data: newClassDescription,
                });
              },
            );
          } else errorMessages.wrongAuthority(res);
        } else errorMessages.invalidToken(res);
      } else errorMessages.databaseError(res, err);
    });
  } else errorMessages.wrongRequest(res);
};
