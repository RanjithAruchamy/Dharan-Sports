const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rtsIndex = require('./routes/index.routes');
const passport = require('passport');
require('./Config/config');
require('./models/db');
require('./Config/passport');
const app = express();

//middleware 
app.use(bodyParser.json());
//app.use(cors);
app.use(passport.initialize())
app.use('/api', rtsIndex);

//start server
app.listen(process.env.PORT, () => console.log(`Server started at : ${process.env.PORT}`));
