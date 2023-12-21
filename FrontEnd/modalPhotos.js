
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
        
        // + Ajout l'écouteur d'événement pour revenir a la première modal
        retourModal1.addEventListener('click', () => {
            modalPhotos.close()
            modal.showModal()
        })

        // ! Appel de la function pour afficher les option de catégories au formulaire
        await optionFormCategories()
    })

    // ! Fermeture de la modale Ajout photos
    closeModal2.addEventListener('click', () => {
        modalPhotos.close()
    })

    async function optionFormCategories () {
        const responseCategories = await fetch('http://localhost:5678/api/categories')
        const categories = await responseCategories.json()
        const catégorieForm = document.getElementById('category')
        catégorieForm.innerHTML = ''

        categories.forEach(category => {
            const optionElement = document.createElement('option')
            optionElement.innerText = category.name
            optionElement.value = category.id
            catégorieForm.appendChild(optionElement)
        })
    }

    // + Ajouter des photos
    const ajoutPhotos = document.getElementById('image')
    const containerAjout = document.querySelector('.container-ajout')

    ajoutPhotos.addEventListener('change', ajouterUnePhoto)


    function ajouterUnePhoto () {
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

    // + Envoy de la photo formData
    
    const formDataFormulaire = document.getElementById('photos-form')
    formDataFormulaire.addEventListener('submit', soumettreLeFormulaireFormData)
 
    async function soumettreLeFormulaireFormData (event) {
        event.preventDefault()
        if (formDataFormulaire.checkValidity()) {
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
    

            if (response.ok) {
                modalPhotos.close()
                console.log('La modalPhotos a été fermer')
                modal.showModal()
                console.log('La modal galerie a été ouverte')
            } else {
                alert('Échec lors de l\'envoi du formulaire')
            }
        } else {
            alert('Veuillez remplir tous les champs obligatoires.')
        }
    }
})
