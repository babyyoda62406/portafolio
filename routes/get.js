const {Router} = require('express')
const { getItems } = require('../controllers/get')

const app = Router()


app.get("/getItems" , getItems)

module.exports = app 