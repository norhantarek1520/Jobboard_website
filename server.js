const cors = require("cors");
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv')
const app = express();

// Global middleware
app.use(cors());
dotenv.config()
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("uploads")); // Serve static files from uploads


// Test Data base 
const {connectDb}  = require('./Database/connect_db')
// Test HTTP Req 
app.post('/test',(req,res)=>{
    console.log("This is Jobboard app , who are you ? ")
    console.log(req.body.name);
    res.json({"name": req.body.name})
})


// Start the server
app.listen(process.env.PORT, () => {console.log(`Server running on port: ${process.env.PORT }`);});
