const { DataTypes } = require("sequelize")
const {db} = require("./conexion")

const User = db.define(  "user" ,  {
    name:{
        type: DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }
})

const Item = db.define("item" , {
    title:{
        type:DataTypes.STRING 
    },     
    picture:{
        type:DataTypes.STRING 
    },
    description:{
        type:DataTypes.STRING 
    },
    url:{
        type:DataTypes.STRING 
    }
})

const Msg = db.define('msg' , {
    name:{
        type:DataTypes.STRING
    },
    contact:{
        type:DataTypes.STRING
    },
    msg:{
        type:DataTypes.STRING
    }

})

module.exports = { User , Item    , Msg}