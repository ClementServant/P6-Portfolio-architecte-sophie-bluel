const loginForm = document.getElementById('login-form')

// + Ajout de l’écouteur d’événement sur le bouton SUBMIT
loginForm.addEventListener('submit', async function (event) {
  // ! Éviter le rechargement de la page par défaut.
  event.preventDefault()

  // ! Récupération des données input pour l'email et le password
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  // + creation objet "formdata" + donner a récupérer
  const formData = {
    email,
    password
  }

  // + function asynchrone requête API
  async function fetchUtilisateur () {
    // ! Méthode fetch requête post a l'API + entête + corp de la requête.
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    // ! Gestion réponse serveur
    if (response.status === 200) {
      const data = await response.json()
      const token = data.token
      localStorage.setItem('token', token)
      alert('Connection réussie ! Redirection vers la page d’accueil')
      window.location.href = 'index.html'
    } else {
      alert('Erreur dans l’identifiant ou le mot de passe')
    }
  }
  await fetchUtilisateur()
})
