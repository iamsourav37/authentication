require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const app = express();
app.use(morgan("dev"));

require("./helpers/initMongodb");

//! build-in middlewares
app.use(express.json());

//! importing our routes
const AuthRoutes = require("./routes/auth.routes");

app.get("/", async (req, res, next) => {
  return res.send("hello from server");
});

app.use("/auth", AuthRoutes);

//! handling 404 routes
app.use(async (req, res, next) => {
  next(createError.NotFound("Page not found"));
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

//! server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server is running on ", port);
});
