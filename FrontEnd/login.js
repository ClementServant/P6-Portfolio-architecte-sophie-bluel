// ! Récupération de l’Élément <div classe="#login"> depuis le DOM
const loginSection = document.querySelector(".login")
// * Ajout des style pour L’élément <section class="login">
loginSection.style.display = "flex";
loginSection.style.flexDirection = "column";
loginSection.style.justifyContent = "center";
loginSection.style.alignItems = "center";
loginSection.style.gap = "37px";

// ! Function pour les style des element

// * élément <h2>
function styleTitre(h2Element) {
    h2Element.style.color = "#1D6154";
    h2Element.style.textAlign = "center";
    h2Element.style.fontFamily = "Syne";
    h2Element.style.fontSize = "30px";
    h2Element.style.fontWeight ="700";
    h2Element.style.lineHeight = "normal";
}

// * élément <form>
function styleForm(formElement) {
    formElement.style.display = "flex";
    formElement.style.alignItems = "center";
    formElement.style.flexDirection = "column";
}

// * élément <label> 
function styleLabel(labelElement) {
    labelElement.style.alignSelf = "flex-start";
    labelElement.style.color = "#3D3D3D";
    labelElement.style.fontFamily = "Work Sans";
    labelElement.style.fontSize = "14px";
    labelElement.style.fontStyle = "normal";
    labelElement.style.fontWeight = "500";
    labelElement.style.lineHeight = "normal";
    labelElement.style.marginBottom = "7px";
}

// * élément <input>
function styleInput(inputElement) {
    inputElement.style.width = "379px";
    inputElement.style.height = "51px";
    inputElement.style.background = "#FFF";
    inputElement.style.boxShadow = "0px 4px 14px 0px rgba(0, 0, 0, 0.09)";
    inputElement.style.border = "none";
    inputElement.style.marginBottom = "30px";
}

// * élément <button>
function styleButton(buttonElement) {
    buttonElement.style.width = "179px";
    buttonElement.style.height = "36px";
    buttonElement.style.borderRadius = "60px";
    buttonElement.style.background = "#1D6154";
    buttonElement.style.color = "#FFF";
    buttonElement.style.textAlign = "center";
    buttonElement.style.fontFamily = "Syne";
    buttonElement.style.fontSize = "14px";
    buttonElement.style.fontStyle = "normal";
    buttonElement.style.fontWeight = "700";
    buttonElement.style.lineHeight = "normal";
    buttonElement.style.border = "none";
    buttonElement.style.cursor = "pointer";
    buttonElement.style.margin = "7px 0 28px 0";
}

// * élément <p>
function styleParagraphe(pElement) {
    pElement.style.color = "#3D3D3D";
    pElement.style.fontFamily = "Work Sans";
    pElement.style.fontStyle = "normal";
    pElement.style.fontSize = "14px";
    pElement.style.fontWeight = "500";
    pElement.style.lineHeight = "normal";
    pElement.style.textDecorationLine = "underline";
}

// + Ajout de L’élément <h2> 
const titreElement = document.createElement("h2")
titreElement.innerText = "Log In";
styleTitre(titreElement)

// + Ajout de l’élément <form>
const formElement = document.createElement("form")
styleForm(formElement)

// + Ajout de l’élément <label> pour l'e-mail
const labelEmail = document.createElement("label")
labelEmail.innerText = "E-mail"
styleLabel(labelEmail)

// + Ajout de l’élément <input> pour l'e-mail
const inputEmail = document.createElement("input")
inputEmail.type = "email"
inputEmail.name = "email"
styleInput(inputEmail)

// + Ajout de L’élément <label> pour le mot de passe
const labelPassword = document.createElement("label")
labelPassword.innerText = "Mot de passe"
styleLabel(labelPassword)

// + Ajout de L’élément <input> pour le mot de passe
const inputPassword = document.createElement("input")
inputPassword.type = "password"
inputPassword.name = "password"
styleInput(inputPassword)


// + Ajout de L’élément <button>
const buttonElement = document.createElement("button")
buttonElement.type = "submit"
buttonElement.innerText = "Se connecter"
styleButton(buttonElement)

// + Ajout de L’élément <p>
const paragrapheElement = document.createElement("p")
paragrapheElement.innerText = "Mot de passe oublié"
styleParagraphe(paragrapheElement)

// + Ajout des éléments enfant a <section class="login">
loginSection.appendChild(titreElement)
loginSection.appendChild(formElement)


// + Ajout des éléments enfant au formulaire 
formElement.appendChild(labelEmail)
/* formElement.appendChild(document.createElement("br")) */
formElement.appendChild(inputEmail)
/* formElement.appendChild(document.createElement("br")) */
formElement.appendChild(labelPassword)
/* formElement.appendChild(document.createElement("br")) */
formElement.appendChild(inputPassword)
/* formElement.appendChild(document.createElement("br")) */
formElement.appendChild(buttonElement)
/* formElement.appendChild(document.createElement("br")) */
formElement.appendChild(paragrapheElement)