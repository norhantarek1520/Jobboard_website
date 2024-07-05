const cors = require("cors");//Enables controlled access to resources on a server from a web page running on a different domain.
const bodyParser = require('body-parser');//Parses incoming request bodies
const express = require('express');
const dotenv = require('dotenv') //facilitates managing environment variables from a .env file.
const app = express();
const morgan = require('morgan'); // Morgan is a popular middleware that acts as an HTTP request logger
// Global middleware
app.use(cors());
dotenv.config()
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("uploads")); // Serve static files from uploads
app.use(morgan('dev'));
// Test HTTP Req 
app.post('/test',(req,res)=>{
    console.log("This is Jobboard app , who are you ? ")
    console.log(req.body.name);
    res.json({"name": req.body.name})
})

app.use('/categories',require('./Routers/CategoryRouter'))
app.use('/companies',require('./Routers/CompanyRouter'))
// app.use('',require('./Routers/AuthRouter'))
// app.use('', require('./Routers/UserRouter'))

// Start the server
app.listen(process.env.PORT, () => {console.log(`Server running on port: ${process.env.PORT }`);});
