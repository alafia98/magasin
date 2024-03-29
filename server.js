const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors')
dotenv.config();

// mongodb connection
connectDB();


// rest object
const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// routes
app.use('/api/v1/user', require("./routes/userRoutes"))

// listen port
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server Running in ${process.env.NODE_MODE} Node on port ${port}`.bgCyan.white);
})