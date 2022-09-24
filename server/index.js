require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');

const app = express();

// const path = require('path');
const pg = require('pg');

app.use(staticMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// const jsonMiddleware = express.json();

// app.get('/api/hello', (req, res) => {
//   res.json({ hello: 'world' });
// });

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

app.get('/api/teams', (req, res, next) => {
  const sql = `
    select *
      from "teams"
     order by "teamId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/groupa', (req, res, next) => {
  const sql = `
    select *
      from "teams"
      where "group" = 'A'
     order by "teamId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/:teamId', (req, res, next) => {
  const teamId = Number(req.params.teamId);
  if (!teamId) {
    throw new ClientError(400, 'productId must be a positive integer');
  }
  const sql = `
    select *
      from "teams"
     where "teamId" = $1
  `;
  const params = [teamId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find product with productId ${teamId
}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});
