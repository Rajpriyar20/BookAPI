const PublicationModel = require("../Schema/publication");
const BookModel = require("../Schema/book");

const Router = require("express").Router();


//to get all publications
/*
  route   - /publication
  access  - public
  method  - GET
  params  - none
  body    - none
*/
Router.get("/publication", async(req, res) => {
    const getPublication = await PublicationModel.find();

    return res.json(getPublication);
});

//to get a specific publication
/*
  route   - /publication/:pubname
  access  - public
  method  - GET
  params  - pubname
  body    - none
*/
Router.get("/publication/:pubname", async(req, res) => {
    const { pubname } = req.params;

    const getSpecificPublications = await PublicationModel.findOne({ name: pubname });

    return res.json({ Publications: getSpecificPublications });
});

//to get list of publications based on books
/*
  route   - /publication/:books
  access  - public
  method  - GET
  params  - books
  body    - none
*/
Router.get("/publication/p/:books", async(req, res) => {
    const { books } = req.params;

    const getSpecificPublication = await PublicationModel.findOne({ books: books });

    return res.json({ Publications: getSpecificPublication });
});


//to post a new publication
/*
  route   - /publication/new
  access  - public
  method  - POST
  params  - none
*/
Router.post("/publication/new", async(req, res) => {

    try {
        const { newPub } = req.body;
        await PublicationModel.create(newPub);
        return res.json({ message: "Publication added successfully!" });
    } catch (error) {
        return res.json({ error: error.message });
    }
});


//to update a publication
/*
  route   - /publication/updateName/:id
  access  - public
  method  - PUT
  params  - id
*/
Router.put("/publication/updateName/:id", async(req, res) => {
    const { id } = req.params;
    const { updatePub } = req.body;

    const updatePublication = await PublicationModel.findOneAndUpdate({
        id: parseInt(id)
    }, {
        name: updatePub
    }, {
        new: true
    });

    return res.json({ Publications: updatePublication });
});

//to delete a publication
/*
  route   - /publication/delete/:Id
  access  - public
  method  - DELETE
  params  - Id
*/

Router.delete("/publication/delete/:Id", async(req, res) => {
    const { Id } = req.params;

    const updatePublication = await PublicationModel.findOneAndDelete({
        id: Id
    }, {
        new: true
    });

    return res.json({ Publications: updatePublication });
});

//to delete a book from publication
/*
  route   - /publication/delete/book/:isbn/:Id
  access  - public
  method  - DELETE
  params  - isbn, Id
*/

Router.delete("/publication/delete/book/:isbn/:Id", async(req, res) => {
    const { isbn, Id } = req.params;

    const updatePublication = await PublicationModel.findOneAndUpdate({
        id: Id
    }, {
        $pull: {
            books: isbn
        }
    }, {
        new: true
    });

    const updateBook = await BookModel.findOneAndUpdate({
        ISBN: isbn
    }, {
        $set: {
            publication: 0
        },
    }, {
        new: true
    });

    return res.json({ Book: updateBook, Publications: updatePublication });
});

module.exports = Router;