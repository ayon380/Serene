const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    description: {     // This is the body of the note
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});
module.exports = mongoose.model('todo', NoteSchema);