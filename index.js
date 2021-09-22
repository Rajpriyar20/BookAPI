const express = require("express");

//database
const database = require("./database");

//initialization
const OurApp = express();

OurApp.use(express.json());

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
  params  - none
*/
OurApp.post("/book/new", (req, res) => {
    const { NewBook } = req.body;

    database.Book.push(NewBook);

    return res.json(database.Book);
});

//to post a new author
/*
  route   - /author/new
  access  - public
  method  - POST
  params  - none
*/
OurApp.post("/author/new", (req, res) => {
    const { NewAuthor } = req.body;

    database.Author.push(NewAuthor);

    return res.json(database.Author);
});

//to post a new publication
/*
  route   - /publication/new
  access  - public
  method  - POST
  params  - none
*/
OurApp.post("/publication/new", (req, res) => {
    const { NewPub } = req.body;

    database.Publication.push(NewPub);

    return res.json(database.Publication);

});

//to update details of the book
/*
  route   - /book/update/:isbn
  access  - public
  method  - PUT
  params  - isbn
*/
OurApp.put("/book/updateTitle/:isbn", (req, res) => {
    const { UpdatedBook } = req.body;
    const { isbn } = req.params;

    database.Book.map((book) => {
        if (book.ISBN === isbn) {
            book.title = UpdatedBook.title;
            return;

        }
        return book;
    });

    return res.json(database.Book);
});

//to update/add new author
/*
  route   - /book/updateAuthor/:isbn
  access  - public
  method  - PUT
  params  - isbn
*/

//to add newAuthor's id in author's array
OurApp.put("/book/updateAuthor/:isbn", (req, res) => {
    const { NewAuthor } = req.body;
    const { isbn } = req.params;

    const book = database.Book.map((book) => {
        if (book.ISBN === isbn) {
            if (!book.authors.includes(NewAuthor)) {
                book.authors.push(NewAuthor);
                return book;
            }
            return book;
        }
        return book;
    });
    //to add ISBN number to the author's object
    const author = database.Author.map((author) => {
        if (author.id === NewAuthor) {
            if (!author.books.includes(isbn)) {
                author.books.push(isbn);
                return author;
            }
            return author;
        }
        return author;
    });
    return res.json({ book: book, author: author });
});

//to update author name
/*
  route   - /book/updateName/:isbn
  access  - public
  method  - PUT
  params  - isbn
*/
OurApp.put("/book/updateName/:id", (req, res) => {
    const { updateAuthor } = req.body;
    const { id } = req.params;

    const author = database.Author.map((author) => {
        if (author.id === parseInt(id)) {
            author.name = updateAuthor.name;
            return author;
        }
        return author;
    });
    return res.json(author);
});

//to delete a book
/*
  route   - /book/delete/:isbn
  access  - public
  method  - DELETE
  params  - isbn
*/

OurApp.delete("/book/delete/:isbn", (req, res) => {
    const { isbn } = req.params;

    const filteredBooks = database.Book.filter((book) => book.ISBN !== isbn)
    database.Book = filteredBooks;

    return res.json(database.Book);
});

//to delete an author from book
/*
  route   - /book/deleteAuthor/:isbn/:id
  access  - public
  method  - DELETE
  params  - isbn, id
*/
OurApp.delete("/book/deleteAuthor/:isbn/:id", (req, res) => {
    const { isbn, id } = req.params;

    //to delete id from Book
    database.Book.map((book) => {
            if (book.ISBN === isbn) {
                if (!book.authors.includes(parseInt(id))) {
                    return book;
                }
                book.authors = book.authors.filter((Id) => Id !== parseInt(id));
                return book;
            }
            return book;
        })
        //to delete ISBN from author
    database.Author.map((author) => {
        if (author.id === parseInt(id)) {
            if (!author.books.includes(isbn)) {
                return author;
            }
            author.books = author.books.filter((book) => book !== isbn);
            return author;
        }
        return author;
    })

    return res.json({ book: database.Book, author: database.Author });
});

//to delete an author
/*
  route   - /book/deleteAuth/:Id
  access  - public
  method  - DELETE
  params  - Id
*/
OurApp.delete("/book/deleteAuth/:Id", (req, res) => {
    const { Id } = req.params;

    const filteredAuthors = database.Author.filter((author) =>
        author.id !== parseInt(Id));

    database.Author = filteredAuthors;

    return res.json(database.Author);

});

//to delete a publication
/*
  route   - /publication/delete/:Id
  access  - public
  method  - DELETE
  params  - Id
*/

OurApp.delete("/publication/delete/:Id", (req, res) => {
    const { Id } = req.params;

    const filteredPublications = database.Publication.filter((pub) =>
        pub.id !== parseInt(Id));

    database.Publication = filteredPublications;

    return res.json(database.Publication);
});

//to delete a book from publication
/*
  route   - /publication/delete/book/:isbn/:Id
  access  - public
  method  - DELETE
  params  - isbn, Id
*/

OurApp.delete("/publication/delete/book/:isbn/:Id", (req, res) => {
    const { isbn, Id } = req.params;
    //to delete publication from Book(setting default)
    database.Book.map((book) => {
        if (book.ISBN === isbn) {
            book.publication = 0;
            return book;
        }
        return book;
    });
    //to delete ISBN from publication
    database.Publication.map((publication) => {
        if (publication.id === parseInt(Id)) {
            const filteredBooks = publication.books.filter((book) =>
                book !== isbn);

            publication.books = filteredBooks;
            return publication;
        }
        return publication;
    });
    return res.json({ book: database.Book, publications: database.Publication });
});

OurApp.listen(5000, () => { console.log("server is running!") });