const {Book} = require("../model/book.model");

const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;
    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.Author ||
      !body.SellingPrice
    ) {
      return res
        .status(400)
        .json({ message: "all fields are required...", success: false });
    }

    const existingBook = await Book.findOne({
      BookName: body.BookName,
      Author: body.Author,
    });

    if (existingBook) {
      return res.status(400).json({
        message: "book to already add hai, pls add another book",
        success: false,
      });
    }

    const bookAdd = await Book.create(body);
    console.log(bookAdd, "boook addd kar rahe hain");

    return res.status(201).json({
      message: "book added successfully",
      success: true,
      data: bookAdd,
      id: bookAdd?.id,
    });
  } catch (error) {
    console.log(error.message, "controller error");
    return res.status(500).json({ message: error.message, success: false });
  }
};

const handleGetAllBookController = async (req, res) => {
  try {
    const allBook = await Book.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: allBook.length,
      data: allBook,
    });
  } catch (error) {
    console.log(error, "get books error");
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const handleDeleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      return res
        .status(400)
        .json({ success: false, message: "book not found bhai..." });
    }

    return res.status(200).json({
      success: true,
      message: "book deleted successfully",
      data: deleteBook,
    });
  } catch (error) {
    console.log(error.message, "delete hone me dikkat hai koi...");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleUpdateBookController = async (req, res) => {
  try {
    const id = req.params.id;
    const updateBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateBook) {
      return res.status(400).json({
        message: "bhai book to database me hai hi nahi :(",
        success: false,
      }); 
    }

    return res.status(200).json({
      success: true,
      message: "book updated successfully",
      data: updateBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "bhai kuch error aa rahi hai...",
      error: error.message,
    });
  }
};

module.exports = {
  handleBookStoreController,
  handleGetAllBookController,
  handleDeleteBookController,
  handleUpdateBookController
};
