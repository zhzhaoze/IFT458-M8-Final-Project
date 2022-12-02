const path = require('path');
const express = require('express');
const morgan = require('morgan');
const pug = require('pug');
const session = require('express-session');
var bodyParser = require('body-parser')
const courses = require('../Module 7- UI IT1-BaseTemplate/dev-data/data/courses.json')


const viewRouter = require('./routes/viewRoutes');
const userRouter = require('./routes/userRoutes');
const courseRouter = require('./routes/courseRoutes');
const loanRouter = require('./routes/loanRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// use sessions for tracking logins
app.use(session({
  secret: 'treehouse loves you',
  resave: true,
  saveUninitialized: false
}));

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/loans', loanRouter);
app.use('/api/v1/courses', courseRouter);

module.exports = app;
