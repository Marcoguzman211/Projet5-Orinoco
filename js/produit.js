//Verification du localStorage
const localStorageContent = localStorage.getItem('products')
const localStoragePrice = localStorage.getItem('totalPrice')
const localStorageQuantity = localStorage.getItem('qte')
let products = JSON.parse(localStorageContent) || []
let prixTotal = JSON.parse(localStoragePrice) || 0
let quantitePanier = JSON.parse(localStorageQuantity) || 0

//Variables pour l'affichage de la quantité dans le panier
let panierQte = document.getElementById('panierQte')
panierQte.textContent = quantitePanier

//URL de l'API
const url = "http://localhost:3000/api/cameras"
let responseAPI

//Paramètres URL

//Récuperer l'id du produit choisi dans la page d'accueil
const queryString = window.location.search
if (queryString != "") {
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get("id") //On récupère l'id pour travailler avec
    if (id != "") {
        console.log(id)
            //On fetch l'API avec l'identifiant
        fetch(url + '/' + id).then(response => {
            response.json().then(data => {
                responseAPI = data
                console.log(responseAPI)

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

                //Bouton ajouter au panier
                const boutonPanier = document.getElementById('addPanier')
                boutonPanier.addEventListener('click', () => {
                    prixTotal += responseAPI.price
                    products.push(id)
                    quantitePanier++

                    localStorage.setItem('products', JSON.stringify(products))
                    localStorage.setItem('totalPrice', JSON.stringify(prixTotal))
                    localStorage.setItem('qte', JSON.stringify(quantitePanier))
                    alert('Le produit a bien été ajouté!')
                    console.log(products)
                    location.reload()
                })
            })
        })
    } else {
        //Sinon, on renvoie vers la page d'accueil
        window.location.href = "index.html"
    }
} else {
    window.location.href = "index.html"
}