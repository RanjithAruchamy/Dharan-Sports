const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlSport = require('../controllers/sports.controller');
const ctrlForm = require('../controllers/forms.controller');

router.post('/register/user', ctrlUser.registerUserMaster);
router.post('/register/sport', ctrlSport.registerSportsMaster);
router.post('/register/form', ctrlForm.registerForm);
router.get('/users', ctrlUser.getAllUser);
router.get('/users/:userId', ctrlUser.getUser);
router.get('/sports', ctrlSport.getAllSport);
router.get('/sports/:sportId', ctrlSport.getSport);
router.get('/forms', ctrlForm.getAllForm);
router.get('/forms/:formId', ctrlForm.getForm);
router.put('/updateUser/:userId', ctrlUser.updateUserMaster);
router.put('/sports/:sportId', ctrlSport.updateSport);
router.put('/forms/:formId', ctrlForm.updateForm);
router.delete('/deleteUser/:userId', ctrlUser.deleteUserMaster);
router.delete('/sports/:sportId', ctrlSport.deleteSport);
router.delete('/forms/:formId', ctrlForm.deleteForm);

module.exports = router;