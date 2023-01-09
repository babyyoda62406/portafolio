const { Router } = require("express");
const { add_msg, login, addUser, deleteItem, addItem, getMsg, deleteMsg } = require("../controllers/post");
const { security_post } = require("../middlewares/security");

const app = Router()
app.post("/user/add_msg" , add_msg)
app.post("/login" , login)
app.post('/addUser', addUser )
app.post('/deleteItem'  ,  [security_post]  , deleteItem )
app.post('/addItem' ,  [security_post ] , addItem )
app.post('/getMsg' , [security_post] , getMsg)
app.post('/deleteMsg' , [ security_post], deleteMsg)

module.exports = app