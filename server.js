const cors = require("cors");//Enables controlled access to resources on a server from a web page running on a different domain.
const bodyParser = require('body-parser');//Parses incoming request bodies
const express = require('express');
const dotenv = require('dotenv') //facilitates managing environment variables from a .env file.
const app = express();
const morgan = require('morgan'); // Morgan is a popular middleware that acts as an HTTP request logger

const  ApiError = require('./Shared/ApiError');
const globalError = require('./Middlwares/errorMiddleware');
const { isAdmin } = require("./Middlwares/isAdminMiddleware");
const { isAuthorized } = require("./Middlwares/isAuthorizedMiddleware");

// Global middleware
app.use(cors());
dotenv.config()
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("uploads")); // Serve static files from uploads
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    // console.log(`mode: ${process.env.NODE_ENV}`);
}


app.use('/', require('./Routers/AuthRouter'))
app.use('/categories',require('./Routers/CategoryRouter'))
app.use('/companies',require('./Routers/CompanyRouter'))
app.use('/users' ,require('./Routers/UserRouter'))

app.get('/test', isAuthorized,(req,res)=>{
    res.json("hi")
})



app.all('*', (req, res, next) => { // we use this middleware if the user enter any unknown router 
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400)); // Use new keyword
})
// Global error handling middleware for express 
app.use(globalError); 

app.listen(process.env.PORT, () => {console.log(`Server running on port: ${process.env.PORT }`);});
