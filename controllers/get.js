const {request, response} = require('express')
const { Item } = require("../db/models")



const getItems =  async (req = request , res = response)=>{
    try{
        const items = await Item.findAll()
        const bag   = await items.map(arg => {
            const  {id, title, picture, description , url} = arg
            return {id , title, picture, description , url}
        })
        res.status(200).json({ status:"200" , msg:"Items resueltos con exito" , bag })

    }catch(err){
        console.log("Error al resolver los items")
        return res.status(200).json({status:"500",msg: "No podemos resolver items en este momento" , bag:[]})
    }
}   

module.exports = { getItems }   