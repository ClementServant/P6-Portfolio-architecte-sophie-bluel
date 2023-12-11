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
        console.log(response)
        try {
          const responseData = await response.json()
          if (response.status === 200 && responseData.message === 'Item Deleted') {
            console.log(responseData)
            imageContainer.remove()
            location.reload()
          } else {
            alert('Erreur lors de la suppression de l\'image')
          }
        } catch (error) {
          alert("Erreur lors de la suppression de l'image : la réponse du serveur n'est pas du JSON valide")
        }
      })
    }
  })

  closeModal.addEventListener('click', () => {
    modal.close()
  })
})
