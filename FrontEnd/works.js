export async function galerieProjects () {
  const response = await fetch('http://localhost:5678/api/works')
  const data = await response.json()

  // + Recuperation de la galerie depuis Le DOM
  const gallery = document.querySelector('.gallery')

  // + Création boucle for pour Parcourir les données récupérer par l'API
  for (let i = 0; i < data.length; i++) {
    // + Création de l'element <figure> pour chaque élément du data
    const figureElement = document.createElement('figure')

    // + Création de l'element <img> (src = "imgUrl" du tableau)
    const imageElement = document.createElement('img')
    imageElement.src = data[i].imageUrl

    // + Ajout du texte ALT pour chaque élément <img>
    imageElement.alt = data[i].title

    // + Création de l’élément <figcaption> (src ="title" du tableau)
    const figcaptionElement = document.createElement('figcaption')
    figcaptionElement.innerText = data[i].title

    // + Ajout des éléments créer à la classe "gallery"
    gallery.appendChild(figureElement)

    // + Ajout des <img> et <figcaption> a l’élément <figure>
    figureElement.appendChild(imageElement)
    figureElement.appendChild(figcaptionElement)
  }
}

export async function actualisationDeLaModalGalerie () {
  const token = localStorage.getItem('token')
  // eslint-disable-next-line no-undef
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
}
