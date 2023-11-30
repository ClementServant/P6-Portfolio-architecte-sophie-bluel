document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token")

    // ! condition si le token a été récupérer et l'utilisateur connecté
    if (token) {
        const overlay = document.querySelector(".overlay")
        const span = document.querySelector(".span")
        
        // ! Affichage des element si utilisateur connecté
        overlay.classList.remove("hidden")
        span.classList.remove("hidden")

        // ! Modification de l'apparence du lien de la navbar
        const login = document.querySelector("nav ul li a")
        login.innerText = "logout"
        
        // ! de l’écouteur d’événement sur l'element logout
        login.addEventListener("click", () => {

            // ! Déconnexion de l'utilisateur
            localStorage.removeItem("token")

            // ! Réinitialisation de l'apparence du lien de la navbar
            login.innerText = "login"
            window.location.href = "index.html"
        })
    }
})