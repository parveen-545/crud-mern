const jwt = require("jsonwebtoken");
const SECRET_KEY = "crudMern";
const User = require("../model/user.model");

const authMiddleware = async (req, res, next) => {
  const authoHeader = req.headers.authorization;

  try {
    if (!authoHeader || !authoHeader.startsWith("Bearer ")) {
      return res.status(500).json({
        message: "invalid token!",
        success: false,
      });
    }

    const token = authoHeader.split(" ")[1];
    const verifiedToken = jwt.verify(token, SECRET_KEY);

    if (!verifiedToken) {
      return res
        .status(500)
        .json({ message: "invalid token!", success: false });
    }

    const verifiedUser = await User.findOne({
      Email: verifiedToken?.email,
    }).select("-Password");

    if (!verifiedUser) {
      return res
        .status(500)
        .json({ message: "not a valid user", success: false });
    }

    req.User = verifiedUser;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(500).json({ message: "Token expired", success: false });
    }

    if (error.name == "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid Token", success: false });
    }

    return res
      .status(500)
      .json({ message: error.message, success: false });
  }
};


module.exports = authMiddleware