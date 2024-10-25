const draggables = document.querySelectorAll('.drag');
const droppables = document.querySelectorAll('.vide');
const placement = document.querySelector(".placement")
const counter = document.querySelector(".counter")
const body = document.querySelector("body")
const btnCarteStart = document.querySelector(".btn-carte button")

let score = 0
let remplie = false
let number = 0
let widthTime = 0

btnCarteStart.onclick = () => {
    startTimeLine(widthTime)
    
    draggables.forEach(drag => {
        drag.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.textContent);
        });
    });
    
    droppables.forEach(drop => {
        drop.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
    
    
        drop.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedData = e.dataTransfer.getData('text');
            const correctAnswer = drop.getAttribute('data-answer');
    
            if (draggedData === correctAnswer) {
                drop.textContent = draggedData;
                drop.style.backgroundColor = '#2ecc71'; // Green for correct
                drop.style.color = '#fff'; // Green for correct
                drop.style.border = '#2ecc71'; // Green for correct
                drop.style.fontWeight = '700'; // Green for correct
                score++
                const afficheScore = '<div class="score">SCORE <span>' + score + '</span>sur<span>6</span></div>'
                placement.innerHTML = afficheScore
            } else {
                drop.style.backgroundColor = '#e74c3c'; // Red for incorrect
                drop.style.border = '#e74c3c'; // Red for incorrect
            }
            remplie = true
            if (remplie === true) {
                number++
                console.log(number)
                if (number > 5 ) {
                    c= 1
                    let r = setInterval(() => {
                        c--
                        if (c === 0) {
                            clearInterval(r)
                            alert("c'est fini ouraaaaahhh")
                            body.innerText = "C'est fini"  // TO DO
                        }
                    }, 1000)   
                } 
            }
        });
    });
}

function startTimeLine (time) {
    counterLine = setInterval(timer, 10)
    function timer () {
        time += 1
        counter.style.width = time + "px"
        if (time > 1200) {
            clearInterval(counterLine)// TO DO
            alert("c'est fini ouraaaaahhh")// TO DO
        }
    }
}
