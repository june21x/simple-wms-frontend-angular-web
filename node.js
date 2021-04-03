const express = require('express')
const bodyParser = require('body-parser')
const dbqueries = require('./queries')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (request, response) => {
    response.json({ info: "Hello! Currently using Node.js, Express, and Postgres API" })
})



// API queries
// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)



app.listen(port, () => {
    console.log('App running on port ${port}.')
})