const {v4: uuidv4} = require('uuid')
const path = require("path")
const fs = require('fs')
const { resolve } = require('path')

const subirArchivo = (files  , extencionesValidas=[], carpeta='')=>{
    return new Promise((resolve, reject)=>{
        if(!files || Object.keys(files).length===0 || !files.ipFile){
            return reject({status: 400, msg:"No viene ningun archivo"})
        }
        const {ipFile:archivo}  = files
        const {name}     = archivo
        let extension    = name.split('.')
        extension        = extension[extension.length-1]
        if(!extencionesValidas.includes(extension)){
            return reject({status: 400,msg:`La extencion del archivo no es valida - ${extencionesValidas}`})
        }
        const tempName = uuidv4() + '.' + extension

        const uploadPath = path.join(__dirname  , "../public" , carpeta , tempName)
        try{
            archivo.mv(uploadPath , (err)=>{
                if(err){
                    console.log(err)
                    return reject({status: 500, msg:'Error al subir el archivo'})
                }
                resolve({status:200 , bag:tempName , msg:"La subida del archivo se realizó con éxito"})
            })
        }catch(error){
            console.log(error)
            return reject({status: 500, msg:'Error al subir el archivo'})
        }
        
    })
}

const removeFile = (src, file ) => {
     const resource = path.join(__dirname , src , file)
     return new Promise(async (resolve, reject )=>{
        try{
            if(fs.existsSync(resource)){
                fs.unlinkSync(resource)
                return resolve({status:"200" , msg:"Se ha eliminado el archivo correctamente"})
            }else{
                return reject({status:'400' , msg:'No existe el recurso solicitado'})
            }
        }catch(error){
            console.log(error)
            return reject({status:'500', msg:"Error al eliminar el archivo"})
        }
     })
}

module.exports = {
    subirArchivo,
    removeFile
}