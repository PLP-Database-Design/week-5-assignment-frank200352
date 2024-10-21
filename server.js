/* jshint esversion: 8 */
/*eslint no-undef: "error"*/
/*global require, process, console*/

const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

const db  = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
 });

 db.connect((err) => {
  if (err)
      return console.log('Error connecting to the mysql database', err);
      console.log('connected to mysql successful as id: ', db.threadId);

});

//GET METHOD CODE GOES HERE
//question 1.  Define a GET endpoint to retrieve all patients
app.get('/patients', (req, res) => {
const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';

  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      // Send the results as JSON response
      res.json(results);
  });
});

//question 2.  Define a GET endpoint to retrieve all providers with their
app.get('/providers', (req, res) => {
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        // Send the results as JSON response
        res.json(results);
    });
  });
  // question 3. GET /patients?first_name=<name> - Fetch patients by their first name
  app.get('/patients', (req, res) => {
    const sql = 'SELECT first_name FROM patients';
      db.query(sql, (err, results) => {
          if (err) {
              return res.status(500).send(err);
          }
          // Send the results as JSON response
          res.json(results);
      });
    });
// question 4. Request query key value pairs
app.get('/providers_specialty/:specialty',(req,res) => {
  const {specialty} = req.params;
  console.log({specialty});
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  db.query(sql, [specialty], (err,results) => {
    if (err){
      return res.status(500).send(err);
    }
    res.json(results);
  });
});


//STOP GET METHOD CODE GOES HERE

//START THE SERVER
const PORT = 7600;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});


      //send message to the browser
      console.log('sending message to the browser...');
      app.get('/', (req, res) => {
          res.send('server started successfully');
      });

