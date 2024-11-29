require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect =async () => {
    try{
        console.log("db server is connecting")
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: process.env.MONGODB_DB,
            autoCreate: true, 
            autoIndex: true
        });
        // TODO: Seeder run
        console.log("Db server connected successfully.....")
    } catch(exception) {
        console.log("Error connecting db....")   
        console.log(exception)
        process.exit()
    }
}

dbConnect();