const express = require('express'); // calling package
const app = express();

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//import api file
const productRoutes = require('./API/routes/products');
const orderRoutes = require('./API/routes/orders')
const useRoutes = require('./API/routes/user')

console.log('Connecting to MongoDB...')

//connection with mongodb get url from mongodb website 
var result = mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

console.log(result) // it will print the promise object returned by mongoose.connect() in the console. The promise will be pending until the connection is established or an error occurs. Once the connection is successful, it will log 'MongoDB connected successfully'. If there is an error during the connection process, it will log 'MongoDB connection error:' followed by the error details.  

const morgan = require('morgan') // It provides logging functionality to log information about incoming HTTP requests to your server.
app.use(morgan('dev')) //. The 'dev' parameter passed to morgan specifies the predefined log format,

app.use('/upload', express.static('upload')); // make upload folder public, without this line its private

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//When client and server are on 2 different ports so we have to set headers 
//CORS error handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With", "Content-Type", "Accept", "Authorization");
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

// Call api files
app.use('/products', productRoutes); //this is used to mount a middleware function or a router to a specific path.
app.use('/orders', orderRoutes);
app.use('/user', useRoutes)

//Error handling if api not found
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error)
})

// next function is used to pass control to the next middleware function in the stack 
// Following kind of function are known as MiddleWare function   
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})



module.exports = app;