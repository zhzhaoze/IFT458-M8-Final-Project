const express = require('express');
const loanController = require('../controllers/loanController');
const router = express.Router();

router
  .route('/')
  .get(loanController.getAllLoans)
  .post(loanController.createLoan, function(req, res){
    res.redirect('/');
});

router
  .route('/My')
  .get(loanController.getMyLoans)
  // .post(loanController.createLoan);

router
  .route('/:id')
  .get(loanController.getloan)

module.exports = router;
