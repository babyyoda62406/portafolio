const { request, response } = require("express");
const { Msg, User, Item } = require("../db/models");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");
const { removeFile  , subirArchivo} = require("../helpers/file_handler");
const { enviarGmail, uploadImagen } = require("../helpers/dtmcloud");

const add_msg = async (req = request , res = response)=>{
    const {body} = req
    const {ipName:name , ipContact:contact , ipMsg:msg } = body 
    const tempMsg = new Msg({name , contact , msg})
    try{
        await tempMsg.save()
        enviarGmail( contact , msg)
        return res.status(200).json({ status:"200", msg:"Mensaje enviado con Éxito" })
    }catch(err){
        console.log(err)
        return res.status(500).json({ status:"500", msg:"No podemos enviar mensajes en este momento" })
    }
    
}

const login = async (req = request , res = response)=>{
    const  {body} = req
    const  {ipName , ipPass} = body
    try{
        const tempUser = await User.findOne({where:{ name:ipName}})
        if(!tempUser){
            return res.status(200).json({status:401})
        }else{
            const { id , password} =tempUser
            const validate  =  bcryptjs.compareSync(ipPass , password)
            if(validate){
                const token = await  generarJWT({id})
                return res.status(200).json({status:200 , token})
            }else{
                return res.status(200).json({status:401})
            }
        }
    }
    catch(err){
        return res.status(500).json({status:"500" , msg: "No puede registrarse en este momento"})
    }
    
    
}

const addUser = async (req = request , res = response)=>{
    const {body} = req
    const { ipName:name  , ipPassword} = body
    const salt = bcryptjs.genSaltSync(10)
    const password = bcryptjs.hashSync(ipPassword, salt)
 
    const tempUser = new User({name , password})

    try{
        await tempUser.save()
        return res.status(200).json({status:200 , msg: "Usuario Creado con éxito"})
    }
    catch(err){
        console.log(err)
        return  res.status(500).json({status:"500" ,msg: "No podemos crear usuarios en este momento"})
    }
    
}

const deleteItem  = async  (req = request , res = response)=>{
    // Eliminar Item de la base de datos
    const  {body} = req
    const { id } = body 
    try{
        const tempItem = await Item.findByPk(id)
        if(tempItem){
            const { picture } = tempItem
            await  tempItem.destroy()
            const deleteStatus  = await  removeFile(`../public/uploads/img/` , picture )
            return res.status(200).json({status:"200" , msg : 'Item Eliminado correctmente'})
        }else{
            return res.status(200).json({status:"400" , msg : 'No existe item con el ID proporcionado'})
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({status:"500", msg: 'No podemos eliminar Items en este momento'})
    }
}

const addItem = async (req= request , res = response )=>{
    const {body , files} = req
    const { ipTitle: title , ipDescription:description , ipUrl:url ,  ipFile } = body
    try{
        const tempPicture = await uploadImagen(files)
        if(tempPicture.status=='200'){
            const { bag:picture} = tempPicture
            const tempItem  = new Item({ title,url ,description , picture })
            await  tempItem.save()
            return res.status(200).json({status:"200" , msg:'Item Creado con éxito' })
        }else{
            return res.status(200).json({status:"500" , msg:'No Podemos Crear Items en este momento'})
        }

    }catch( err){
        console.log(err)
        return res.status(200).json({status:"500" , msg:'No Podemos Crear Items en este momento' ,err})
    }


    // res.status(200).json({status:"200" , msg: "Item Agregado con éxito"})
}

const getMsg = async (req = request , res = response)=>{
    try{
        const bagMsg = await Msg.findAll()
        const bag  = await bagMsg.map(arg =>{
            const {id , name , contact , msg} = arg 
            return { id , name , contact , msg }
        })
        return res.status(200).json({status:200 , msg:"Mensajes resueltos con  éxito", bag})
    }catch(err){
        return res.status(200).json({status:500 , msg:"No Podemos resolver mensajes en este momento"})
    }
    
}

const deleteMsg = async (req = request ,res = response)=>{
    const {id} = req.body
    try{
        const tempMsg = await Msg.findByPk(id)
        if(tempMsg){
            await tempMsg.destroy()
            return res.status(200).json({status:200, msg:"Mensaje eliminado"})
        }else{
            return res.status(200).json({status:"400",msg:"No existe el msg con el id proporcionado"})
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({status: '500' ,msg:"No Podemos Eliminar Mensajes en este momento" , err})
    }
}



module.exports = { add_msg,
                   login,
                   addUser,
                   deleteItem,
                   addItem,
                   getMsg,
                   deleteMsg}