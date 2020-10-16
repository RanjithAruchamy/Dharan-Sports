const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

router.post('/register/user', ctrlUser.registerUserMaster);
//router.post('/register/user/personal', ctrlUser.registerUserPersonal);
router.put('/updateUser', ctrlUser.updateUserMaster);

module.exports = router;