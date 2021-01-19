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
const urlOrder = "http://localhost:3000/api/cameras/order"
let responseAPI

//Affichage dinamyque du prix total de la commande
const prixTotalPanier = document.getElementById('prixTotalPanier')
prixTotalPanier.textContent = "Le montant total s'élève à " + prixTotal + '€'
console.log(prixTotalPanier)

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

//Alerte si le panier est vide 
const formulairePanier = document.getElementById('formulaire')
formulairePanier.addEventListener('submit', e => {
    e.preventDefault()
        //Avant d'envoyer un formulaire, vérification que le panier n'est pas vide.
    if (products == []) {
        alert("Attention, votre panier est vide.");
    } else {
        //Recuperer toutes les données saisies par le client
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let email = document.getElementById('email').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;

        //Vérification du formulaire

        // on met les variables dans un objet pour la requete POST
        let contact = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "address": address,
            "city": city,
        };

        // création de l'objet obligatoire pour la requete à envoyer au serveur
        let objt = {
            contact,
            products
        };

        let achat = JSON.stringify(objt);
        console.log(achat)

        //Envoi des données récupérées
        const optionsFetch = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(objt),
        }

        fetch(urlOrder, optionsFetch).then(response => {
            response.json().then(data => {
                responseAPI = data
                window.location = `./confirmation.html?id=${responseAPI.orderId}&name=${firstName}&prix=${prixTotal}`
            });
        });
        localStorage.clear()
    }
})