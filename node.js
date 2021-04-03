const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/db', async (req, res) => {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM test_table');
            res.render('pages/db', results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))





// const express = require('express')
// const bodyParser = require('body-parser')
// const dbqueries = require('./queries')

// const app = express()
// const port = process.env.PORT || 3000

// app.use(express.json())
// app.use(express.urlencoded({
//     extended: true
// }));

// app.get('/', (request, response) => {
//     response.json({ info: "Hello! Currently using Node.js, Express, and Postgres API" })
// })



// // API queries
// // app.get('/users', db.getUsers)
// // app.get('/users/:id', db.getUserById)
// // app.post('/users', db.createUser)
// // app.put('/users/:id', db.updateUser)
// // app.delete('/users/:id', db.deleteUser)



// app.listen(port, () => {
//     console.log('App running on port ${port}.')
// })