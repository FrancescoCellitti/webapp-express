require ('dotenv').config()
const express = require('express')
const app = express()
const Port = process.env.PORT
const connection = require('./data/connection')

app.listen(Port, ()=>{
    console.log(`server is now running on http://localhost:${Port}`)
})

app.get('/', (req, res) => {

  res.send('Welcome to films express server! The server is running')

})

