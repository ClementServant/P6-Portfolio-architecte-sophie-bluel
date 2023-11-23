async function divFiltre() {

    // ! Récupération des Projets depuis l'API
    const responseProjet = await fetch("http://localhost:5678/api/works")
    const projet = await responseProjet.json()
    console.log(projet)
     
    // ! Récupération des Catégories depuis l'API
    const responseCategories = await fetch("http://localhost:5678/api/categories")
    const categories = await responseCategories.json()
    console.log(categories)

    function afficherLesProjetsParFiltre(filtresDesProjets) {
        const gallery = document.querySelector(".gallery")
        gallery.innerHTML = ""

        filtresDesProjets.forEach(projet => {
            const figureElement = document.createElement("figure")
            gallery.appendChild(figureElement)
            const imageElement = document.createElement("img")
            imageElement.src = projet.imageUrl
            imageElement.alt = projet.title
            figureElement.appendChild(imageElement)
            const figcaptionElement = document.createElement("figcaption")
            figcaptionElement.innerText = projet.title
            figureElement.appendChild(figcaptionElement)
        });
    }

    // ! Récupération de l’élément <div class:"filtre"> depuis le DOM
    const filtreDiv = document.querySelector(".filter")
    // + Ajout du bouton Tous pour tous les projets
    const tous = document.createElement("button")
    tous.innerText = "Tous"
    // ! Filtre Tous
    tous.addEventListener("click", () => {
        const tousFiltres = projet;
        afficherLesProjetsParFiltre(tousFiltres);
    })
    filtreDiv.appendChild(tous)

    // + Ajout des boutons par catégorie
    categories.forEach(category => {
        const button = document.createElement("button");
        button.innerText = category.name;
        // + filtre par catégories Id
        button.addEventListener("click", () => {
            const filtreCategories = projet.filter(projet => {
                return projet.category.id === category.id;
            });
            afficherLesProjetsParFiltre(filtreCategories);
        });
        filtreDiv.appendChild(button);
    });
}

await divFiltre();