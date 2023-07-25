const express = require('express');
const colors = require('colors');
const morgran = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//rest  object
const app = express();

//config
dotenv.config();

//db 
connectDB();

//middleware
app.use(express.json());
app.use(morgran('dev'));

//routes
app.use('v1//api/users', require('./routes/userRoutes'));

//port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`.green.bold);
}
);