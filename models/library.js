var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var librarySchema = new Schema({
    name: String,
    googleId: String,
    books: [{type: Schema.Types.ObjectId,
        ref: 'Book'}]
    },
{
    timestamps: true
})

module.exports = mongoose.model('Library', librarySchema)