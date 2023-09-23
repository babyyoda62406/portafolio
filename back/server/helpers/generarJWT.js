require("dotenv").config()
const jwt = require("jsonwebtoken")
const generarJWT = (arg) => {
    return new Promise((resolve, reject) => {
        const payload = arg 
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "365d"
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject("No se pudo generar el JWT")
            } else {
                resolve(token)
            }
        })
    })
}
 



module.exports = {
    generarJWT
}