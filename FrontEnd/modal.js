// ! variable pour savoir quel boite modale est ouvert
let modal = null


document.addEventListener("DOMContentLoaded", () => {

    // + Function d'ouverture de la boite modal
    const openModal = function (event) {
        event.preventDefault()
        const target = document.querySelector(event.target.getAttribute("href"))
        target.style.display = null
        target.removeAttribute("aria-hidden")
        target.setAttribute("aria-modal", "true")
        modal = target
        // - Fermer la boite modale
        modal.addEventListener("click", closeModal)
        document.querySelector(".js-modal-close").addEventListener("click", closeModal)
        document.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)

    }
    // ! Creation de la function pour fermer la boite modale
    const closeModal = function (event) {
        if (modal === null) return
        event.preventDefault()
        modal.style.display = "none"
        modal.setAttribute("aria-hidden", "true")
        modal.removeAttribute("aria-modal")
        modal.removeEventListener("click", closeModal)
        document.querySelector(".js-modal-close").removeEventListener("click", closeModal)
        document.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)

        modal = null
    }
    // ! Éviter de fermer la boite modal en cliquant a l’intérieure
    const stopPropagation = function (event) {
        event.stopPropagation()
    }

    document.querySelectorAll(".modal-js").forEach(a => {
        a.addEventListener("click", openModal)
    })

    // ! Fermer la boite modal avec le bouton Echap
    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal(event)
        }
    })
});









