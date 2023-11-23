// ! Récupération de l'element <form> depuis le DOM
const loginForm = document.getElementById("login-form")

// + Ajout event listener sur le bouton SUBMIT
loginForm.addEventListener("submit", function (event) {

    // ! Éviter le rechargement de la page 
    event.preventDefault();

    // ! Récupération des données input pour l'email et le password
    const email = document.getElementById("email").value 
    const password = document.getElementById("password").value

    /* const formData = {
      email: "sophie.bluel@test.tld",
      password: "S0phie"
    }

    fetch("http://localhost:5678/api/users/login", {
      method: 'POST',
      Headers: {
         'Content-Type': 'application/json',
         'accept': 'application/json' 
      },
      body: JSON.stringify(formData)
    }) */
   
    // + Ajout de la function email et mot de passe
     function authentificationEmailEtMotDePasse(email, password) {
         if (email === "sophie.bluel@test.tld" && password === "S0phie") {
            // + Identifiant correct redirection vers la page d’accueil
            alert("Connexion réussite ! Redirection vers la page d’accueil.")
            window.location.href = "index.html"
         } else {
            // + Identifiant incorrect affichage du message d'erreur
            alert("Identifiant ou mot de passe incorrect ! Veuillez réessayer.")
         }
    }
    authentificationEmailEtMotDePasse(email, password)
})

