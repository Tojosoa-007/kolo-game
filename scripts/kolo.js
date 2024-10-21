// tous les éléments nécessaires

const popupInfo = document.querySelector(".popup-info")
const startBouton = document.querySelector(".start-button")
const boutonQuit = popupInfo.querySelector(".quitter")
const boutonCommencer = popupInfo.querySelector(".commencer")
const container = document.querySelector(".container")
const optionList = document.querySelector(".list-quiz")
const timeCount = document.querySelector(".quiz-chrono span")
const LineCounter = document.querySelector(".quiz-line")
const next_btn = document.querySelector(".next-bouton")
const scoreAffichage = document.querySelector(".score-affichage")
const btnSuivant = scoreAffichage.querySelector(".btn-suivant")
const btnQuitte = scoreAffichage.querySelector(".btn-quitte")
const content = document.querySelector(".content")
const imgaCarre = document.querySelector(".carre img")
const inputAnswer = document.getElementById("answer")
const bouton = document.querySelector(".btn-valide")
const scoreSpan = document.querySelector(".score")
const scoreLength = document.querySelector(".lenght")
const feedback = document.querySelector(".feedblack-devine")
const indice = document.querySelector(".indice span")
const categorie = document.querySelector(".quiz-categorie")
const option = optionList.children



// lorsqu'on clique le popup affiche

startBouton.addEventListener("click", () => {
    popupInfo.classList.add("active")
})

// lorsqu'on clique le popup ferme

boutonQuit.addEventListener("click", () => {
    popupInfo.classList.remove("active")
})

// initialisation des compteurs

let question_count = 0
let question_number = 1
let counter
let timeDelay = 15
let widthTime = 0
let score = 0
let currentQuestion = 0;
let scoreDevine = 0;


// lorsqu'on clique le jeu de quizz commence

boutonCommencer.addEventListener("click", () => {
    container.style.display = "block"
    popupInfo.classList.remove("active")
    startBouton.style.display = "none"
    showQuestion(0)
    updateBottom(1)
    startTime(timeDelay)
    startTimeLine(widthTime)
})




// lorsqu'on clique sur le bouton next le question change s'il y a ou s'il n'y a pas le score final s'affiche

next_btn.addEventListener("click", () => {
    if (question_count < questions.length - 1) {
        question_count++
        question_number++
        showQuestion(question_count)
        updateBottom(question_number)
        clearInterval(counter)
        startTime(timeDelay)
        clearInterval(counterLine)
        startTimeLine(widthTime)
        next_btn.style.display = "none"       
    } else {
        container.style.display = "none"
        popupInfo.classList.remove("active")
        startBouton.style.display = "none"
        scoreAffichage.style.display = "block"
        affichageScore(score)
    }
})




// lorsqu'on clique sur le bouton quitte le jeu est terminé et il revient sur l'interface de l'index

btnQuitte.addEventListener("click", () => {
    let rebourd = 1
    let r = setInterval(
        () => {
            rebourd--
            if (rebourd === 0) {
                clearInterval(r)
                window.location.reload()
            }
        }, 200
    )
})

// lorsqu'on clique sur le bouton suivant la deuxième jeu commence

btnSuivant.addEventListener("click", () => {
    content.style.display = "block"
    container.style.display = "none"
    popupInfo.classList.remove("active")
    startBouton.style.display = "none"
});


// afficher le score, la nombre de question et l'indice

scoreSpan.innerText = scoreDevine;
scoreLength.innerText = questionDevine.length;
indice.innerText = questionDevine[currentQuestion].indice


// lorsqu'on clique sur le bouton valider le formulaire est envoyer

bouton.addEventListener("click", submitFormulaire);


// la fonctionnement de la jeu au événement clique et envoie de réponse

function submitFormulaire() {
    const userAnswer = inputAnswer.value;
    const correctAnswer = questionDevine[currentQuestion].answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        scoreDevine++;
        feedback.innerHTML = '<div class="feedblack-devine correct"> CORRECT </div>'
    } else {
        feedback.innerHTML = '<div class="feedblack-devine incorrect"> INCORRECT la réponse est ' + correctAnswer + ' </div>'
    }

    scoreSpan.innerText = scoreDevine;
    scoreLength.innerText = questionDevine.length;

    currentQuestion++;

    let c = 2
    let interval = setInterval ( () => {
        c--
        if (c === 0) {
            clearInterval(interval)
            if (currentQuestion < questionDevine.length) {
                loadNextQuestion();
            } else {
                container.style.display = "none"
                popupInfo.classList.remove("active")
                startBouton.style.display = "none"
                let p = 2
                const a = setInterval(() => {
                    p--
                    if (p === 0) {
                        clearInterval(a)
                        content.style.display = "none"
                        scoreAffichage.style.display = "block"
                        afficheScoreImage(scoreDevine)
                        btnSuivant.onclick = () => {
                            console.log("click sur le bouton suivant")
                            content.style.display = "none"
                            container.style.display = "none"
                            popupInfo.classList.remove("active")
                            startBouton.style.display = "none"
                            window.location.href = "commence.html"                            
                        }

                    }
                }, 1000)
            }
        }
    }, 1000)   
}


// afficher la question suivant de la devinette

function loadNextQuestion() {
    imgaCarre.src = questionDevine[currentQuestion].images; // Charge la nouvelle image
    indice.innerText = questionDevine[currentQuestion].indice
    feedback.innerHTML = ""
    inputAnswer.value = "";
}


// affiche la score de l'utilisateur final de la devinette

function afficheScoreImage (score) {
    let scoreParent = document.querySelector(".text-score")
    let scoreTag = ""
    if (score < 1 ) {
        scoreTag = "<p><span>" + "Vous avez perdu " + " </span> votre score est <span>" + score +"</span> sur <span>" + questionDevine.length + "😒</span></p>"
    } else if (score >= 1 && score < 3) {
        scoreTag = "<p><span>" + "Vous avez fait un bon début ! " + " </span> votre score est <span>" + score +"</span> sur <span>" + questionDevine.length + "😊</span></p>"
    } else if (score >= 3 && score < 4) {
        scoreTag = "<p><span>" + "Bien joué ! " + " </span> votre score est <span>" + score +"</span> sur <span>" + questionDevine.length + "😉</span></p>"
    } else if (score >= 4) {
        scoreTag = "<p><span>" + "Vous êtes un champion ! " + " </span> votre score est <span>" + score +"</span> sur <span>" + questionDevine.length + "🫡</span></p>"
    }

    return scoreParent.innerHTML = scoreTag
}


// sur la quiz afficher la question suivant

function showQuestion (index, className) {
        const question = document.querySelector(".question-quiz");
        question.classList.remove("fade-in"); // Supprimez la classe pour la réinitialiser
        void question.offsetWidth; // Force le reflow pour réinitialiser l'animation
        question.classList.add("fade-in"); // Ajoutez la classe d'animation
    
        let question_tag = "<span>" + questions[index].numb + ". " + questions[index].question + "</span>";
        let option_tag = '<div class="option"><span>' + questions[index].option[0] + '</span></div>' +
                        '<div class="option"><span>' + questions[index].option[1] + '</span></div>' +
                        '<div class="option"><span>' + questions[index].option[2] + '</span></div>' +
                        '<div class="option"><span>' + questions[index].option[3] + '</span></div>';
        question.innerHTML = question_tag;
        optionList.innerHTML = option_tag;
    
        const opt = optionList.querySelectorAll(".option");
        for (let i = 0; i < option.length; i++) {
            option[i].classList.add(className)
        }

        for (let i = 0; i < opt.length; i++) {
            opt[i].setAttribute("onclick", "optionSelected(this)");
        }
}

// la choix de l'utilisateur vérification et ajouter de l'interaction
    
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let user = answer.textContent;
    let correctAnswer = questions[question_count].reponse;
    let allOptions = optionList.children.length;

    // Créer une icône pour la réponse
    let icon = document.createElement("i");
    icon.classList.add("bx");
    
    if (user === correctAnswer) {
        answer.classList.add("correct");
        icon.classList.add("bx-check"); // Icône de vérification
        answer.appendChild(icon); // Ajouter l'icône à la réponse
        score++;
    } else {
        answer.classList.add("incorrect");
        icon.classList.add("bx-x"); // Icône de croix
        answer.appendChild(icon); // Ajouter l'icône à la réponse

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent === correctAnswer) {
                optionList.children[i].setAttribute("class", "option correct");
                let correctIcon = document.createElement("i");
                correctIcon.classList.add("bx", "bx-check");
                optionList.children[i].appendChild(correctIcon);
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}


// mettre à jour l'affichage de la nombre de quizz sur la footer 

function updateBottom(index) {
    const bottom = document.querySelector(".quiz-count");
    let formattedIndex = index < 9 ? '0' + (index) : (index);
    let bottom_tag = `<span>${formattedIndex}</span> sur <span>${questions.length}</span> Quiz`;
    bottom.innerHTML = bottom_tag;
}


// fonction qui gère la temps

function startTime(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";

            // Afficher la bonne réponse lorsque le temps est écoulé
            let allOptions = optionList.children.length;
            let correctAnswer = questions[question_count].reponse;

            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent === correctAnswer) {
                    optionList.children[i].setAttribute("class", "option correct");
                    let correctIcon = document.createElement("i");
                    correctIcon.classList.add("bx", "bx-check");
                    optionList.children[i].appendChild(correctIcon);
                }
                optionList.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block"; // Afficher le bouton suivant
        }
    }
}


// fonction qui gère la time line
let counterLine

function startTimeLine (time) {
    counterLine = setInterval(timer, 20)
    function timer () {
        time += 1
        LineCounter.style.width = time + "px"
        if (time > 800) {
            clearInterval(counterLine)
        }
    }
}


// affichage du score final

function affichageScore (score) {
    let scoreParent = document.querySelector(".text-score")
    let scoreTag = ""
    if (score < 5 ) {
        scoreTag = "<p><span>" + "Vous avez perdu " + " </span> votre score est <span>" + score +"</span> sur <span>" + questions.length + "😒</span></p>"
    } else if (score >= 5 && score < 10) {
        scoreTag = "<p><span>" + "Vous avez fait un bon début ! " + " </span> votre score est <span>" + score +"</span> sur <span>" + questions.length + "😊</span></p>"
    } else if (score >= 10 && score < 15) {
        scoreTag = "<p><span>" + "Bien joué ! " + " </span> votre score est <span>" + score +"</span> sur <span>" + questions.length + "😉</span></p>"
    } else if (score >= 15 && score < 20) {
        scoreTag = "<p><span>" + "Excellent ! " + " </span> votre score est <span>" + score +"</span> sur <span>" + questions.length + "😮</span></p>"
    } else if (score >= 20) {
        scoreTag = "<p><span>" + "Vous êtes un champion ! " + " </span> votre score est <span>" + score +"</span> sur <span>" + questions.length + "🫡</span></p>"
    }

    return scoreParent.innerHTML = scoreTag
}

