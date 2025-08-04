require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Port = process.env.PORT
const connection = require('./data/connection')
app.use(express.static('public'))

app.use(cors())

app.listen(Port, () => {
    console.log(`server is now running on http://localhost:${Port}`)
})

app.get('/', (req, res) => {

    res.send('Welcome to films express server! The server is running')

})

app.get('/api/films', (req, res) => {
    const sql = 'select * from movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: true,
            message: err.message
        })
        console.log(results)
        res.json(results)
    })
})


app.get('/api/films/:id', (req, res) => {
    const filmId = req.params.id

    const sql = `
        SELECT 
            movies.title,
            reviews.name,
            reviews.vote,
            reviews.text,
            reviews.created_at,
            reviews.updated_at
           
        FROM movies
        LEFT JOIN reviews  ON movies.id = reviews.movie_id
        WHERE movies.id = ?
    `

    connection.query(sql, [filmId], (err, results) => {
        if (err) return res.status(500).json({
            error: true,
            message: err.message
        })

        if (results.length === 0) {
            return res.status(404).json({
                error: true,
                message: 'Film non trovato'
            })
        }

        console.log(results)
        res.json(results)
    })
})

