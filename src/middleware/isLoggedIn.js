exports.default = function isLoggedIn(req, res, next) {
  const token = req.header('token');
  if (!token) return errorMessages.missingToken(res);
  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verifiedToken.authorization < minLevelAuth) { return errorMessages.wrongAuthority(res); }
    return User.findOne({ username: verifiedToken.username }, (err, user) => {
      if (err) return errorMessages.databaseError(res, err);
      if (!user) return errorMessages.invalidToken(res);
      return callback(req, res, user);
    });
  } catch (err) {
    return errorMessages.invalidToken(res);
  }
};
