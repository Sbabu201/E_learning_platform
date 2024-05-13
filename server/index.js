const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const MongoDb = require("./Database")
dotenv.config();

const app = express();


MongoDb();

//importing routes 


// middlewares 
app.use(cors());
app.use(express.json());



const userRoute = require("./Routes/userRoute")
const courseRoute = require("./Routes/courseRoute")
const sectionRoute = require("./Routes/sectionRoute")
app.use("/user", userRoute)
app.use("/course", courseRoute)
app.use("/section", sectionRoute)
// app.use(errorMiddleWare);


const PORT = process.env.PORT || 8080






app.listen(PORT, () => {
    console.log(`backend started at ${PORT}`)
})