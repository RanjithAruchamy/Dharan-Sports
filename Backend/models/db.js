const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (!err){console.log("Database is connected..!");}
    else {console.log("Error in MongoDB connestion is: "+ JSON.stringify(err, undefined, 2));}
});
