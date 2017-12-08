require('dotenv').load({silent: true});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const util = require ('util');
const pgQuery = require('pg-query');
const bcrypt = require('bcrypt');
const database = require('./dbQueries');
const SALT_FACTOR = 10;

/*jshint multistr: true */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/***DB connection string for any DB calls throughout the app***/
// pgQuery.connectionParameters = process.env.DATABASE_URL;  //heroku
pgQuery.connectionParameters = 'postgres://localhost:5432/noraChurch'; //local

app.use(express.static (path.join(__dirname, '../dist')));

app.set('port', process.env.PORT || 2000);

app.route('/tenants')
.get((req, res) => {
  console.log('get', req.body);
  pgQuery('SELECT * from tenants')
  .then( rows => res.json(rows[0]) )
  .catch( err => {
    res.status(424).send('failed dependancy!');
    console.log(err);
  });
})
.post((req, res) => {
  let tenant;
  const promise1 = database.addTenant(req.body.name);
  const promise2 = bcrypt.hash(process.env.ADMIN_PASSWORD, SALT_FACTOR);
  Promise.all([promise1, promise2])
  .then(([rows, hash]) => {
    tenant = rows[0][0];
    return database.createAdminUser(tenant, hash);
  })
  .then(rows => {
    return res.json(tenant) 
  })
  .catch(err => {
    console.log(err);
    res.status(424).send('failed dependancy!');
  });
})
.put((req, res) => {
  console.log('put', req.body);
  pgQuery(`UPDATE tenants 
    SET tenant_name = $1 
    WHERE tenant_id = $2 
    RETURNING *`
    ,[
      req.body.tenant.name, 
      req.body.tenant.id
  ])
  .then(rows => res.json(rows[0]))
  .catch(err => res.status(424).send('failed dependancy!'));
})
.delete((req, res) => {
  console.log('delete', req.query);
  pgQuery(`DELETE FROM tenants
    WHERE tenant_id = $1 
    RETURNING *`
    ,[ req.query.id ]
  )
  .then(rows => res.json(rows[0]))
  .catch(err => res.status(424).send('failed dependancy!'));
});
console.log('hi mom', app.get('port'));
app.listen(app.get('port'), function () {
  util.log(' listening on port ', app.get('port'));
});