const createError = require("http-errors");
const User = require("../models/user.model");

const { authSchema } = require("../helpers/validation_schema");

exports.registerController = async (req, res, next) => {
  try {
    // const { name, email, password } = req.body;

    const validateResult = await authSchema.validateAsync(req.body);
    console.log("validateResult", validateResult);

    // if (!email || !password) {
    //   throw new createError.BadRequest(
    //     "Something is missing... email and password is mendatory"
    //   );
    // }

    const doesUserAlreadyExists = await User.findOne({
      email: validateResult.email,
    });
    if (doesUserAlreadyExists) {
      throw new createError.Conflict(
        `${validateResult.email} already exists in our database`
      );
    }

    const user = new User(validateResult);
    const savedUser = await user.save();
    res.send({ savedUser });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(createError(error));
  }
};
