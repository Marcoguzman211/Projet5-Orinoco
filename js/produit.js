//Verification du localStorage
const localStorageContent = localStorage.getItem('names')
const localStoragePrice = localStorage.getItem('totalPrice')
let names
let namesCounted
let prixTotal
if (localStorage.length == 0) {
    names = []
    prixTotal = 0
} else {
    names = JSON.parse(localStorageContent)
    prixTotal = JSON.parse(localStoragePrice)
}

//URL de l'API
const url = "http://localhost:3000/api/cameras"
let responseAPI

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
        fetch(url + '/' + id).then(response => {
            response.json().then(data => {
                responseAPI = data
                    //console.log(responseAPI)

                //On remplit le html avec les réponses de l'API
                const produitImg = document.getElementById("produitImg"),
                    produitName = document.getElementById("produitName"),
                    produitPrice = document.getElementById("produitPrice"),
                    produitDesc = document.getElementById("produitDesc")

                produitImg.setAttribute('src', responseAPI.imageUrl)
                produitImg.setAttribute("alt", "Image de l'appareil photo selectioné")
                produitName.textContent = responseAPI.name
                responseAPI.price = responseAPI.price / 100
                produitPrice.textContent = responseAPI.price.toLocaleString("fr", { style: "currency", currency: "EUR" })
                produitDesc.textContent = responseAPI.description


                //Ajout des options des objectifs
                let lentilles = document.getElementById('lentilles')
                responseAPI.lenses.forEach(lentille => {
                    let option = document.createElement("option")
                    option.textContent = lentille;
                    lentilles.appendChild(option);
                })

                //Test du 15 janvier 2021
                const boutonPanier = document.getElementById('addPanier')
                boutonPanier.addEventListener('click', () => {
                    names.push(produitName.textContent)
                    prixTotal += responseAPI.price

                    //Test du 17 janvier 2021
                    let count = 0;
                    for (var i = 0; i < names.length; i++) {
                        if (names[i] == produitName.textContent) {
                            count++
                        }
                    }
                    console.log(names)
                    console.log(count)

                    //Fin du test du 17 janvier 2021

                    localStorage.setItem('names', JSON.stringify(names))
                    localStorage.setItem('totalPrice', JSON.stringify(prixTotal))
                    alert('Le produit a bien été ajouté!')

                })

                //Fin du test du 15 janvier 2021
            })
        })
    } else {
        window.location.href = "index.html"
    }
} else {
    window.location.href = "index.html"
}




/**
 * localStorage.clear()
 * localStorage.panier = "un truc"
 * console.log(localStorage.panier) 
 * 
 * Ajouter un article au panier
 * function ajouterAuPanier(){
 * const bouton = document.getElementById("Boutonpanier");
    bouton.addEventListener("click", async function(){
        panier.push(mesVariables);
        localStorage.setItem("monPanier", JSON.stringify(panier));
        alert("L'article a bien été ajouté à votre panier.")
        location.reload();
    });
};
ajouterAuPanier();
 */