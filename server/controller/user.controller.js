const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const token = require("jsonwebtoken");
const SECRET_KEY = "crudMern";

const handleSignUpUserController = async (req, res) => {
  const body = req.body;
  if (!body?.FirstName || !body?.Email || !body?.Password) {
    return res.status(500).json({
      message: "all fields are required...",
      status: false,
    });
  }

  try {
    const saltCount = 10;
    const hashedPassword = await bcrypt.hash(body.Password, saltCount);

    //console.log(hashedPassword, "dekho kya password aaya hai ");

    const signup = await User.create({ ...body, Password: hashedPassword });
    if (signup) {
      return res.status(201).json({
        message: "user created successfully...",
        success: true,
        id: signup?._id,
      });
    }
  } catch (error) {
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
      return res.status(500).json({
        message: "email an password are required",
        success: false,
      });
    }

    const user = await User.findOne({ Email: body.Email });
    if (!user) {
      return res.status(400).json({
        message: "user doesn't exist",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(body.Password, user.Password);
    console.log("ispasswordmatch", isPasswordMatch);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "passwor does not matched", success: false });
    }

    const token = jwt.sign({ email: user?.Email, id: user?._id }, SECRET_KEY);
    return res.status(200).json({
      message: "user logged in successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: message.error, success: false });
  }
};

// const handleSignInUserController = async (req, res) => {
//   const { Email, Password } = req.body;
//   if (!Email || !Password) {
//     return res.status(400).json({
//       message: "email and password are required",
//       status: false,
//     });
//   }

//   try {
//     const user = await User.findOne({ Email: Email });
//     if (!user) {
//       return res.status(404).json({
//         message: "user not found, pls register first...",
//         status: false,
//       });
//     }

//     const isPasswordMatch = await bcrypt.compare(Password, user.Password)

//     if (!isPasswordMatch) {
//       return res.status(401).json({
//         message: "invalid password! pls try again with correct password",
//         status: false,
//       });
//     }

//     return res.status(200).json({
//       message: "login successfully",
//       success: true,
//       user: {
//         id: user._id,
//         FirstName: user.FirstName,
//         Email: user.Email,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "internal server error: " + error.message,
//       success: false,
//     });
//   }
// };

module.exports = { handleSignUpUserController, handleSignInUserController };
