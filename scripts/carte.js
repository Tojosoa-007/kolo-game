const draggables = document.querySelectorAll('.drag');
const droppables = document.querySelectorAll('.vide');

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
        } else {
            drop.style.backgroundColor = '#e74c3c'; // Red for incorrect
            drop.style.border = '#e74c3c'; // Red for incorrect
        }
    });
});