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