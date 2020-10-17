const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlSport = require('../controllers/sports.controller');
const ctrlForm = require('../controllers/forms.controller');

router.post('/register/user', ctrlUser.registerUserMaster);
router.post('/register/sport', ctrlSport.registerSportsMaster);
router.post('/register/form', ctrlForm.registerForm);
//router.post('/register/user/personal', ctrlUser.registerUserPersonal);
//router.put('/updateUser', ctrlUser.updateUserMaster);

module.exports = router;