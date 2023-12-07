document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('#modal')
    const openModal = document.querySelector('#open-modal')
    const closeModal = document.querySelector('#close-modal')

    openModal.addEventListener('click', async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            window.location.href = 'login.html'
        }
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

            const iconSupprimer = document.createElement('i')
            iconSupprimer.classList.add('fa-solid', 'fa-trash-can')

            apiContainer.appendChild(imageContainer)

            imageContainer.appendChild(imageElement)
            imageContainer.appendChild(btnSupprimer)

            btnSupprimer.appendChild(iconSupprimer)

            btnSupprimer.addEventListener('click', async () => {
                const id = data[i].id
                console.log(id)
                const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            })
        }
    })
    
    closeModal.addEventListener('click', () => {
        if (modal.open) {
            modal.close()
            console.log("La modal a été fermer")
        }
    })
})
