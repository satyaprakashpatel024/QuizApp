const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;

const connectDatabase = ()=>{
    mongoose.connect(MONGODB_URL)
    .then((conn)=>{
        console.log("Database connected Successfully ...",conn.connection.host);
    }).catch((err)=>{
        console.log(err.message);
    })
}

module.exports = connectDatabase;