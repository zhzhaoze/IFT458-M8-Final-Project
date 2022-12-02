const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();

router
  .route('/')
  .get(courseController.getAllcourses);

router
  .route('/:id')
  .get(courseController.getcourse);

module.exports = router;
