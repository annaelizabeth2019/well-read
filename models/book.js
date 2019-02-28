var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notesSchema =  new Schema({
    text: String
}, {
    timestamps: true
});

var bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    cover: String,
    published: String,
    finished: {
        type: Boolean,
        required: true,
        default: true
    },
    notes: [notesSchema]
})

module.exports = mongoose.model ('Book', bookSchema)