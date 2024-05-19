const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_DB_URL , {
    useNewUrlParser:true
});

const db = mongoose.connection;
module.exports = db;