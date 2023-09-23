const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

class Server {
    constructor(arg) {
        this.__port = arg
        this.app = express()
        this.middleares()
        this.upDB()
        this.routes()
        this.run()
    }

    middleares() {
        // Aqui se hacen las cosas necesatias en plan "Primero que todo"

        // cors
        this.app.use(cors())

        // Lectura y parseo del Body
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        // File Upload
        this.app.use(fileUpload({
            useTempFiles: false,
            tempFileDir: '/temp/'
        }))
        
        // Protocolos de seguridad
        /** Endpoints de seguridad, aqui, justo antes de cargar el directorio estático */
        
        // Directorio publico
        this.app.use(express.static('server/public'))

    }

    async upDB() {
        // Aqui se conecta con la base de datos
    }

    routes() {
        // Aqui se conectan los endpoints
        
        // Enrutador get
        this.app.use('' , require('../routes/get'))
        
        // Enrutador post
        this.app.use('' , require('../routes/post'))

        // Enrutador de API.
    }

    run() {
        this.app.listen(this.__port, () => {
            console.log(`Server running on port ${this.__port}`)
        })
    }

}


module.exports = Server 