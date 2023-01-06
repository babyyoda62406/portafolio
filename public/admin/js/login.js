

const login = (arg) => {
    bootstrap.Modal.getOrCreateInstance(document.getElementById("modalWait")).show()
    arg.preventDefault()
    arg.stopPropagation()
    const item = arg.target
    fetch(item.action, {
        method: "POST",
        body: new FormData(item)
    })
        .then(res => res.json())
        .then(arg => {
            setTimeout(() => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("modalWait")).hide()
            }, 1000)

            const { status } = arg
            if (status == "200") {
                document.getElementById("title").innerHTML = `<span class="text-uppercase mx-auto text-success">Correcto!!</span>`
                redirect(arg.token)
            } else if (status == 401) {
                document.getElementById("title").innerHTML = `<span class="text-uppercase mx-auto text-warning">No Autorizado!!</span>`
            } else if (status == 500) {
                document.getElementById("title").innerHTML = `<span class="text-uppercase mx-auto text-danger">Inténtelo más tarde!!</span>`
            }
            setTimeout(() => {
                document.getElementById("title").innerHTML = `<span class="text-uppercase mx-auto ">Control de Acceso</span>`
            }, 5000)
        })
        .catch(err => {
            bootstrap.Modal.getOrCreateInstance(document.getElementById("modalWait")).hide()
        })
}


const redirect = (token) => {
    const fe = document.createElement('form')
    fe.classList.add('d-none')
    fe.action = "admin.html"
    fe.method = 'GET'
    document.cookie = `token=${token}`
    document.body.appendChild(fe)
    fe.submit()
}