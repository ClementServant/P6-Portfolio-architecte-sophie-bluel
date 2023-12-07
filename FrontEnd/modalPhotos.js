document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('#modal')
    const closeModal = document.querySelector('#close-modal')
    const titreModal = document.querySelector('.titre-modal')
    const apiContainer = document.querySelector('#api-container')
    const openModalPhotos = document.querySelector('#ajout-photo')

    const contenuInitial = modal.innerHTML

    openModalPhotos.addEventListener('click', () => {

        const token = localStorage.getItem('token')
        console.log(token)
        if (!token) {
            window.location.href = 'login.html'
        }
        console.log('Le token est bien récupérer on passe au reste')

        const apiContainer = document.querySelector('#api-container')
        apiContainer.innerHTML = ''

        const titreModal = document.querySelector('.titre-modal')
        titreModal.textContent = 'Ajout photo'

        const retourElement = document.createElement('button')
        retourElement.classList.add('btn-retour')

        const iconRetour = document.createElement('i')
        iconRetour.classList.add('fa-solid', 'fa-arrow-left')

        const containerPhoto = document.createElement('div')
        containerPhoto.classList.add('container-photo')
        
        const iconContainerPhoto = document.createElement('i')
        iconContainerPhoto.classList.add('fa-regular', 'fa-image')

        modal.appendChild(retourElement)

        retourElement.appendChild(iconRetour)

        apiContainer.appendChild(containerPhoto)

        containerPhoto.appendChild(iconContainerPhoto)
    })

    closeModal.addEventListener('click', () => {
        if (modal.open) {
            modal.innerHTML = contenuInitial

            modal.close()
            console.log("La modal a été fermer")
        }
    })
})