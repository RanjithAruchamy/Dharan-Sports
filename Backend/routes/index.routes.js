const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

router.post('/register', ctrlUser.register);
router.put('/update', ctrlUser.updateUser);

module.exports = router;