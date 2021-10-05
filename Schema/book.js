const mongoose = require("mongoose");

//Creating book schema
const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true
    },
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPages: Number,
    category: [String],
    publication: Number,
});

//creating book model
const BookModel = mongoose.model("Book", BookSchema);

module.exports = BookModel;