require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT

//const storageController = require("./controllers/storage.controller")
// const fs = require("fs")
// const { connect } = require("http")
// const path = require("path")

const emailController = require("./controllers/email.controller")

// const requireValidation = require("./middleware/validate-session")

const cors = require("cors")
app.use(cors())
//const mongoose = require("mongoose")

// const MONGO = process.env.MONGODB;

// console.log(`${MONGO}/`)

//const db = mongoose.connection;

//db.once("open", () => console.log("connected: "))
app.use(express.json())
//app.use("/storage", storageController)
app.use("/email", emailController)

app.listen(port, () => console.log("listening to ", port))
