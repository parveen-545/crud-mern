require("dotenv").config(); // इसे सबसे ऊपर रखें
const cors = require('cors'); // 👈 Top imports mein add karein

const express = require('express');
const databaseConnections = require('./database');
const bookRouter = require("./routes/book.routes")
const userRouter = require('./routes/user.routes')
const authMiddleware = require('./middleware/auth.middleware')

// database connection
databaseConnections();

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Aapka React app jis port par chal raha hai (Vite ka defaults 5173 hota hai)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello world");
}); 

app.use('/book', authMiddleware, bookRouter)
app.use('/user', userRouter)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Port is running on the port ${PORT}`);
});



 
 
 