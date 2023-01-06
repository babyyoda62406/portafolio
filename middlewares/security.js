const { request, response } = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const security_get = async (req = request, res = response, next) => {
    const cookie = req.header('cookie')
    if (cookie.indexOf('token') > -1) {
        try {
            const token = cookie.split(";")[0].split('=')[1]
            // console.log(token)
            const payload = await jwt.verify(token, process.env.SECRETORPRIVATEKEY)
            // console.log(payload)

            next()

        } catch (err) {
            console.log(err)
            console.log("token invalido")
            res.status(401).redirect("/admin")
        }

    } else {
        console.log("Token No Proporcionado")
        return res.redirect("/admin/")
    }
}

const security_post = async (req = request, res = response, next) => {
    // console.log(req.body)
    try {
        const { cookie } = req.body
        if (cookie.indexOf('token') > -1) {
            const token = cookie.split(";")[0].split('=')[1]
            // console.log(token)
            const payload = await jwt.verify(token, process.env.SECRETORPRIVATEKEY)
            // console.log(payload)

            next()

        } else {
            console.log("Token No Proporcionado")
            return res.status(401).json({ status: 401, msg: "No dispone de un privilegio requerido" })
        }

    } catch (err) {
        console.log(err)
        console.log("token invalido")
        return res.status(401).json({ status: 401, msg: "No dispone de un privilegio requerido" })
    }


}

module.exports = {
    security_get, security_post
}