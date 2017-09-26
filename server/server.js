require('dotenv').load({silent: true});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const util = require ('util');
const pgQuery = require('pg-query');

/*jshint multistr: true */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/***DB connection string for any DB calls throughout the app***/
// pgQuery.connectionParameters = process.env.DATABASE_URL;  //heroku
pgQuery.connectionParameters = 'postgres://localhost:5432/noraChurch'; //local

app.use(express.static (path.join(__dirname, '../dist')));

app.set('port', process.env.PORT || 8000);

app.route('/tenants')
.get((req, res) => {
  pgQuery('SELECT * from tenants')
  .then( rows => res.json(rows[0]) )
  .catch( err => {
    res.status(424).send('failed dependancy!');
    console.log(err);
  });
})
.post((req, res) => {
  pgQuery(`INSERT INTO tenants (tenant_name) 
    VALUES ($1) 
    RETURNING *`, 
    [req.body.tenantName]
  )
  .then(rows => res.json(rows[0]))
  .catch(err => res.status(424).send('failed dependancy!'));
})
.put((req, res) => {
  console.log(req.body);
  pgQuery(`UPDATE tenants 
    SET tenant_name = $1 
    WHERE tenant_id = $2 
    RETURNING *`
    ,[
      req.body.tenantName, 
      req.body.tenantId
  ])
  .then(rows => res.json(rows[0]))
  .catch(err => res.status(424).send('failed dependancy!'));
})
.delete((req, res) => {
  console.log(req.body);
  pgQuery(`DELETE FROM tenants
    WHERE tenant_id = $1 
    RETURNING *`
    ,[ req.body.tenantId ]
  )
  .then(rows => res.json(rows[0]))
  .catch(err => res.status(424).send('failed dependancy!'));
});

app.listen(app.get('port'), function () {
  util.log(' listening on port ', app.get('port'));
});