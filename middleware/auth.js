const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, "jsonwebtoken");
      req.users = decode;
      next();
    }
  } catch (error) {
    res.json({
      error: "auth error",
    });
  }
};

module.exports = auth;
