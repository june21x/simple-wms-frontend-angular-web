const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000   // currently listens on the environment port (or 5000 otherwise) -- connect to this port to connect to Angular
var routes = require('./routes/index');

const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded());

app.use('/', routes);

app.use(function(req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use(function(err, req, res, next) {
  res.status(erro.status || 500).json({
    status: 'error',
    message: err.message
  });
});

module.exports = app;







// // our initial route
// app.get('/', (req, res) => res.render('pages/home'));

// // our database 'homepage' route
// app.get('/db', (req, res) => res.render('pages/db'));

// // test query for checking all incoming shipments
// app.get('/db/incomingshipments', (req, res) => res.render('xx'));

// // listen on port for any incoming requests (will mainly be from angular side)
// app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', async (req, res) => res.render('pages/home'))
//   .get('/db', (req, res) => res.render('pages/db'))
//   .get('/db/incomingshipments', async (req, res) => {
//     try {
//       const client = await pool.connect();
//       const result = await client.query('SELECT * FROM Shipment');
//       const results = { 'results': (result) ? result.rows : null};
//       res.render('pages/incoming_shipments', results);
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error: " + err);
//     }
//   })
//   .get('/db/items', async (req, res) => {
//     try {
//       const client = await pool.connect();
//       const result = await client.query('SELECT * FROM Crate');
//       const results = { 'results': (result) ? result.rows : null};
//       res.render('pages/items', results);
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error: " + err);
//     }
//   })
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))