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

// Script para reproduzir a música quando a seção é visualizada


// Script para atualizar o ano automaticamente no footer
document.addEventListener("DOMContentLoaded", function () {
    const yearElement = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});

// Script para abrir links do footer em novas abas
const footerLinks = document.querySelectorAll('footer a');
footerLinks.forEach(link => {
    link.setAttribute('target', '_blank');
});


document.addEventListener('DOMContentLoaded', function () {
        // Timer para a falha
        let minutes = 90; // 1 hora e 30 minutos = 90 minutos
        let seconds = 0;

        const timerDisplay = document.getElementById('timer');

        function updateTimer() {
            if (seconds === 0) {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }

            // Exibir tempo formatado
            const formattedTime = `${Math.floor(minutes / 60)}:${minutes % 60}:${seconds < 10 ? '0' : ''}${seconds}`;
            timerDisplay.textContent = formattedTime;

            // Salvar no Firebase
            database.ref('falhas/tempo').set(formattedTime);
        }

        setInterval(updateTimer, 1000); // Atualizar a cada segundo

        // Exibição de status ao clicar
        const statusItems = document.querySelectorAll('.status-item');

        statusItems.forEach(item => {
            item.addEventListener('click', function () {
                const status = this.getAttribute('data-status');
                alert('Status: ' + status);

                // Salvar status no Firebase
                const itemName = this.querySelector('h5').textContent;
                database.ref('falhas/' + itemName).set({
                    status: status,
                    timestamp: new Date().toISOString()
                });
            });
        });
    });
