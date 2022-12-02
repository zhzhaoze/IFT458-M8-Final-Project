const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.home);
router.get('/course', viewsController.getCourse);
router.get('/loanlists', viewsController.getMyLoan);
router.get('/allloanlists', viewsController.getAllLoan);
router.get('/newLoan', viewsController.CreateNewLoan);
router.get('/alluserlists', viewsController.getAllUser);
router.get('/myloanlists', viewsController.getMyLoan);
router.get('/logout', viewsController.logout);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignInForm);
//router.get('/loginUser', viewsController.getLoginUser);

module.exports = router;
