const container = document.getElementById('container_principal'); //Container principal vide dans le index HTML
const xhr = new XMLHttpRequest(); //Variable avec la requête vers l'API


//Page d'accueil
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Quoi faire avec la data
        xhr.addEventListener('load', e => {
            const data = JSON.parse(e.target.responseText)
            console.log(data)
            draw(data)
        })
    }
}

xhr.open('GET', 'http://localhost:3000/api/furniture', true);
//Appel de la requête
xhr.send();

const draw = data => {
    data.forEach(product => {
        //Création des cartes produits page d'accueil
        const pCardContainer = document.createElement('div'),
            pCardImage = document.createElement('img'),
            pCardTitle = document.createElement('h2'),
            pCardPrice = document.createElement('p'),
            pCardDescription = document.createElement('p'),
            pCardButton = document.createElement('a')

        //Appel des produits de l'API
        pCardImage.setAttribute('src', product.imageUrl)
        pCardTitle.textContent = product.name
        product.price = product.price / 1000
        pCardPrice.textContent = product.price.toLocaleString("fr", { style: "currency", currency: "EUR" })
        pCardDescription.textContent = product.description
        pCardButton.textContent = 'Voir le produit'


        //Ajout des classes Bootstrap aux éléments 
        pCardContainer.setAttribute('class', 'card')
        pCardImage.setAttribute('class', 'card__img')
        pCardTitle.setAttribute('class', 'card__titre')
        pCardPrice.setAttribute('class', 'card__price')
        pCardDescription.setAttribute('class', 'card__desc')
        pCardButton.setAttribute('class', 'card__button')


        //Met les éléments de la carte dans le body
        //pCardBody.appendChild(pCardImage)
        pCardContainer.appendChild(pCardImage)
        pCardContainer.appendChild(pCardTitle)
        pCardContainer.appendChild(pCardPrice)
        pCardContainer.appendChild(pCardDescription)
        pCardContainer.appendChild(pCardButton)

        //Montrer tous les produits à l'écran
        container.appendChild(pCardContainer)
    });
}