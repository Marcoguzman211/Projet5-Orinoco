/*Création du panier utilisateur s'il est nécessaire
if (localStorage.getItem("monPanier")) {
    console.log("Panier créé");
} else {
    console.log("Création du panier");
    let init = [];
    localStorage.setItem("monPanier", (JSON.stringify(init)));
}*/

//Verification du localStorage
const localStorageContent = localStorage.getItem('names')
const localStoragePrice = localStorage.getItem('totalPrice')
let names
let prixTotal
if (localStorage.length == 0) {
    names = []
    prixTotal = 0
} else {
    names = JSON.parse(localStorageContent)
    prixTotal = JSON.parse(localStoragePrice)
}
const videPanier = document.getElementById('clearStorage')
videPanier.addEventListener('click', () => {
        ClearAll()
        location.reload()
    })
    //Fonction pour vider le panier
function ClearAll() {
    localStorage.clear();
}

//Affichage Panier essai
const affichagePanier = document.getElementById('panier__contenu-affichage'),
    elementsDansLocalS = document.createElement('p')
let textePanier

if (localStorage.length > 0) {
    textePanier = JSON.stringify(localStorage.names)
    elementsDansLocalS.textContent = textePanier
    affichagePanier.appendChild(elementsDansLocalS)
} else {
    elementsDansLocalS.textContent = 'Votre panier est vide.'
}


//Trie des noms dans le local Storage
let nomsLocalS = JSON.parse(localStorageContent)
console.log(nomsLocalS)