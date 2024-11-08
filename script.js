// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate on Scroll)
    AOS.init();

    // Adicionar classe 'scrolled' à navbar quando a página é rolada
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Função para abrir modais de campeonatos
    window.openChampionshipModal = function(modalId) {
        const modal = new bootstrap.Modal(document.getElementById(modalId));
        modal.show();
    };

    // Preencher os cards de campeonatos dinamicamente
    const championships = [
        { title: 'Futsal Masculino', description: 'Campeões invictos no torneio de futsal masculino.', modalId: 'futsalMasculinoModal' },
        { title: 'Futsal Feminino', description: 'Nossas meninas arrasaram no campeonato de futsal.', modalId: 'futsalFemininoModal' },
        { title: 'Carimba Masculino', description: 'Vitória emocionante no torneio de carimba masculino.', modalId: 'carimbaMasculinoModal' },
        { title: 'Carimba Feminino', description: 'Nossas meninas dominaram o torneio de carimba.', modalId: 'carimbaFemininoModal' },
        { title: 'Cabo De Guerra Masculino', description: 'Força e estratégia garantiram nossa vitória.', modalId: 'caboGuerraMasculinoModal' },
        { title: 'Cabo De Guerra Feminino', description: 'Nossas meninas mostraram sua força e garra.', modalId: 'caboGuerraFemininoModal' },
        { title: 'Voleibol Masculino', description: 'Vitória espetacular no torneio de vôlei masculino.', modalId: 'voleiMasculinoModal' },
        { title: 'Voleibol Feminino', description: 'Nossas meninas brilharam nas quadras de vôlei.', modalId: 'voleiFemininoModal' },
        { title: 'Handebol Masculino', description: 'Conquista incrível no campeonato de handebol.', modalId: 'handebolMasculinoModal' },
        { title: 'Dama Feminino', description: 'Estratégia e inteligência garantiram nossa vitória.', modalId: 'damaFemininoModal' },
        { title: 'Basquetebol Masculino', description: 'Cestas certeiras levaram nosso time à vitória.', modalId: 'basqueteMasculinoModal' },
        { title: 'Xadrez Feminino', description: 'Nossas meninas dominaram o tabuleiro.', modalId: 'xadrezFemininoModal' },
        { title: '400 Metros Feminino', description: 'Velocidade e resistência garantiram o ouro.', modalId: '400mFemininoModal' },
        { title: 'Arremesso De Peso Feminino', description: 'Força e técnica levaram ao pódio mais alto.', modalId: 'arremessoPesoFemininoModal' },
        { title: 'Lançamento De Dardo Feminino', description: 'Precisão e potência garantiram a vitória.', modalId: 'lancamentoDardoFemininoModal' }
    ];

    const championshipsContainer = document.querySelector('#championships .row');
    championships.forEach((championship, index) => {
        const card = document.createElement('div');
        card.className = 'col animate__animated animate__fadeInUp';
        card.style.animationDelay = `${index * 0.2}s`;
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${championship.title}</h5>
                    <p class="card-text">${championship.description}</p>
                    <button class="btn btn-primary" onclick="openChampionshipModal('${championship.modalId}')">Saiba mais</button>
                </div>
            </div>
        `;
        championshipsContainer.appendChild(card);
    });

    // Adicionar evento de clique para o link de direitos autorais
    document.getElementById('copyrightLink').addEventListener('click', function(e) {
        e.preventDefault();
        const copyrightModal = new bootstrap.Modal(document.getElementById('copyrightModal'));
        copyrightModal.show();
    });
});
