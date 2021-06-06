const mongoose = require('mongoose');
const connection = mongoose.connection;
const dotenv   = require('dotenv')
dotenv.config({path:'../.env'}) 

connection.on('error', console.error.bind(console, 'connection error:'));

async function connectToMongoDb(){
    await mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true })
    console.log("connected to mongodb")
}

module.exports = {
    connectToMongoDb,
    connection
}

// mongoose.connect( process.env.MONGODB_URL , {
//     useNewUrlParser : true ,
//     useUnifiedTopology : true ,
//     useCreateIndex : true,
//     useFindAndModify : false
//     // 아래 코드는 연결ㄹ이 잘 됐는지 안됐는지 확인하기 
// })


// exports.connect = function(){
//   connection.on('error', function dbError(){
//       console.log('Connection Error');
//   });
//   connection.once('connected', function dbConnected(){
//     console.log('Connected to the database');
//   });
//   connection.on('disconnected', function dbDisconnected(){
//     console.log('Database disconnected');
//   });
//   process.on('SIGINT', function closeConnection(){
//     mongoose.connection.close(function(){
//         console.log('Server is down, closing the connection');
//         process.exit(0);
//     });
//   });
// }