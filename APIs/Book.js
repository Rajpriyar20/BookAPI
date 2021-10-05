const BookModel = require("../Schema/book");
const AuthorModel = require("../Schema/author");

const Router = require("express").Router();

//to get all books
/*
  route   - /book
  access  - public
  method  - GET
  params  - none
  body    - none
*/
Router.get("/book", async(req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

//to get a specific book
/*
  route   - /book/:bookID
  access  - public
  method  - GET
  params  - bookID
  body    - none
*/
Router.get("/book/:bookID", async(req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.bookID });

    return res.json(getSpecificBook);
});

//to get a list of books based on category
/*
  route   - /book/c/:category
  access  - public
  method  - GET
  params  - category
  body    - none
*/
Router.get("/book/c/:category", async(req, res) => {
    const getSpecificBooks = await BookModel.find({ category: req.params.category });

    if (!getSpecificBooks)
        return res.json({ error: `no book found for this category ${req.params.category}` });

    return res.json(getSpecificBooks);
});

//to get a list of books based on author
/*
  route   - /book/a/:id
  access  - public
  method  - GET
  params  - id
  body    - none
*/
Router.get("/book/a/:id", async(req, res) => {
    const { id } = req.params;

    const getBook = await BookModel.findOne({ id: parseInt(id) });

    return res.json({ Books: getBook });
});

//to post a new book
/*
  route   - /book/new
  access  - public
  method  - POST
  params  - none
*/
Router.post("/book/new", async(req, res) => {
    try {
        const { newBook } = req.body;
        await BookModel.create(newBook);
        return res.json({ message: "Book added successfully!" });
    } catch (error) {
        return res.json({ error: error.message });
    }
});

//to update details of the book
/*
  route   - /book/update/:isbn
  access  - public
  method  - PUT
  params  - isbn
*/
Router.put("/book/updateTitle/:isbn", async(req, res) => {
    const { title } = req.body.title;

    const updateBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        title: title
    }, {
        new: true
    });

    return res.json(updateBook);
});

//to update/add new author
/*
  route   - /book/updateAuthor/:isbn
  access  - public
  method  - PUT
  params  - isbn
*/

//to add newAuthor's id in author's array
Router.put("/book/updateAuthor/:isbn", async(req, res) => {
    const { id } = req.body;
    const { isbn } = req.params;

    const updateBook = await BookModel.findOneAndUpdate({
        ISBN: isbn
    }, {
        $addToSet: {
            authors: id
        }
    }, {
        new: true
    });

    const updateAuthor = await AuthorModel.findOneAndUpdate({
        id: id
    }, {
        $addToSet: {
            books: isbn
        }
    }, {
        new: true
    });

    return res.json({ Books: updateBook, Authors: updateAuthor });

});

//to delete a book
/*
  route   - /book/delete/:isbn
  access  - public
  method  - DELETE
  params  - isbn
*/
Router.delete("/book/delete/:isbn", async(req, res) => {
    const { isbn } = req.params;

    const updateBook = await BookModel.findOneAndDelete({
        ISBN: isbn
    }, {
        new: true
    });

    return res.json(updateBook);
});

//to delete an author from book
/*
  route   - /book/deleteAuthor/:isbn/:id
  access  - public
  method  - DELETE
  params  - isbn, id
*/
Router.delete("/book/deleteAuthor/:isbn/:id", async(req, res) => {
    const { isbn, id } = req.params;

    const updateBook = await BookModel.findOneAndUpdate({
        ISBN: isbn
    }, {
        $pull: {
            authors: parseInt(id)
        },
    }, {
        new: true
    });

    const updateAuthor = await AuthorModel.findOneAndUpdate({
        id: id
    }, {
        $pull: {
            books: isbn
        }
    }, {
        new: true
    });

    return res.json({ Books: updateBook, Authors: updateAuthor });
});

module.exports = Router;