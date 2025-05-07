document.addEventListener('DOMContentLoaded', function() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || null;
  
  if (!usuarioLogado) {
    window.location.href = 'login_aluno.html';
    return;
  }
  
  const nomeUsuarioElement = document.getElementById('nome-usuario');
  if (nomeUsuarioElement && usuarioLogado.nome) {
    nomeUsuarioElement.textContent = usuarioLogado.nome;
  }
  
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      localStorage.removeItem('usuarioLogado');
      if (usuarioLogado.tipo === 'aluno') {
        window.location.href = 'login_aluno.html';
      } else {
        window.location.href = 'login_motorista.html';
      }
    });
  }
  
  const transportesContainer = document.getElementById('transportes-container');
  
  if (transportesContainer) {
    const transportes = [
      {
        id: 1,
        nome: 'Transporte Escolar Seguro',
        avaliacao: 4.8,
        preco: 250.00,
        horarios: ['7:00', '12:00', '18:00'],
        locais: ['Zona Norte', 'Centro', 'Barra da Tijuca'],
        imagem: 'LogoSTEP.png'
      },
      {
        id: 2,
        nome: 'Escolar Express',
        avaliacao: 4.5,
        preco: 220.00,
        horarios: ['6:30', '12:30', '17:30'],
        locais: ['Zona Sul', 'Centro', 'Tijuca'],
        imagem: 'LogoSTEP.png'
      },
      {
        id: 3,
        nome: 'TransportKids',
        avaliacao: 4.7,
        preco: 280.00,
        horarios: ['7:15', '12:15', '18:15'],
        locais: ['Recreio', 'Barra da Tijuca', 'Jacarepaguá'],
        imagem: 'LogoSTEP.png'
      },
      {
        id: 4,
        nome: 'Escola na Hora',
        avaliacao: 4.6,
        preco: 230.00,
        horarios: ['6:45', '12:45', '17:45'],
        locais: ['Méier', 'Tijuca', 'Centro'],
        imagem: 'LogoSTEP.png'
      }
    ];
    
    transportes.forEach(transporte => {
      const transporteCard = document.createElement('div');
      transporteCard.className = 'transporte-card';
      
      const locaisFormatados = transporte.locais.join(', ');
      const horariosFormatados = transporte.horarios.join(', ');
      
      transporteCard.innerHTML = `
        <div class="transporte-imagem">
          <img src="${transporte.imagem}" alt="${transporte.nome}">
        </div>
        <div class="transporte-info">
          <h3>${transporte.nome}</h3>
          <p class="avaliacao">
            <span class="stars">★★★★★</span>
            <span class="rating">${transporte.avaliacao.toFixed(1)}</span>
          </p>
          <p class="preco">R$ ${transporte.preco.toFixed(2)}/mês</p>
          <p class="horarios"><strong>Horários:</strong> ${horariosFormatados}</p>
          <p class="locais"><strong>Locais atendidos:</strong> ${locaisFormatados}</p>
          <button class="btn-contratar" data-id="${transporte.id}">Contratar</button>
        </div>
      `;
      
      transportesContainer.appendChild(transporteCard);
      
      const btnContratar = transporteCard.querySelector('.btn-contratar');
      btnContratar.addEventListener('click', function() {
        const transporteId = this.getAttribute('data-id');
        window.location.href = `tela_info_transporte_1.html?id=${transporteId}`;
      });
    });
  }
  
  const filtroForm = document.getElementById('filtro-form');
  if (filtroForm) {
    filtroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const localBusca = document.getElementById('local').value.toLowerCase();
      const precoMax = parseFloat(document.getElementById('preco-max').value) || Infinity;
      
      const transporteCards = document.querySelectorAll('.transporte-card');
      
      transporteCards.forEach(card => {
        const locaisText = card.querySelector('.locais').textContent.toLowerCase();
        const precoText = card.querySelector('.preco').textContent;
        const preco = parseFloat(precoText.replace(/[^\d,.]/g, '').replace(',', '.')) || 0;
        
        const localMatch = localBusca === '' || locaisText.includes(localBusca);
        const precoMatch = preco <= precoMax;
        
        if (localMatch && precoMatch) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
  
  const limparFiltroBtn = document.getElementById('limpar-filtro');
  if (limparFiltroBtn) {
    limparFiltroBtn.addEventListener('click', function() {
      document.getElementById('local').value = '';
      document.getElementById('preco-max').value = '';
      
      const transporteCards = document.querySelectorAll('.transporte-card');
      transporteCards.forEach(card => {
        card.style.display = 'flex';
      });
    });
  }
});