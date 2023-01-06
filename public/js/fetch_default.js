const dtm_fetch_default_post = (url , bag = new FormData() , resolve = handler_default  ,reject = handler_default) => {
    fetch(url , {
        method:'POST',
        body: bag 
    })
    .then(res => res.json())
    .then(arg=> { 
        resolve(arg)
    })
    .catch(err => {
        reject(err)
        //Manejo del error aqui
    })
}

const dtm_fetch_default_get = (url , resolve = handler_default , reject = handler_default) => {
     fetch(url)
     .then(res => res.json())
     .then(arg=> { 
        resolve(arg)
     })
     .catch(err => {
         reject(err)
     })
}

const handler_default = (arg) => {
     console.log(arg)
}

const change_temporally_label = ( target , label = "" , att="") => {
    const before = target.innerHTML
    target.innerHTML  = label 
    target.classList.add(att) 

    setTimeout( ()=>{
        target.innerHTML = before
        target.classList.remove(att)
    } , 3000)

}