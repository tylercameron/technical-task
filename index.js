const express = require('express');
const port = 5000;
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const dbConnection = require('./models/Movie.js')

dbConnection.connect(function (err) {
    if (err) throw err;
    console.log("DB Connected!");
});

const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    next();
});

routes(app);

app.listen(port, () => console.log(`Server listening on port ${port}!`));