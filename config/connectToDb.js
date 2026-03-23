// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/reporting_system');
//         console.log('MongoDB Connected...');
//     } catch (err) {
//         console.error('Connection failed:', err.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;


const mongoose = require("mongoose")
const dotEnv = require("dotenv")
dotEnv.config()
const mongoUrl = process.env.MONGO_URL

const connectToMongoDb = async ()=>{
    try {
        const connected = await mongoose.connect(mongoUrl)
        if(connected){
            console.log('MongoDB Connected')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToMongoDb