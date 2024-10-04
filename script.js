// Animação de rolagem suave para links da navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Inicializando AOS (Animate On Scroll)
AOS.init({
    duration: 1200, // Duração das animações
    easing: 'ease-in-out',
    once: true // As animações só ocorrem uma vez
});

// Configuração do carrossel OwlCarousel para seções de destaques ou competições
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
});

// Slick Carousel para seções que você deseja exibir em forma de slides
$('.slick-carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: true,
    pauseOnHover: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

// Lightbox2 para galeria de imagens em competições ganhas
lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'fadeDuration': 600
});

// Efeito de Fade-In em competições ganhas ao carregar a página
window.addEventListener('load', function() {
    const competitions = document.querySelectorAll('.card');
    competitions.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Menu de navegação sticky
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Ativar efeitos WOW.js para animações de rolagem (se usado)
new WOW().init();

// Modo noturno (dark mode toggle)
const toggleTheme = document.querySelector('#toggle-theme');
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleTheme.innerText = 'Modo Claro';
    } else {
        toggleTheme.innerText = 'Modo Escuro';
    }
});

// Função para contar o número de competições ganhas e exibir dinamicamente
function updateCompetitionCount() {
    const countElement = document.getElementById('competition-count');
    const competitions = document.querySelectorAll('.card');
    countElement.innerText = competitions.length;
}

// Atualiza o número de competições ganhas ao carregar a página
window.addEventListener('load', updateCompetitionCount);

// Função para adicionar novas competições (exemplo de futura expansão)
function addCompetition(title, description) {
    const competitionContainer = document.querySelector('#competitions .row');
    const newCompetition = document.createElement('div');
    newCompetition.classList.add('col-md-4');
    newCompetition.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
            </div>
        </div>
    `;
    competitionContainer.appendChild(newCompetition);
    updateCompetitionCount();
}

// Exemplo de uso futuro de uma API para listar competições ganhas
async function fetchCompetitions() {
    try {
        const response = await fetch('https://api.example.com/competitions'); // Exemplo fictício de API
        const competitions = await response.json();
        competitions.forEach(comp => {
            addCompetition(comp.title, comp.description);
        });
    } catch (error) {
        console.error('Erro ao buscar competições:', error);
    }
}

// Exemplo de evento futuro para busca de competições
document.getElementById('fetch-competitions-btn').addEventListener('click', fetchCompetitions);

// Placeholder para mais funcionalidades JS que podem ser adicionadas futuramente
// Exemplo de interatividade com os membros da equipe
const teamMembers = [
    { name: "João", role: "Capitão", year: "7º Ano" },
    { name: "Maria", role: "Artilheira", year: "8º Ano" },
    { name: "Pedro", role: "Defensor", year: "7º Ano" }
];

// Exibindo membros da equipe na seção de "Nossa Equipe"
function displayTeamMembers() {
    const teamContainer = document.getElementById('team-members');
    teamMembers.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.classList.add('team-member');
        memberElement.innerHTML = `
            <h4>${member.name}</h4>
            <p>${member.role} - ${member.year}</p>
        `;
        teamContainer.appendChild(memberElement);
    });
}

// Carregando membros da equipe ao carregar a página
window.addEventListener('load', displayTeamMembers);

document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audio-player');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalDurationDisplay = document.getElementById('total-duration');
    const rewindButton = document.getElementById('rewind');
    const forwardButton = document.getElementById('forward');
    const volumeControl = document.getElementById('volume-control');

    // Formatação do tempo em minutos:segundos
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // Atualizar a barra de progresso com base no tempo atual do áudio
    function updateProgress() {
        progressBar.max = Math.floor(audioPlayer.duration);
        progressBar.value = Math.floor(audioPlayer.currentTime);
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
    }

    // Atualizar o tempo de reprodução quando o usuário mover a barra de progresso
    progressBar.addEventListener('input', function () {
        audioPlayer.currentTime = progressBar.value;
    });

    // Controlar o volume
    volumeControl.addEventListener('input', function () {
        audioPlayer.volume = volumeControl.value;
    });

    // Avançar 10 segundos
    forwardButton.addEventListener('click', function () {
        audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 10, audioPlayer.duration);
    });

    // Retroceder 10 segundos
    rewindButton.addEventListener('click', function () {
        audioPlayer.currentTime = Math.max(audioPlayer.currentTime - 10, 0);
    });

    // Sincronizar a barra de progresso com o áudio durante a reprodução
    audioPlayer.addEventListener('timeupdate', updateProgress);

    // Exibir a duração total do áudio quando ele carregar
    audioPlayer.addEventListener('loadedmetadata', function () {
        totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
    });

    // Quando o áudio terminar, reiniciar a barra de progresso
    audioPlayer.addEventListener('ended', function () {
        progressBar.value = 0;
        currentTimeDisplay.textContent = "0:00";
    });

    // Adicionar animação quando o áudio está tocando
    audioPlayer.addEventListener('play', function () {
        document.getElementById('audio-section').style.animation = 'buttonPulse 1s infinite';
    });

    // Remover animação quando o áudio for pausado
    audioPlayer.addEventListener('pause', function () {
        document.getElementById('audio-section').style.animation = 'none';
    });
});
