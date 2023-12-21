import { galerieProjects } from './works.js'

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.querySelector('#modal')
  const openModal = document.querySelector('#open-modal')
  const closeModal = document.querySelector('#close-modal')

  openModal.addEventListener('click', async () => {
    const token = localStorage.getItem('token')
    modal.showModal()

    const response = await fetch('http://localhost:5678/api/works', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    const apiContainer = document.querySelector('#api-container')
    apiContainer.innerHTML = ''

    for (let i = 0; i < data.length; i++) {
      const imageContainer = document.createElement('div')
      imageContainer.classList.add('image-container')

      const imageElement = document.createElement('img')
      imageElement.src = data[i].imageUrl
      imageElement.classList.add('api-container-image')

      const btnSupprimer = document.createElement('button')
      btnSupprimer.classList.add('btn-image-sup')
      btnSupprimer.setAttribute('aria-label', 'Supprimer l\'image')

      const iconSupprimer = document.createElement('i')
      iconSupprimer.classList.add('fa-solid', 'fa-trash-can')

      apiContainer.appendChild(imageContainer)

      imageContainer.appendChild(imageElement)
      imageContainer.appendChild(btnSupprimer)

      btnSupprimer.appendChild(iconSupprimer)

      btnSupprimer.addEventListener('click', async (event) => {
        event.preventDefault()
        const id = data[i].id
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const gallery = document.querySelector('.gallery')

        if (response.ok) {
          // ! Actualisation de la boite modal
          imageContainer.remove()
          // ! je vide la galerie et j'appel ma function pour afficher les projets dynamiquement
          gallery.innerHTML = ''
          await galerieProjects()
        } else {
          alert('Erreur lors de la suppression de l\'image')
        }
      })
    }
  })

  closeModal.addEventListener('click', () => {
    modal.close()
  })
})
