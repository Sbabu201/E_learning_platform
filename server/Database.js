const mongoose = require("mongoose")
const MongoDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://e-learning:e-learning@cluster0.mwwvbid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("connected to the database")
    } catch (error) {
        console.log('error', error)
    }
}

module.exports = MongoDb;