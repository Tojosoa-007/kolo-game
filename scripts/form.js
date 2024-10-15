// Récupérer le formulaire
const form = document.querySelector('.form-nom-equipe');
const submitButton = document.querySelector('.submit-btn');
const popupInfo = document.querySelector(".popup-info")

// Créer l'élément SVG pour le loading
const loadingSVG = `
    <svg class="loader" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"></svg>
`;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Changer le contenu du bouton et désactiver le bouton
    submitButton.innerHTML = loadingSVG; // Changer le contenu par le SVG
    submitButton.disabled = true;

    // Récupérer les valeurs du formulaire
    const nomEquipe = document.getElementById('nom-de-equipe').value;
    const nomEcole = document.getElementById('nom-de-ecole').value;

    const joueurs = [];
    for (let i = 1; i <= 3; i++) {
        joueurs.push({
            nom: document.getElementById(`nom-utilisateur-${i}`).value,
            prenom: document.getElementById(`prenom-utilisateur-${i}`).value,
            contact: document.getElementById(`contact-utilisateur-${i}`).value,
            email: document.getElementById(`mail-utilisateur-${i}`).value,
            classe: document.getElementById(`classe-utilisateur-${i}`).value,
        });
    }

    // Créer l'objet des données à envoyer
    const templateParams = {
        nom_de_equipes: nomEquipe,
        nom_de_ecole: nomEcole,
        nom_utilisateur_1: joueurs[0].nom,
        prenom_utilisateur_1: joueurs[0].prenom,
        contact_utilisateur_1: joueurs[0].contact,
        mail_utilisateur_1: joueurs[0].email,
        classe_utilisateur_1: joueurs[0].classe,
        nom_utilisateur_2: joueurs[1].nom,
        prenom_utilisateur_2: joueurs[1].prenom,
        contact_utilisateur_2: joueurs[1].contact,
        mail_utilisateur_2: joueurs[1].email,
        classe_utilisateur_2: joueurs[1].classe,
        nom_utilisateur_3: joueurs[2].nom,
        prenom_utilisateur_3: joueurs[2].prenom,
        contact_utilisateur_3: joueurs[2].contact,
        mail_utilisateur_3: joueurs[2].email,
        classe_utilisateur_3: joueurs[2].classe,
    };

    // Envoyer l'e-mail avec EmailJS
    emailjs.send("service_3gk2qii", "template_06brl0n", templateParams, "ofEbcEQBnLZEm10rX")
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Inscription réussie !');
            // Réinitialiser le bouton
            submitButton.innerHTML = 'ENVOYER'; // Remettre le texte initial
            submitButton.disabled = false; // Réactiver le bouton
            window.location.href = "commence.html"
        }, function(error) {
            console.log('FAILED...', error);
            alert('Erreur lors de l\'inscription. Veuillez réessayer.');
            // Réinitialiser le bouton
            submitButton.innerHTML = 'ENVOYER'; // Remettre le texte initial
            submitButton.disabled = false; // Réactiver le bouton
        });
});
