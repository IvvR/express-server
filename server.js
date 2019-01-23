const express = require('express');
const hbs = require('hbs');
//I am pretty sure heroku does NOT allow file logging
// const fs = require('fs');

//heroku deployment
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}  ${req.url}`;
  // fs.appendFile('server.log', log + '\n', err => {
  //   if (err) {
  //     console.log('Unable to uppemd to server.log' + err.message);
  //   }
  // });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance',
//     pageHeader: 'The server is under maintenance. We will be right back'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    pageHeader: 'Welcome',
    welcomeMsg: 'Welcome to IvvR home page'
  });
  // res.send('<h1>Hi Ivan, I am Express !</h1>');
  // res.send({
  //   name: 'Ivan',
  //   likes: ['bykes', 'yoga']
  // });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    pageHeader: 'Head news'
  });
  // res.send('About IvvR page');
});

// bad request
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.get('/maintenence', (req, res) => {
  res.render('maintenence.hbs', {
    pageTitle: 'Maintenence',
    pageHeader: 'The server is under maintenence. We will be right back'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
