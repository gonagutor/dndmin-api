export default (req, res, next) => {
  if (process.env.NODE_ENV !== 'dev' && !req.secure) {
    res.redirect(`https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
};
