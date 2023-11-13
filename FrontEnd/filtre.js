async function divFiltre() {

    // ! Récupération des Projet depuis l'API
    const responseProject = await fetch("http://localhost:5678/api/works")
    const Project = await responseProject.json()
    console.log(Project)

    // ! Function Ajout styles éléments <button> 
    function styleButton(buttonElement) {
        buttonElement.style.width = "auto";
        buttonElement.style.height = "37px";
        buttonElement.style.borderRadius = "60px";
        buttonElement.style.border = "1px solid #1D6154";
        buttonElement.style.color = "#1D6154";
        buttonElement.style.background = "#FFFFFF";
        buttonElement.style.textAlign = "center";
        buttonElement.style.fontFamily = "Syne";
        buttonElement.style.fontSize = "16px";
        buttonElement.style.fontStyle = "normal";
        buttonElement.style.fontWeight = "700";
        buttonElement.style.lineHeight = "normal";
        buttonElement.style.padding = "9px 11px 9px 9px";
        buttonElement.style.cursor = "pointer";
    }

    function afficherLesProjetParFiltre(Project) {
        const gallery = document.querySelector(".gallery")
        gallery.innerHTML = ""
    }

    // ! Récupération de l’élément <div class:"filtre"> depuis le DOM
    const filtreDiv = document.querySelector(".filtre")

    // + Ajout des styles css a l’élément <div class:"filtre">
    filtreDiv.style.display = "flex";
    filtreDiv.style.flexDirection = "row";
    filtreDiv.style.alignItems = "center";
    filtreDiv.style.justifyContent = "center";
    filtreDiv.style.gap = "10px";
    filtreDiv.style.margin = "51px 0";

    const tous = document.createElement("button")
    tous.innerText = "Tous"
    styleButton(tous)

    const objets = document.createElement("button")
    objets.innerText = "Objets"
    styleButton(objets)

    const appartements = document.createElement("button")
    appartements.innerText = "Appartements"
    styleButton(appartements)

    const hotelsRestaurants = document.createElement("button")
    hotelsRestaurants.innerText = "Hôtels & restaurants"
    styleButton(hotelsRestaurants)

    filtreDiv.appendChild(tous)
    filtreDiv.appendChild(objets)
    filtreDiv.appendChild(appartements)
    filtreDiv.appendChild(hotelsRestaurants)

    // + Ajout des eventListener aux boutons filtre

    // ! Filtre Tous
    tous.addEventListener("click", () => {
        const tousFiltre = Project.filter(() => {
            return true;
        })
        console.log(tousFiltre)
    })

    // ! Filtre Objets
    objets.addEventListener("click",  function () {
        const objetsFiltre = Project.filter((Project) => {
            return Project.category.name === "Objets";
        })
        console.log(objetsFiltre)
    })

    // ! Filtre Appartements
    appartements.addEventListener("click", () => {
        const appartementsFiltre = Project.filter((Project) => {
            return Project.category.name === "Appartements";
        })
        console.log(appartementsFiltre)
    })

    // ! Filtre Hôtels & restaurants
    hotelsRestaurants.addEventListener("click", () => {
        const hotelsRestaurantsFiltre = Project.filter((Project) => {
            return Project.category.name === "Hotels & restaurants";
        })
        console.log(hotelsRestaurantsFiltre)
    })
}

divFiltre()