document.addEventListener('DOMContentLoaded', function () {
    const modalPhotos = document.querySelector('#modal2')
    const openModal2 = document.querySelector('#ajout-photo')
    const retourModal1 = document.querySelector('#retour-Modal1')
    const closeModal2 = document.querySelector('#close-modal2')

    openModal2.addEventListener('click', async (event) => {
        event.preventDefault()
        modal.close()
        modalPhotos.showModal()
        
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
        const catégorieForm = document.getElementById('catégorie')
        catégorieForm.innerHTML = ''

        categories.forEach(category => {
            const optionElement = document.createElement('option')
            optionElement.innerText = category.name
            catégorieForm.appendChild(optionElement)
        })
    }

    // + Ajouter des photos
    const ajoutPhotos = document.getElementById('télécharger-photos')
    const containerAjout = document.querySelector('.container-ajout')

    ajoutPhotos.addEventListener('change', ajouterUnePhoto)


    function ajouterUnePhoto () {
        if (ajoutPhotos.files && ajoutPhotos.files[0]) {
            const nouvelleObjet = new FileReader()
            nouvelleObjet.onload = function (event) {
                containerAjout.innerHTML = ''
                const imageElement = document.createElement('img')
                imageElement.src = event.target.result
                imageElement.classList.add('image')
                containerAjout.appendChild(imageElement)
            }
            nouvelleObjet.readAsDataURL(ajoutPhotos.files[0])
            console.log(nouvelleObjet)
        } 
    }

    const validationFormulaire = document.getElementById('validation-photos')
    validationFormulaire.addEventListener('submit', soumettreLeFormulaireFormData)
 
    async function validerFormulaire () {
        const titre = document.getElementById('titre').value
        const catégorie = document.getElementById('catégorie').value

        if (!titre || !catégorie) {
            alert('Veuillez remplir tous les champs')
            return false
        }
        return true
    }

    async function soumettreLeFormulaireFormData (event) {
        event.preventDefault()

        // ! Valider le formulaire
        const formulaireValider = await validerFormulaire()
        if (!formulaireValider) {
            return
        }

        const formAjout = document.getElementById('photos-form')
        formAjout.addEventListener('submit', ajouterFormulaire)

        function ajouterFormulaire (event) {
            event.preventDefault()
            const formData = new FormData(validationFormulaire)
            // formData.append('image', ajoutPhotos.files[0])
            const telechargerPhotos = formData.get('télécharger-photos')
            const titre = formData.get('titre')
            const categorie = formData.get('catégorie')
            console.log('photos-form', { telechargerPhotos, titre, categorie })
        }

        /* try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4',
                },
                body: formData
            })

            const responseData = await response.json()
            if (response.status === 201) {
                ajouterProjetALaGalerie(responseData)
            } else {
                alert('Échec lors de l\'envoi du formulaire')
            }
        } catch (error) {
            console.log('Erreur: ', error)
        } */
    }

    function ajouterProjetALaGalerie() {
        // a créer 
    } 
})