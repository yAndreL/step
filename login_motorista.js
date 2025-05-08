document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.formulario');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cnpj = document.getElementById('cnpj').value.trim();
        const senha = document.getElementById('senha').value;
        
        if (!cnpj || !senha) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        const motoristas = JSON.parse(localStorage.getItem('dbmotoristas')) || [];
        
        const motoristaEncontrado = motoristas.find(motorista => motorista.cnpj === cnpj && motorista.senha === senha);
        
        if (motoristaEncontrado) {
            localStorage.setItem('motoristaLogado', JSON.stringify(motoristaEncontrado));
            window.location.href = 'tela_transportes_disponiveis.html';
        } else {
            alert('CNPJ ou senha incorretos!');
        }
    });
});