const express = require('express')
const app = express();
const mongoose = require('mongoose')
const morgan = require("morgan")
const postRoute = require('./routes/post')
const authRoutes = require('./routes/auth')
const users = require("./routes/user")
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const expressValidator = require('express-validator')
const fs = require('fs')
const cors = require("cors")
const cookieParser = require("cookie-parser");
dotenv.config()

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useFindAndModify:false})
.then(()=>{
    console.log('DB connected')
})
mongoose.connection.on('error',err => {
    console.log("Connection error message")
})

app.use(morgan("dev"))
app.use(cookieParser());
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cors())
app.use("/api",users)
app.use("/api",postRoute)
app.use("/api",authRoutes)
app.get('/api',(req,res)=>{
    fs.readFile('docs/apiDocs.json',(err,data)=>{
      if(err)
      {
        res.status(400).json({
          error:err
        })
      }
      const docs = JSON.parse(data)
      res.json(docs);
    })
})
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error:'invalid token...'});
    }
  });


const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Listening to port ${port}`)    
})
