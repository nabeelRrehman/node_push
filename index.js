const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json());


// All Port Access

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// All Port Access


app.listen(process.env.PORT || 3003, () => {
    console.log('Port Working on port.')
})



app.use('/', require('./routes'))


