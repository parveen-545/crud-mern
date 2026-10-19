const express = require ("express");
const {handleBookStoreController, handleGetAllBookController, handleDeleteBookController} = require("../controller/book.controller");

const router = express.Router();


//http://localhost:8080/book/addbook
router.post('/addbook', handleBookStoreController)
router.get('/getbooks', handleGetAllBookController)
router.delete('/deletebook/:id', handleDeleteBookController)

module.exports = router