const express = require('express');
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');

let e = express()

function configExpress(e) {

    e.use((req, res, next) => {
        var now = new Date().toString();
        var log = `${now} : ${req.method} : ${req.url}`
        fs.appendFile('requests.log', log + '\n', (err) => {
            if (err) {
                console.log(err);
            }
        });
        next();
    });
    e.use(express.static(path.join(__dirname, './statics')));
    e.set('view engine', 'hbs');
    hbs.registerPartials(path.join(__dirname, './partials'));
    hbs.registerHelper('Date', () => {
        return new Date().getFullYear();
    })
    e.listen(3000, () => {
        console.log('server running...');
    })
}

module.exports = configExpress