const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "crudMern";

const handleSignUpUserController = async (req, res) => {
  const body = req.body;
  if (!body?.FirstName || !body?.Email || !body?.Password) {
    return res.status(400).json({ // Client error ke liye 400 status better hai
      message: "all fields are required...",
      success: false,
    });
  }

  try {
    const saltCount = 10;
    const hashedPassword = await bcrypt.hash(body.Password, saltCount);

    const signup = await User.create({ ...body, Password: hashedPassword });
    if (signup) {
      return res.status(201).json({
        message: "user created successfully...",
        success: true,
        id: signup?._id,
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists!", success: false });
    }
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const handleSignInUserController = async (req, res) => {
  try {
    const body = req.body;
    if (!body.Email || !body.Password) {
      return res.status(400).json({
        message: "email and password are required",
        success: false,
      });
    }


    const user = await User.findOne({ Email: body.Email });
    if (!user) {
      return res.status(400).json({
        message: "user doesn't exist, please sign up first...",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(body.Password, user.Password);
    console.log("ispasswordmatch result:", isPasswordMatch);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "password does not match", success: false });
    }

    const generatedToken = jwt.sign(
      { email: user?.Email, id: user?._id }, 
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "user logged in successfully",
      success: true,
      token: generatedToken, 
    });
    
  } catch (error) {
    console.log("Login Error Context:", error.message);
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { handleSignUpUserController, handleSignInUserController };
