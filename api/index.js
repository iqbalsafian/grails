require('dotenv').config();

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const { uuid } = require('uuidv4');

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
pgClient
  .query(
    `
      CREATE TABLE IF NOT EXISTS guardlists (
        id uuid NOT NULL,
        repository_name TEXT NOT NULL,
        status TEXT NOT NULL,
        findings JSONB NOT NULL,
        queued_at BIGINT NOT NULL,
        scanned_at BIGINT NOT NULL,
        finished_at BIGINT NOT NULL
      )
    `
  )
  .catch(err=>console.log(err))

// test the api endpoint
app.post('/test', (req, res) => {
  res.send('Endpoint works!')
});

app.get('/', async (req, res) => {
  const lists = await pgClient.query('SELECT * from guardlists');
  res.status(200).send(lists.rows);
})

app.get('/:id', async (req, res) => {
  const list = await pgClient.query(`SELECT * from guardlists where id = '${req.params.id}'`)
  res.status(200).send(list.rows);
})

app.post('/', async (req, res) => {
  const { repository_name, status, findings, queued_at, scanned_at, finished_at } = req.body;
  const id = uuid();
  
  const addRecord = await pgClient
    .query(
      `INSERT INTO guardlists (id, repository_name, status, findings, queued_at, scanned_at, finished_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
       [id, repository_name, status, findings, Math.round(new Date(queued_at).getTime()/1000), Math.round(new Date(scanned_at).getTime()/1000), Math.round(new Date(finished_at).getTime()/1000)]
      )
    .catch(e => {
      res
        .status(500)
        .send('Encountered an internal server error while creating the record')
    })
  
  res.status(201).send(`Data succesfully added with ID ${id}`);
});

app.put('/', async (req, res) => {
  const { id, repository_name, status, findings, queued_at, scanned_at, finished_at } = req.body;

  const updateRecord = await pgClient
    .query(
      `
        UPDATE guardlists set repository_name = $1, status = $2, findings = $3, queued_at = $4, scanned_at = $5, finished_at = $6
        WHERE id = $7
      `,
      [
        repository_name, status, findings, Math.round(new Date(queued_at).getTime()/1000), Math.round(new Date(scanned_at).getTime()/1000), Math.round(new Date(finished_at).getTime()/1000), id
      ]
    )
    .catch(e => {
      res
        .status(500)
        .send('Encountered an internal server error while creating the record')
    })
  
  res.status(201).send(`Data successfully updated`);
})

const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server is running on port ${port}`));
