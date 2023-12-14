/* PROGRAMME : 
- Cliquer sur une case de mon calendrier
- Cette case doit avoir un numéro inférieur à la date du jour
- Si elle ne l'est pas il ne se passe rien
- Si elle l'a la suite se passe
- Jouer de la musique
- Afficher l'image de fond de la case
*/

import quotes from "./quotes.js"

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