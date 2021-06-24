const createError = require("http-errors");
const User = require("../models/user.model");

exports.registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      throw new createError.BadRequest(
        "Something is missing... email and password is mendatory"
      );
    }

    const doesUserAlreadyExists = await User.findOne({ email: email });
    if (doesUserAlreadyExists) {
      throw new createError.Conflict(`${email} already exists in our database`);
    }

    const user = new User({ name, email, password });
    const savedUser = await user.save();
    res.send({ savedUser });
  } catch (error) {
    next(createError(error));
  }
};
