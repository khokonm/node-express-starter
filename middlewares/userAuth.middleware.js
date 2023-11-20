const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: '.env' });
const JWT_SECRET = process.env.JWT_SECRET;

const AuthenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err || !payload)
      return res.status(200).json({
          success: false,
          message: "Unauthorized Access!"
      });

    req.user = payload;

    next();
  });
};
module.exports = AuthenticateUser;