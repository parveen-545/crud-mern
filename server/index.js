require("dotenv").config(); // इसे सबसे ऊपर रखें
const cors = require('cors'); // 👈 Top imports mein add karein

const express = require('express');
const databaseConnections = require('./database');
const bookRouter = require("./routes/book.routes")

// database connection
databaseConnections();

const app = express();

app.use(cors()); // 👈 app.use(express.json()) ke theek upar laga dein
app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello world");
}); 

app.use('/book', bookRouter)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Port is running on the port ${PORT}`);
});



 
 
 