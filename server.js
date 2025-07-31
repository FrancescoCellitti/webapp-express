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

app.get('/api/films', (req, res)=>{
    const sql = 'select * from movies'

    connection.query(sql, (err, results)=>{
        if(err) return res.status(500).json({
            error: true,
            message: err.message
        })
        console.log(results)
        res.json(results)
    })
})

