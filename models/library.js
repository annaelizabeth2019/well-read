var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notesSchema =  new Schema({
    text: String
}, {
    timestamps: true
});

var booksSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    cover: String,
    published: {
        type: String,
        required: false
    },
    isbn: String,
    finished: {
        type: Boolean,
        required: true,
        default: true
    }
})

var librarySchema = new Schema({
    name: String,
    googleId: String,
    avatar: String,
    notes: [notesSchema],
    books: [booksSchema]
},
{
    timestamps: true
})

module.exports = mongoose.model('Library', librarySchema)