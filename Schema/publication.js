const mongoose = require("mongoose");

//creating publication Schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//creating publication Model
const PublicationModel = mongoose.model("Publication", PublicationSchema);

module.exports = PublicationModel;