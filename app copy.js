const path = require('path');
const express = require('express');
const morgan = require('morgan');
const pug = require('pug');
var bodyParser = require('body-parser')
const courses = require('../Module 7- UI IT1-BaseTemplate/dev-data/data/courses.json')


const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public/js')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// 3) ROUTES
// app.use('/courseOverview', (req, res)=>{
//   res.status(200).render('courseOverview',{
//     title: ' Test Overview'
//   });
// })

// // 3) ROUTES
// app.use('/getAllCourses', (req, res)=>{
//   res.status(200).render('allCourses',{
//     courses: courses
//   });
// })
app.use('/', viewRouter);

module.exports = app;
