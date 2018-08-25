const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

let app = express();

hbs.registerPartials( __dirname + '/views/partials' );
app.set( 'view engine', 'hbs' );
app.use( express.static(__dirname + '/public') );

app.use((req, res, next) => {

    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log( log );
    fs.appendFile('server.log', log + '\n', (error) => {
        if( error ) throw error;
        console.log('appending file..');
    });

    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

hbs.registerHelper( 'getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome muh fucka!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'You got an error...'
    });
});

app.listen(3000);