const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors');
const connectDB = require('./config/db');
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/user', require("./routes/userRoutes"))
app.use('/api/v1/user', require("./routes/bonLivraisonRoutes"))

// listen port
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server Running in ${process.env.NODE_MODE} Node on port ${port}`.bgCyan.white);
})