require('dotenv').config()
const FormData = require('form-data')
const fetch = require('node-fetch')


const enviarGmail = (contact, msg) => {
    const bag = new FormData()
    body = `<strong>Mensaje:</strong>${msg} <br> <strong>Contacto:</strong>${contact} `
    bag.append('req', 'gmail_send')
    bag.append('topic', 'Te han contactado!!')
    bag.append('body', body)
    bag.append('reciver', 'babyyoda62406@gmail.com')

    fetch(`${process.env.DTMCLOUDURL}/${process.env.DTMCLOUDENDPOINT}`, {
        method: "POST",
        body: bag
    })
        .then(res => res.json())
        .then(arg => {
            console.log(arg)
        })
        .catch(err => {
            console.log("Gmail Send", err)
        })

}


const uploadImagen = (files) => {
    return new Promise((resolve, reject) => {
        const bag = new FormData()
        const { ipFile } = files

        bag.append('ipFile', ipFile.data, 'dave.jpg')
        bag.append('req', 'uploadImage')
        bag.append('route', 'portafolio/img')

        fetch(`${process.env.DTMCLOUDURL}/${process.env.DTMCLOUDENDPOINT}`, {
            method: "POST",
            body: bag
        })

            .then(res => res.json())
            .then(arg => {
                const { filename } = arg
                resolve({ status: '200', bag: filename })
            })

            .catch(err => {
                console.log(err)
                reject({ status: '501' })
            })

    })
}


const eliminarImagen = (route, ipName) => {
    return new Promise((resolve, reject) => {
        const bag = new FormData()
        bag.append('req', 'deleteImage')
        bag.append('route', route)
        bag.append('ipName', ipName)

        fetch(`${process.env.DTMCLOUDURL}/${process.env.DTMCLOUDENDPOINT}`, {
            method: 'POST',
            body: bag
        })
            .then(res => res.json())
            .then(arg => {
                console.log(arg)
                resolve(arg)
            })
            .catch(err => {
                console.log("Error al manejar la nuve")
                reject(err)
            })

    })
}


module.exports = {
    enviarGmail,
    uploadImagen,
    eliminarImagen
}