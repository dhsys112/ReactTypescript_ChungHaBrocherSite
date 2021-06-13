const express    = require('express');
const cors       = require('cors')
const app        = express();
const path       = require("path");
const {connectToMongoDb} = require('./db/db')   
require("dotenv").config();

// connect to mongodb
connectToMongoDb()

// Allows our application to make HTTP requests to Express application
app.use(cors());

// post body
app.use(express.json())

// Main   --- 
const main = require('./router/main')
app.use('/api/', main)

// Albums   --- 
const albums = require('./router/albums')
app.use('/api/album/', albums)

// Songs   --- 
const songs = require('./router/songs')
app.use('/api/song/', songs)

// production set
if(process.env.NODE_ENV == 'production'){
  // set static folder
  app.use(express.static('client/build'))
  // indet.html for all page routes
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
  })
}

const port = process.env.PORT || 5000

const server = app.listen(port,function(){
  console.log("Server has started on port 5000");
});