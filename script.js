const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const body = document.querySelector('body')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarIcon = document.querySelector('#start-pause img')
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('sons/Animal Crossing 5PM.mp3') 
const musicaPlay = new Audio('sons/play.wav')
const musicaPause = new Audio('sons/pause.mp3')
const musicaBeep = new Audio('sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null
let volume_slider = document.querySelector(".volume_slider")

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    body.setAttribute('style', 'background',  `imagens/${contexto}.jpg`)

}

const contagemRegressiva= () => {
    if(tempoDecorridoEmSegundos <= 0){
        musicaBeep.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        musicaPause.play()
        zerar()
        return
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarIcon.setAttribute('src', `imagens/pause.png`)
}

function setVolume() {
    musica.volume = volume_slider.value / 100;
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarIcon.setAttribute('src', `imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()