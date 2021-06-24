const createError = require("http-errors");

exports.registerController = async (req, res, next) => {
  try {
    console.log("req.body: ", req.body);
    const { name, email, password } = req.body;
    res.send(`hello mr. ${name}, thank you for this hardwork`);
  } catch (error) {
    next(createError(500, "not getting req.body data, something is wrong"));
  }
};
