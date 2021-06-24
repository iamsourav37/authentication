const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((error) => {
    console.log(`Not connected to db, error : ${error}`);
  });

mongoose.connection.on("connected", () => {
  console.log("mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log("mongoose not connected to db, error : ", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose connection is disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
