const express = require("express");
const { createRequire } = require("module");
const path = require("path");
const port = 8000;

// now we call express and this app has all the
// functionality run the server

const db = require("./config/mongoose");
const Contact = require("./models/contact");
const app = express();

// whatelse is doing the below line now this app has multiple property
// and we are created property "view-engine" and given it a value "ejs"

app.set("view engine", "ejs");

//  app.set(name,path.join(path,folder-name));
// __dirname for dyanmic routing the path

app.set("views", path.join(__dirname, "views"));

// this is a middleware used to decode the data recieved from recived from the  user

app.use(express.urlencoded());
app.use(express.static("assets"));

/*// Middelware 1
app.use(function (req, res, next) {
// console.log('middleware 1  called');
req.myName = "arpan";
next();
});

// Middelware 2
app.use(function (req, res, next) {
// console.log('middleware 2  called');
console.log("from MW2", req.myName);
next();
});*/

app.get("/", async function (req, res) {
  // console.log("from /", req.myName);

  // return res.render("home", {
  //   title: "Contact List",
  //   contact_list: contactList,
  //   add: "No contacts found.",
  // });

  try {
    // we can give some criteria  to find

    const findContact = await Contact.find({
      /*name:"Bhaiya"*/
    });
    // console.log("******", findContact);

    return res.render("home", {
      title: "Contact List",
      contact_list: findContact,
      add: "No contacts found.",
    });
  } catch (error) {
    console.error("Error in fetching conatacts:", error);
    // Handle error appropriately, e.g., display an error message to the user
  }
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Add a Contact",
  });
});

app.post("/create-conatct", async function (req, res) {
  // console.log(req.body);

  // contactList.push(req.body);

  try {
    const createContact = await Contact.create({
      name: req.body.name,
      phone: req.body.phone,
    });
    // console.log("******", createContact);
    res.redirect("back");
  } catch (error) {
    console.error("Error creating contact:", error);
    // Handle error appropriately, e.g., display an error message to the user
  }

  // another method can be

  /* contactList.push({
        name:req.body.name,
        phone:req.body.phone 
     }); */

  // return res.redirect("back");
});

app.get("/delete-contact", async function (req, res) {
  // // console.log(req.query);
  // let phone = req.query.phone;
  // let name = req.query.name;

  // // coding Ninjas method
  // var i = contactList.findIndex((j) => j.phone == phone && j.name == name);
  // if (contactList[i].phone == phone && contactList[i].name == name && i != -1) {
  //   contactList.splice(i, 1);
  //   res.redirect("back");

  //   // this is my method of deleting
  //   // for (i = 0; i < contactList.length; i++) {
  //   //   if (contactList[i].phone == phone && contactList[i].name == name) {
  //   //     contactList.splice(i, 1);
  //   //     res.redirect("back");
  //   //   }
  //  }

  // for deleting from the data base

  //find id using query from the url
  const id = req.query.id;
  // find the contacts associated with id and delete
  try {
    const deletedContact = await Contact.findByIdAndDelete(/*req.query.id*/ id);
    if (!deletedContact) {
      console.error("No contact found with the given ID:", req.query.id);
      // Handle the case of no matching contact (e.g., display an error message)
      return res.redirect("back"); // Or any appropriate redirect
    }

    // console.log("Contact deleted successfully:", deletedContact);
    res.redirect("back"); // Or redirect to a confirmation page
  } catch (error) {
    console.error("Error deleting contact:", error);
    // Handle errors appropriately (e.g., display an error message to the user)
    res.redirect("back"); // Or any appropriate redirect
  }
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in runnig the server", err);
  }

  console.log("Yup !My express server is running on port: ", port);
});
