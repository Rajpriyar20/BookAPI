const express = require("express");

//database
const database = require("./database");

//initialization
const OurApp = express();

OurApp.get("/", (request, response) => {
    response.json({ message: "Server is working" });
});

//to get all books
/*
  route   - /book
  access  - public
  method  - GET
  params  - none
  body    - none
*/
OurApp.get("/book", (req, res) => {
    return res.json({ books: database.Book });
});

//to get a specific book
/*
  route   - /book/:bookID
  access  - public
  method  - GET
  params  - bookID
  body    - none
*/
OurApp.get("/book/:bookID", (req, res) => {
    const GetBook = database.Book.filter((book) => book.ISBN === req.params.bookID);

    return res.json({ book: GetBook });
});

//to get a list of books based on category
/*
  route   - /book/c/:category
  access  - public
  method  - GET
  params  - category
  body    - none
*/
OurApp.get("/book/c/:category", (req, res) => {
    const GetBook = database.Book.filter((book) => book.category.includes(req.params.category));

    return res.json({ book: GetBook });
});

//to get a list of books based on author
/*
  route   - /book/a/:id
  access  - public
  method  - GET
  params  - id
  body    - none
*/
OurApp.get("/book/a/:authorid", (req, res) => {
    const GetBook = database.Book.filter((book) => book.authors.includes(req.params.authorid));

    return res.json({ book: GetBook });
});

//to get all authors
/*
  route   - /authors
  access  - public
  method  - GET
  params  - none
  body    - none
*/
OurApp.get("/authors", (req, res) => {
    return res.json({ author: database.Author });
});

//to get a specific author
/*
  route   - /authors/:authorname
  access  - public
  method  - GET
  params  - authorname
  body    - none
*/
OurApp.get("/authors/:authorname", (req, res) => {
    const GetAuthor = database.Author.filter((authors) => authors.name === req.params.authorname);

    return res.json({ authors: GetAuthor });
});

//to get list of authors based on books
/*
  route   - /authors/:books
  access  - public
  method  - GET
  params  - books
  body    - none
*/
OurApp.get("/authors/a/:books", (req, res) => {
    const GetAuthor = database.Author.filter((authors) => authors.books.includes(req.params.books));

    return res.json({ authors: GetAuthor });
});

//to get all publications
/*
  route   - /publications
  access  - public
  method  - GET
  params  - none
  body    - none
*/
OurApp.get("/publications", (req, res) => {
    return res.json({ publications: database.Publication });
});

//to get a specific publication
/*
  route   - /publications/:pubname
  access  - public
  method  - GET
  params  - pubname
  body    - none
*/
OurApp.get("/publications/:pubname", (req, res) => {
    const GetPub = database.Publication.filter((publications) => publications.name.includes(req.params.pubname));

    return res.json({ publications: GetPub });
});

//to get list of publications based on books
/*
  route   - /publications/:books
  access  - public
  method  - GET
  params  - books
  body    - none
*/
OurApp.get("/publications/p/:books", (req, res) => {
    const GetPub = database.Publication.filter((publications) => publications.books.includes(req.params.books));

    return res.json({ publications: GetPub });
});

//to post a new book
/*
  route   - /book/new
  access  - public
  method  - POST
  params  - new
  body    - none
*/

OurApp.listen(5000, () => { console.log("server is running!") });