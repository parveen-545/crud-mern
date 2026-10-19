const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema ({
    BookName: {
        type: String,
        required: true,
        trim: true // Aage-peeche ke faltu spaces khud remove ho jayenge
    },
    BookTitle: {
        type: String,
        required: true,
        trim: true
    },
    Author: {
        type: String,
        required: true,
        trim: true
    },
    SellingPrice: {
        type: Number,
        required: true,
    },
    PublishDate: {
        type: Date,
        default: Date.now(),
    }
}, { timestamps: true }); 

// Model ko export kar rahe hain
const Book = mongoose.model("book", bookSchema);
module.exports = { Book };
