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
                                        <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal${id}">
                                            <div
                                                class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                                <div class="portfolio-item-caption-content text-center text-white"><i
                                                        class="fas fa-plus fa-3x"></i></div>
                                            </div>
                                            <img class="img-fluid" src="${picture}" alt="..." />
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
                                                                            <h2 class="portfolio-modal-title text-secondary text-uppercase mb-3">
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
                                                                                <img class="img-fluid rounded mb-3" src="${picture}"
                                                                                    alt="..." />
                                                                                <!-- Portfolio Modal - Text-->
                                                                                <p class="mb-2">${description}
                                                                                </p>
                                                                                <div class="d-flex justify-content-between w-100 mb-3">
                                                                                    <a href = "${url}" class="btn btn-info" target="_blank" >
                                                                                        <i class="fas fa-share-square"></i>
                                                                                        Ver Online
                                                                                    </a>
                                                                                    <button class="btn btn-primary" data-bs-dismiss="modal">
                                                                                        <i class="fas fa-xmark fa-fw"></i>
                                                                                        Cerrar Ventana
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

