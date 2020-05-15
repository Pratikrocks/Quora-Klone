const express = require('express')
const app = express();
const mongoose = require('mongoose')
const morgan = require("morgan")
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const expressValidator = require('express-validator')
const fs = require('fs')
const cors = require("cors")
const cookieParser = require("cookie-parser");
dotenv.config()

mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser:true,useFindAndModify:false})
.then(()=>{
    console.log('DB connected')
})
mongoose.connection.on('error',err => {
    console.log("Connection error message")
});

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.get('/api',(req,res)=>{
  fs.readFile('docs/apiDocs.json',(err,data)=>{
    if(err)
    {
      res.status(400).json({
        error:err
      });
    }
    const docs = JSON.parse(data)
    res.json(docs);
  });
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use('/api', postRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error:'invalid token...'});
    }
  });

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Listening to port ${port}`)    
})
