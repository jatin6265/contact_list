// // require the library
const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost:27017/contact_list", {
  useNewUrlParser: true,
});

// acquire the connection (to check if it is successful)

const db = mongoose.connection;

// error
db.on("error", console.error.bind(console, "error connecting to db"));

// up and running then print the successful message
db.once("open", function () {
  console.log("connected successfully to the database");
});
