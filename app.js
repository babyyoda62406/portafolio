require('dotenv').config()
console.clear()
const Server = require("./models/server")
const app = new Server(process.env.PORT)

