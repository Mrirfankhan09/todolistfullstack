require('dotenv').config()

const express = require('express');
const router = require('./routes/routes')
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')

const server = express();

server.use(express.urlencoded({extended:true}))
server.use(express.json());
server.use(cors());
server.use(express.static(process.env.PUBLIC_DIR))
server.use('/tasks',router);

server.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'public','index.html'));
})


const mongoose = require('mongoose');

main().catch(err => console.log(err));
console.log(process.env.MONGO_URL,process.env.PUBLIC_DIR,process.env.PORT)
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/tasks');

  // use `await mongoose.connect('');` if your database has auth enabled
  console.log('server connected')
}



server.listen(process.env.PORT,()=>{
    console.log('server started')
})