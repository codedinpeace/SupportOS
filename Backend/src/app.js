require('dotenv').config()
const express = require('express')

// app initialization
const app = express()

// middlewares
const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(cookieParser())   

// database connection
const connectDB = require('./db/mongoDB')
connectDB()

// routes baseURl
const authRouter = require('./routes/auth.routes')
app.use('/api/auth', authRouter)


// error middleware
const handleError = require('./middlewares/errors.middleware')
app.use(handleError)

module.exports = app