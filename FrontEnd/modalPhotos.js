import { galerieProjects, actualisationDeLaModalGalerie } from './works.js'

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.querySelector('#modal')
  const modalPhotos = document.querySelector('#modal2')
  const openModal2 = document.querySelector('#ajout-photo')
  const retourModal1 = document.querySelector('#retour-Modal1')
  const closeModal2 = document.querySelector('#close-modal2')

  openModal2.addEventListener('click', async () => {
    modal.close()
    modalPhotos.showModal()

    // ! Réinitialiser l'input title
    const titleInput = document.getElementById('title')
    titleInput.value = ''

    //  ! Vérifier si image présente et la supprimer
    const imageDejaPresent = containerAjout.querySelector('.image')
    if (imageDejaPresent) {
      containerAjout.removeChild(imageDejaPresent)
      containerAjout.classList.remove('image-visible')
    }

    // + Ajout écouteur d'événement pour revenir a la première modal
    retourModal1.addEventListener('click', () => {
      modalPhotos.close()
      modal.showModal()
    })

    await optionFormCategories()
  })

  // + Function pour afficher les categories
  async function optionFormCategories () {
    const responseCategories = await fetch('http://localhost:5678/api/categories')
    const categories = await responseCategories.json()
    const categoriesForm = document.getElementById('category')
    categoriesForm.innerHTML = ''

    categories.forEach(category => {
      const optionElement = document.createElement('option')
      optionElement.innerText = category.name
      optionElement.value = category.id
      categoriesForm.appendChild(optionElement)
    })
  }

  // + Ajouter des photos
  const ajoutPhotos = document.getElementById('image')
  const containerAjout = document.querySelector('.container-ajout')

  ajoutPhotos.addEventListener('change', ajouterUnePhotos)

  function ajouterUnePhotos () {
    if (ajoutPhotos.files && ajoutPhotos.files[0]) {
      const nouvelleObjet = new FileReader()
      nouvelleObjet.onload = function (event) {
        const imageElement = document.createElement('img')
        imageElement.src = event.target.result
        imageElement.classList.add('image')
        containerAjout.appendChild(imageElement)
        containerAjout.classList.add('image-visible')
      }
      nouvelleObjet.readAsDataURL(ajoutPhotos.files[0])
    }
  }

  // + Changer la couleur du bouton valider formulaire si tous les champs input son valider
  const formDataFormulaire = document.getElementById('photos-form')
  const boutonValider = document.getElementById('validation-photos')

  formDataFormulaire.addEventListener('input', () => {
    if (formDataFormulaire.checkValidity()) {
      boutonValider.disabled = false
      boutonValider.style.backgroundColor = '#1D6154'
    } else {
      boutonValider.disabled = true
      boutonValider.style.backgroundColor = ''
    }
  })

  // + Soumettre le formulaire
  formDataFormulaire.addEventListener('submit', soumettreLeFormulaireFormData)

  async function soumettreLeFormulaireFormData (event) {
    event.preventDefault()
    if (!formDataFormulaire.checkValidity()) {
      alert('Veuillez remplir tous les champs obligatoires.')
    } else {
      const token = localStorage.getItem('token')
      const formData = new FormData(formDataFormulaire)

      const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      // ! Redirection modalGalerie si response ok et actualisation de la modal et de la galerie
      if (response.ok) {
        modalPhotos.close()
        modal.showModal()
        await actualisationDeLaModalGalerie()
        await galerieProjects()
      } else {
        alert('Échec lors de l\'envoi du formulaire')
      }
    }
  }
  // + Fermer la modal en cliquant hors de la modal
  window.addEventListener('click', function (event) {
    if (event.target === modalPhotos) {
      modalPhotos.close()
    }
  })

  // + Fermer la modalPhotos en cliquant sur le bouton de fermeture
  closeModal2.addEventListener('click', () => {
    modalPhotos.close()
  })
})
