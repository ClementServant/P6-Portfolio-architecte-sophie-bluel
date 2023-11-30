document.addEventListener("DOMContentLoaded", () => {

    const openModal = function (event) {
        event.preventDefault()
        const target = document.querySelector (event.target.getAttribut("href"))
        target.style.display = null
        target.removeAttribute("aria-hidden")
    }

    document.querySelector(".modal-js").forEach(a => {
        a.addEventListener("click", openModal)
    })
});









