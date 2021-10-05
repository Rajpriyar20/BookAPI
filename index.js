require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
//database
const database = require("./database");

//importing Schemas
const BookModel = require("./Schema/book");
const AuthorModel = require("./Schema/author");
const PublicationModel = require("./Schema/publication");
const { update } = require('./Schema/book');

//APIs
const Book = require("./APIs/Book");
const Author = require("./APIs/Author");
const Publication = require("./APIs/Publication");

mongoose.connect(
        process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => console.log("connection established!"))
    .catch((err) => {
        console.log(err);
    });
//initialization
const OurApp = express();

OurApp.use(express.json());

OurApp.use("/book", Book);
OurApp.use("/author", Author);
OurApp.use("/publication", Publication);


OurApp.get("/", (request, response) => {
    response.json({ message: "Server is working" });
});



OurApp.listen(5000, () => { console.log("server is running!") });