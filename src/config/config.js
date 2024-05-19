const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.MONGO_DB_URL);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Connect to MongoDB successfully")
    } catch (error) {
        console.log("Connect failed " + error.message )
    }
}

module.exports = connectDB