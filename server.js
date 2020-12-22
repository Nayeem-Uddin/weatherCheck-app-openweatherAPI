const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv/config')
app.use(cors())
app.use(express.static('client'))
const historyRoute = require('./route')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// mongoose.connect('mongodb+srv://weather:12345@test-cluster.ewato.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true});
// mongoose.connection.once('open', function(){
//   console.log('Conection has been made!');
// }).on('error', function(error){
//     console.log('Error is: ', error);
// });


mongoose.connect(process.env.DataBase,{useNewUrlParser:true},()=>{
    console.log('database connected successfully')
})

app.use('/api',historyRoute)

const PORT = process.env.PORT || 4444
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})
