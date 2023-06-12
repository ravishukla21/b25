const mongoose=require("mongoose");
require("dotenv").config()
//mongodb+srv://ravi:shukla@cluster0.swhyrxz.mongodb.net/google_notes?retryWrites=true&w=majority

const connection=mongoose.connect(process.env.mongoURL)

module.exports={
    connection
}