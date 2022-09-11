const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetowrkDB',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    // UseCreateIndex:true
});

module.exports = mongoose.connection;