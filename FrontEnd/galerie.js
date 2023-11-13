// + Recuperation de la galerie depuis Le DOM
const gallery = document.querySelector(".gallery")

// + Creation function mode asynchrone
async function galerieProjects() {

    const response = await fetch("http://localhost:5678/api/works")
    const data = await response.json()
    console.log(data);

    // + Création boucle for pour Parcourir les données récupérer par l'API
    for (let i = 0; i < data.length; i++) {
            
        // + Création de l'element <figure> pour chaque élément du data
        const figureElement = document.createElement("figure")

        // + Création de l'element <img> (src = "imgUrl" du tableau)
        const imageElement = document.createElement("img")
        imageElement.src = data[i].imageUrl

        // + Ajout du texte ALT pour chaque élément <img>
        imageElement.alt = data[i].title

        // + Création de l’élément <figcaption> (src ="title" du tableau)
        const figcaptionElement = document.createElement("figcaption")
        figcaptionElement.innerText = data[i].title

        // + Ajout des éléments créer à la classe "gallery"
        gallery.appendChild(figureElement)

        // + Ajout des <img> et <figcaption> a l’élément <figure>
        figureElement.appendChild(imageElement)
        figureElement.appendChild(figcaptionElement)
    }
}

// ! Appel de ma function
galerieProjects()

