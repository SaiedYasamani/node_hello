const express = require('express');
const configExpress = require('./configExpress');

const api = express();
configExpress(api);

api.get('/home',(req, res) => {
    res.render('home');
});
