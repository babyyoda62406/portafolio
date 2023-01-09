const fileUpload = require("express-fileupload")
const express = require("express")
const cors = require("cors")
const { db } = require('../db/conexion')
const { security, security_get } = require("../middlewares/security")
const { response } = require("express")

class Server {
    constructor(arg) {
        this.__port = arg
        this.app = express()
        this.middlewares()
        this.upDB()
        this.routes()
        this.run()
    }
    middlewares() {
        // cors
        this.app.use(cors())

        // Lectura y parseo del Body
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        // File Upload
        this.app.use(fileUpload({
            useTempFiles: false,
            tempFileDir: "/temp/"
        }))

        // Protocolos de seguridad 
        this.app.get("/admin/admin.html", [ security_get ]  , (req, res, next) => next())
        
        // Directorio publico
        this.app.use(express.static('public'))
    }

    async upDB() {
        try {
            await db.authenticate()
            console.log("DB Online")
        } catch (err) {
            console.log("Error al conectar con la BD")
            throw new Error("No se ha podido conectar con la base de datos")
        }
    }

    routes() {
        // Rutas Post
        this.app.use("/", require("../routes/get"))
        this.app.use("/", require("../routes/post"))
    }

    run() {
        this.app.listen(this.__port, (arg) => {
            console.log(`Server run in port ${this.__port}`)
        })
    }

}

module.exports = Server 