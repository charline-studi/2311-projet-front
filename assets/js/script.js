/* PROGRAMME : 
- Cliquer sur une case de mon calendrier
- Cette case doit avoir un numéro inférieur à la date du jour
- Si elle ne l'est pas il ne se passe rien
- Si elle l'a la suite se passe :
- Jouer de la musique
- Afficher l'image de fond de la case
- Affiche une popup avec une citation
- Quand on ferme la popup on arrête la musique
- Sauvegarder un historique des cases cliquées dans le navigateur
*/
import quotes from "./quotes.js"

const showPreviouslyOpenedBoxes = () => {
    // 1 - Récupérer les nombres de boxes déjà ouvertes
    const openedBoxes = localStorage.getItem("openedBoxes")
    if (openedBoxes !== null) {
        // 2 - 'Ouvrir' visuellement ces boxes
        const listOfBoxes = openedBoxes.split(",")
        for(let i = 0; i < listOfBoxes.length; i++) {
            const boxNumber = listOfBoxes[i]
            const box = document.querySelector(`[data-number="${boxNumber}"]`)
            showImage(box)
        }
    }
}

const boxes = document.querySelectorAll(".js-box")
const today = new Date(Date.now())
const dateNumber = today.getDate()

boxes.forEach(box => {
    box.addEventListener('click', () => {
        const boxNumber = parseInt(box.textContent)
        if (boxNumber <= dateNumber) {
            playSong()
            showImage(box)
            openModal(boxNumber)
            saveHistory(boxNumber)
        }
    })
});

const url = "assets/audios/opening-song.mp3"
const song = new Audio(url)
const playSong = () => {
    song.pause()
    song.currentTime = 0
    song.play()
}

const showImage = (boxToHide) => {
    boxToHide.classList.add('hide')
}

const modal = document.querySelector('.js-modal')
const quote = modal.querySelector('.js-quote')
const author = modal.querySelector('.js-author')
const openModal = (index) => {
    quote.textContent = quotes[index].quote
    author.textContent = quotes[index].author
    modal.showModal()
}

modal.addEventListener('close', () => {
    song.pause()
})

const saveHistory = (boxNumber) => {
    let openedBoxes = []
    let localValue = localStorage.getItem("openedBoxes")
    if (localValue !== null) {
        openedBoxes = localValue.split(',')
    }
    openedBoxes.push(boxNumber)
    localStorage.setItem("openedBoxes", openedBoxes)
}


showPreviouslyOpenedBoxes()