//Création du panier utilisateur s'il est nécessaire
if (localStorage.getItem("monPanier")) {
    console.log("Panier créé");
} else {
    console.log("Création du panier");
    let init = [];
    localStorage.setItem("monPanier", (JSON.stringify(init)));
}