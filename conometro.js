
  // Importar as funções necessárias do SDK do Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
  import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

  // Configuração do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyBRtYMm3XVg-hoxz1Vqq-uSj8RN243XHFs",
    authDomain: "bhaskara-33de5.firebaseapp.com",
    projectId: "bhaskara-33de5",
    storageBucket: "bhaskara-33de5.appspot.com",
    messagingSenderId: "846730567529",
    appId: "1:846730567529:web:9b7fc2ae6b9a5179e127f8",
    measurementId: "G-P9FM25E2G8"
  };

  // Inicializar Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // Data da Semana Cultural
  const culturalWeekDate = new Date('2024-10-25T00:00:00');

  const countdownElement = document.createElement('div');
  countdownElement.classList.add('countdown-timer');
  document.body.appendChild(countdownElement); // Adiciona o elemento ao corpo

  function updateCountdown() {
      const now = new Date();
      const timeDifference = culturalWeekDate - now;

      if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          countdownElement.innerHTML = `<h4>Faltam ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos para o início da Semana Cultural!</h4>`;
          
          // Salvar o tempo restante no Firebase
          set(ref(db, 'countdown/'), {
              days,
              hours,
              minutes,
              seconds,
              timestamp: now.getTime() // Armazenar timestamp atual
          });
      } else {
          countdownElement.innerHTML = '<h4>A Semana Cultural já começou! Aproveite as atividades.</h4>';
      }
  }

  setInterval(updateCountdown, 1000);
