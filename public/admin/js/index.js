

const getItems = (prefix = "") => {
    fetch("/getItems")
        .then(res => res.json())
        .then(arg => {
            if (arg.status == "200") {
                const { bag } = arg
                const ctCard = document.getElementById('ctCard')
                const ctMdls = document.getElementById('ctMdls')
                ctCard.innerHTML = ""
                ctMdls.innerHTML = ""

                bag.forEach(element => {
                    const { id, title, picture, description, url } = element
                    const tempItem = `<div class="col-md-6 col-lg-4 mb-5">
                                        <div class="border portfolio-item mx-auto h-100" data-bs-toggle="modal" data-bs-target="#portfolioModal${id}">
                                            <div
                                                class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                                <div class="portfolio-item-caption-content text-center text-white"><i
                                                        class="fas fa-plus fa-3x"></i></div>
                                            </div>
                                            <img class="img-fluid h-100" src="${picture}" alt="..." />
                                        </div>
                                    </div>`

                    const tempModal = `        <div class="portfolio-modal modal fade" id="portfolioModal${id}" tabindex="-1" aria-labelledby="portfolioModal1"
                                                        aria-hidden="true">
                                                        <div class="modal-dialog modal-xl">
                                                            <div class="modal-content">
                                                                <div class="modal-body text-center p-0">
                                                                    <div class="d-flex justify-content-between">
                                                                        <div></div>
                                                                        <div class="modal-header border-0">
                                                                            <h2 class="portfolio-modal-title text-secondary text-uppercase">
                                                                                ${title}
                                                                            </h2>
                                                                        </div>
                                                                        <div class="modal-header border-0">
                                                                            <button class="btn-close" type="button" data-bs-dismiss="modal"
                                                                                aria-label="Close"></button>
                                                                        </div>
                                                                    </div>
                                                                    <div class="container">
                                                                        <div class="row justify-content-center">
                                                                            <div class="col-lg-8">
                                                                                <img class=" border  img-fluid rounded mb-3" src="${picture}"
                                                                                    alt="..." />
                                                                                <!-- Portfolio Modal - Text-->
                                                                                <p class="mb-2">${description}
                                                                                </p>
                                                                                <div class="d-flex justify-content-between w-100 mb-3">
                                                                                    <a href = "${url}" class="btn btn-info" >
                                                                                        <i class="fas fa-share-square"></i>
                                                                                        <span class="d-none-397" >Ver Online</span> 
                                                                                    </a>
                                                                                    <button class="btn btn-danger" onclick=deleteItem(${id}) data-bs-dismiss="modal">
                                                                                        <i class="fas fa-xmark fa-fw"></i>
                                                                                        <span class="d-none-397">Eliminar</span>
                                                                                    </button>
                                                                                </div>
                                            
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>`
                    ctCard.innerHTML += tempItem
                    ctMdls.innerHTML += tempModal

                });
            } else {
                console.log("Error General")
            }
        })
        .catch(err => {
            console.log(err)
        })
}

const getMsg = () => {
    const bag = new FormData()
    bag.set('cookie', document.cookie)
    dtm_fetch_default_post('/getMsg', bag, craftMsg)
}


const craftMsg = (arg) => {
    const { status } = arg
    if (status == 200) {
        const { bag } = arg
        const bagSize = bag.length
        const tbodyMsg = document.getElementById('tbodyMsg')
        tbodyMsg.innerHTML = ''
        for (let i = 0; i < bagSize; i++) {
            const { id , name, contact , msg } = bag[i]
            const tempRow = document.createElement('tr')
            tempRow.classList.add('table-primary')
            tempRow.innerHTML = `<td scope="row">${name}</td>
                                    <td>${contact}</td>
                                    <td class="p-0">
                                        <div class="row-only p-0 m-0">
                                            ${msg}
                                        </div>
                                    </td>
                                    <td class="d-flex justify-content-between">
                                        <a tabindex="0" class="btn btn-info col-5" role="button" data-bs-toggle="popover"
                                            data-bs-trigger="focus " title="${name}: ${contact}"
                                            data-bs-content="${msg}">
                                            Ver
                                        </a>
                                        <div class="btn btn-danger col-5 " onclick="deleteMsg(${id})"> Eliminar</div>
                                    </td>`
            tbodyMsg.appendChild(tempRow)
        }
        loadPopOver()
    }

}
const tempObject = ''

const deleteItem = (arg) => {
    const bag = new FormData()
    bag.set('cookie', document.cookie)
    bag.set("id", arg)
    fetch('/deleteItem', {
        method: 'POST',
        body: bag,
    })
        .then(res => res.json())
        .then(arg => {
            if (arg.status == '200') {
                getItems("../")
            }
        })
        .catch(err => console.log(err))

}


const addItem = (arg) => {
    arg.preventDefault()
    arg.stopPropagation()
    const item = arg.target
    const bag = new FormData(item)
    bag.set('cookie', document.cookie)
    dtm_fetch_default_post(item.action, bag, item_then, item_cath)
}

const item_then = (arg) => {
    document.getElementById('formItem').reset()
    getItems('../')
    try {
        const { status, msg } = arg
        switch (status) {
            case "200":
                change_temporally_label(document.getElementById('screenItem'), msg, 'text-success')
                break;
            case "400":
                change_temporally_label(document.getElementById('screenItem'), msg, 'text-warning')
                break;
            case "401":
                change_temporally_label(document.getElementById('screenItem'), msg, 'text-warning')
                break
            case "500":
                change_temporally_label(document.getElementById('screenItem'), msg, 'text-danger')
                break
        }


    } catch {
        change_temporally_label(document.getElementById('screenItem'), 'Algo salió Mal', 'text-danger')
    }


}

const item_cath = (arg) => {
    getItems('../')
    console.log(arg)
    change_temporally_label(document.getElementById('screenItem'), 'Algo salió Mal', 'text-danger')
}


const deleteMsg = (arg) => {
    const bag  = new FormData()
    bag.set('cookie', document.cookie)
    bag.set('id' , arg)
    dtm_fetch_default_post('/deleteMsg',bag , getMsg )
}