//Verification du localStorage
const localStorageContent = localStorage.getItem('products')
const localStoragePrice = localStorage.getItem('totalPrice')
let products = JSON.parse(localStorageContent) || []
let prixTotal = JSON.parse(localStoragePrice) || 0


//On vide le panier avec un bouton
const videPanier = document.getElementById('clearStorage')
videPanier.addEventListener('click', () => {
        ClearAll()
    })
    //Fonction pour vider le panier
function ClearAll() {
    localStorage.clear();
    location.reload()
}

//URL de l'API
const url = "http://localhost:3000/api/cameras"
let responseAPI

//Affichage Panier 
const affichagePanier = () => {
    products.forEach(produit => {
        fetch(url + '/' + produit).then(response => {
            response.json().then(data => {
                responseAPI = data
                const container = document.getElementById('panierProduitCont'),
                    panierCard = document.createElement('div'),
                    img = document.createElement('img'),
                    titre = document.createElement('h3'),
                    price = document.createElement('p')

                //Ajout des classes
                panierCard.setAttribute('class', 'panierCard')
                img.setAttribute('class', 'panierCard-img')
                titre.setAttribute('class', 'panierCard-titre')
                price.setAttribute('class', 'panierCard-price')

                //Remplissage des cartes
                img.setAttribute('src', responseAPI.imageUrl)
                titre.textContent = responseAPI.name
                responseAPI.price = responseAPI.price / 100
                price.textContent = responseAPI.price.toLocaleString("fr", { style: "currency", currency: "EUR" })

                //Append childs
                panierCard.appendChild(img)
                panierCard.appendChild(titre)
                panierCard.appendChild(price)

                container.appendChild(panierCard)
            })
        })
    })
}

affichagePanier()
    //Bouton pour la requête ORDER (POST)
const boutonCommander = document.getElementById('commander')
boutonCommander.addEventListener('click', () => {

    let lastName = document.getElementById("lastName").value
    alert(lastName)

})