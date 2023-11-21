async function divFiltre() {

    // ! Récupération des Projets depuis l'API
    const responseProject = await fetch("http://localhost:5678/api/works")
    const Project = await responseProject.json()
    console.log(Project)

    const responseCategories = await fetch("http://localhost:5678/api/categories")
    const categories = await responseCategories.json()
    console.log(categories)

    function afficherLesProjetParFiltre(filtredesProjects) {
        const gallery = document.querySelector(".gallery")
        gallery.innerHTML = ""

        filtredesProjects.forEach(project => {
            // * Créer et ajouter les éléments d'affichage pour chaque projet
            const image = document.createElement("img");
            image.src = project.imageUrl; 
            gallery.appendChild(image);
        });
    }

    // ! Récupération de l’élément <div class:"filtre"> depuis le DOM
    const filtreDiv = document.querySelector(".filter")

    const tous = document.createElement("button")
    tous.innerText = "Tous"
    // ! Filtre Tous
    tous.addEventListener("click", () => {
        const tousFiltre = Project;
        //console.log(tousFiltre)
        afficherLesProjetParFiltre(tousFiltre);
    })
    filtreDiv.appendChild(tous)

    // + Création et ajout des boutons catégorie dynamiquement
    categories.forEach(category => {
        const button = document.createElement("button");
        button.innerText = category.name;

        button.addEventListener("click", () => {
            const filtreProject = Project.filter(project => {
                return project.category.id === category.id;
            });
            //console.log(filtreProject);
            afficherLesProjetParFiltre(filtreProject);
        });

        filtreDiv.appendChild(button);
    });

}

await divFiltre();