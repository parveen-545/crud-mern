const express = require ("express");
// ⚡ handleUpdateBookController को भी यहाँ इम्पोर्ट (destructure) कर लिया
const {
  handleBookStoreController, 
  handleGetAllBookController, 
  handleDeleteBookController,
  handleUpdateBookController 
} = require("../controller/book.controller");

const router = express.Router();

// http://localhost:8080/book/addbook
router.post('/addbook', handleBookStoreController)
router.get('/getbooks', handleGetAllBookController)
router.delete('/deletebook/:id', handleDeleteBookController)
router.get('/booklists', handleGetAllBookController)
// ✅ नया रूट जोड़ दिया: http://localhost:8080/book/updatebook/:id
router.put('/updatebook/:id', handleUpdateBookController)

module.exports = router;
