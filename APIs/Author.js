const AuthorModel = require("../Schema/author");

const Router = require("express").Router();

//to get all authors
/*
  route   - /author
  access  - public
  method  - GET
  params  - none
  body    - none
*/
Router.get("/author", async(req, res) => {
    const getAllAuthors = await AuthorModel.find();

    return res.json(getAllAuthors);
});

//to get a specific author
/*
  route   - /author/:name
  access  - public
  method  - GET
  params  - name
  body    - none
*/
Router.get("/author/:name", async(req, res) => {
    const { name } = req.params;

    const getSpecificAuthor = await AuthorModel.findOne({ name: name });

    return res.json({ Authors: getSpecificAuthor });
});

//to get list of authors based on books
/*
  route   - /author/:books
  access  - public
  method  - GET
  params  - books
  body    - none
*/
Router.get("/author/a/:books", async(req, res) => {
    const { books } = req.params;

    const getSpecificAuthors = await AuthorModel.find({ books: books });

    return res.json({ Authors: getSpecificAuthors });
});

//to post a new author
/*
  route   - /author/new
  access  - public
  method  - POST
  params  - none
*/
Router.post("/author/new", async(req, res) => {
    try {
        const { newAuthor } = req.body;
        await AuthorModel.create(newAuthor);
        return res.json({ message: "Author added successfully!" });
    } catch (error) {
        return res.json({ error: error.message });
    }
});

//to update author name
/*
  route   - /book/updateName/:isbn
  access  - public
  method  - PUT
  params  - isbn
*/
Router.put("/author/updateName/:id", async(req, res) => {
    const { updateAuthor } = req.body;
    const { id } = req.params;

    const updateAuthorName = await AuthorModel.findOneAndUpdate({
        id: parseInt(id)
    }, {
        name: updateAuthor,

    }, {
        new: true
    });

    return res.json({ Author: updateAuthorName })
});

//to delete an author
/*
  route   - /author/delete/:Id
  access  - public
  method  - DELETE
  params  - Id
*/
Router.delete("/author/delete/:Id", async(req, res) => {
    const { Id } = req.params;

    const updateAuthor = await Book.findOneAndDelete({
        id: Id
    }, {
        new: true
    });

    return res.json({ Authors: updateAuthor });

});

module.exports = Router;