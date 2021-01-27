//Verification du localStorage
const localStorageContent = localStorage.getItem('products')
const localStoragePrice = localStorage.getItem('totalPrice')
let products = JSON.parse(localStorageContent) || []
let prixTotal = JSON.parse(localStoragePrice) || 0
let bodyPage = document.getElementsByTagName('p')

let paramsConfirmation = new URLSearchParams(window.location.search);

if (paramsConfirmation.has('id') == false) {
    document.getElementById('sectionConfirmation').innerHTML = "<p class='text-1error'> Votre commande n'est pas validée </p> <p class='text-2error'>Vous allez être redigé vers votre panier </p>"
    setTimeout(() => {
        window.location.href = "panier.html"
    }, 2500)


} else if (paramsConfirmation.has('id') == true && !localStorage.commande) {
    document.getElementById('sectionConfirmation').innerHTML = "<p class='text-1error'> Votre commande n'est pas validée </p> <p class='text-2error'>Vous allez être redigé vers votre panier </p>"
    setTimeout(() => {
        window.location.href = "panier.html"
    }, 2500)
} else {
    let nameConfirmation = document.getElementById("nameCommande")
    let prixConfirmation = document.getElementById("prixCommande")
    let idConfirmation = document.getElementById("idCommande")

    nameConfirmation.textContent = paramsConfirmation.get('name')
    prixConfirmation.textContent = paramsConfirmation.get('prix')
    idConfirmation.textContent = paramsConfirmation.get('id')
    localStorage.clear()
}