const mongoose = require("mongoose");;

//creating author Schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//creating author Model
const AuthorModel = mongoose.model("Author", AuthorSchema);

module.exports = AuthorModel;