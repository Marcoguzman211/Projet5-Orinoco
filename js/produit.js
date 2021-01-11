//Création librairie AJAX pour la requête du produit dans l'API
const ajax = request => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(request.method, request.url, true)
        xhr.addEventListener('load', e => {
            resolve(e.target)
        })
        xhr.send()
    })
}



const queryString = window.location.search
if (queryString != "") {
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get("id")
    if (id != "") {
        console.log(id)
    } else {
        window.location.href = "index.html"
    }
} else {
    window.location.href = "index.html"
}

/**
 * localStorage.clear()
 * localStorage.panier = "un truc"
 * console.log(localStorage.panier) */