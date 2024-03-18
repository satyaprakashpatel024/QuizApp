const mongoose = require('mongoose');
const MONGODB_URL = "mongodb+srv://QuizAdmin:WynvDusSy2WG6KzX@quizcluster.hhuofk9.mongodb.net/QUIZ_DATABASE";

const connectDatabase = ()=>{
    mongoose.connect(MONGODB_URL)
    .then((conn)=>{
        console.log("Database connected Successfully ...",conn.connection.host);
    }).catch((err)=>{
        console.log(err.message);
    })
}

module.exports = connectDatabase;