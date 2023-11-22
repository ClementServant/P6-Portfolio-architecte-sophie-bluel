async function divFiltre() {

    // ! Récupération des Projets depuis l'API
    const responseProject = await fetch("http://localhost:5678/api/works")
    const Project = await responseProject.json()
    console.log(Project)
     
    // ! Récupération des Catégories depuis l'API
    const responseCategories = await fetch("http://localhost:5678/api/categories")
    const categories = await responseCategories.json()
    console.log(categories)

    function afficherLesProjetsParFiltre(filtresDesProjects) {
        const gallery = document.querySelector(".gallery")
        gallery.innerHTML = ""

        filtresDesProjects.forEach(project => {
            const figureElement = document.createElement("figure")
            gallery.appendChild(figureElement)
            const imageElement = document.createElement("img")
            imageElement.src = project.imageUrl
            imageElement.alt = project.title
            figureElement.appendChild(imageElement)
            const figcaptionElement = document.createElement("figcaption")
            figcaptionElement.innerText = project.title
            figureElement.appendChild(figcaptionElement)
        });
    }

    // ! Récupération de l’élément <div class:"filtre"> depuis le DOM
    const filtreDiv = document.querySelector(".filter")

    const tous = document.createElement("button")
    tous.innerText = "Tous"
    // ! Filtre Tous
    tous.addEventListener("click", () => {
        const tousFiltres = Project;
        afficherLesProjetsParFiltre(tousFiltres);
    })
    filtreDiv.appendChild(tous)

    // + Ajout des boutons par catégorie
    categories.forEach(category => {
        const button = document.createElement("button");
        button.innerText = category.name;

        button.addEventListener("click", () => {
            const filtreCategories = Project.filter(project => {
                return project.category.id === category.id;
            });
            afficherLesProjetsParFiltre(filtreCategories);
        });
        filtreDiv.appendChild(button);
    });
}

await divFiltre();