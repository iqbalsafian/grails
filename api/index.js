require('dotenv').config();

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid/v4');

const config = require('./config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { Pool } = require('pg');
const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort
});
pgClient.on('error', () => console.log('Postgres connection error'));

// test the api endpoint
app.get('/test', (req, res) => {
  res.send('Endpoint works!')
})

const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server is running on port ${port}`));
