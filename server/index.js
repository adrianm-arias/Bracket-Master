require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.use(staticMiddleware);

app.post('/api/sign-up', (req, res, next) => {
  const { username, password, firstName } = req.body;
  if (!username || !password || !firstName) {
    throw new ClientError(400, 'username, password and name are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "password", "firstName")
        values ($1, $2, $3)
        returning "userId", "username", "firstName"
      `;
      const params = [username, hashedPassword, firstName];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/sign-in', (req, res, next) => {
  const { username, password: userPassword } = req.body;
  if (!username || !userPassword) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "password",
           "firstName"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, password, firstName } = user;
      return argon2
        .verify(password, userPassword)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username, firstName };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
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

app.get('/api/brackets/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'Please Sign in');
  }
  const sql = `
    select *
      from "brackets"
      where "userId" = $1
      order by "createdAt" desc;
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/brackets/groups/:bracketId', (req, res, next) => {
  const bracketId = Number(req.params.bracketId);
  if (!bracketId) {
    throw new ClientError(400, 'Please Sign in');
  }
  const sql = `
    select *
      from "groupStage"
      where "bracketId" = $1
  `;
  const params = [bracketId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/brackets/knockout/:bracketId', (req, res, next) => {
  const bracketId = Number(req.params.bracketId);
  if (!bracketId) {
    throw new ClientError(400, 'Please Sign in');
  }
  const sql = `
    select *
      from "knockoutStage"
      where "bracketId" = $1
  `;
  const params = [bracketId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

// Every route after middleware requires a token.

app.use(authorizationMiddleware);

app.post('/api/brackets', (req, res, next) => {
  const { userId, bracketName } = req.body;
  if (!userId || !bracketName) {
    throw new ClientError(400, 'user ID and bracket name are required fields');
  }
  const sql = `
    insert into "brackets" ("userId", "bracketName")
    values ($1, $2)
    returning *
  `;
  const params = [userId, bracketName];
  db.query(sql, params)
    .then(result => {
      const [brackets] = result.rows;
      res.status(201).json(brackets);
    })
    .catch(err => next(err));
});

app.post('/api/groups', (req, res, next) => {
  const { a1, a2, b1, b2, bracketId, c1, c2, d1, d2, e1, e2, f1, f2, g1, g2, h1, h2 } = req.body;
  if (!bracketId) {
    throw new ClientError(400, 'bracket ID are required fields');
  }
  const sql = `
    insert into "groupStage" ("a1", "a2", "b1", "b2", "bracketId", "c1", "c2", "d1", "d2", "e1", "e2", "f1", "f2", "g1", "g2", "h1", "h2")
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
    returning *
  `;
  const params = [a1, a2, b1, b2, bracketId, c1, c2, d1, d2, e1, e2, f1, f2, g1, g2, h1, h2];
  db.query(sql, params)
    .then(result => {
      const [groupSelection] = result.rows;
      res.status(201).json(groupSelection);
    })
    .catch(err => next(err));
});

app.post('/api/koStage', (req, res, next) => {
  const { game49, game50, game51, game52, bracketId, game53, game54, game55, game56, game57, game58, game59, game60, game61, game62, game63 } = req.body;
  if (!bracketId) {
    throw new ClientError(400, 'bracket ID are required fields');
  }
  const sql = `
    insert into "knockoutStage" ("game49", "game50", "game51", "game52", "bracketId", "game53", "game54", "game55", "game56", "game57", "game58", "game59", "game60", "game61", "game62", "game63")
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    returning *
  `;
  const params = [game49, game50, game51, game52, bracketId, game53, game54, game55, game56, game57, game58, game59, game60, game61, game62, game63];
  db.query(sql, params)
    .then(result => {
      const [koSelection] = result.rows;
      res.status(201).json(koSelection);
    })
    .catch(err => next(err));
});

app.patch('/api/groups/:groupStageId', (req, res, next) => {
  const groupStageId = Number(req.params.groupStageId);
  if (!groupStageId) {
    throw new ClientError(400, 'groupStage ID are required fields');
  }
  const { a1, a2, b1, b2, c1, c2, d1, d2, e1, e2, f1, f2, g1, g2, h1, h2 } = req.body;
  const sql = `
    update "groupStage"
      set "a1" = $1,
          "a2" = $2,
          "b1" = $3,
          "b2" = $4,
          "c1" = $5,
          "c2" = $6,
          "d1" = $7,
          "d2" = $8,
          "e1" = $9,
          "e2" = $10,
          "f1" = $11,
          "f2" = $12,
          "g1" = $13,
          "g2" = $14,
          "h1" = $15,
          "h2" = $16
    where "groupStageId" = $17
    returning *
  `;
  const params = [a1, a2, b1, b2, c1, c2, d1, d2, e1, e2, f1, f2, g1, g2, h1, h2, groupStageId];
  db.query(sql, params)
    .then(result => {
      const [groupSelection] = result.rows;
      res.status(201).json(groupSelection);
    })
    .catch(err => next(err));
});

app.delete('/api/brackets/:bracketId', (req, res, next) => {
  const bracketId = Number(req.params.bracketId);
  if (!bracketId) {
    throw new ClientError(400, 'bracket ID are required fields');
  }
  const sql = `
    delete from "groupStage"
 where "bracketId" = $1
  `;
  const params = [bracketId];
  db.query(sql, params)
    .then(result => {
      const sql = `
    delete from "brackets"
 where "bracketId" = $1
  `;
      const params = [bracketId];
      db.query(sql, params)
        .then(result => {
          const [bracketSelection] = result.rows;
          res.status(201).json(bracketSelection);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
