document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.formulario');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        const motoristas = JSON.parse(localStorage.getItem('dbmotoristas')) || [];
        
        const motoristaEncontrado = motoristas.find(motorista => motorista.email === email && motorista.senha === senha);
        
        if (motoristaEncontrado) {
            alert('Login realizado com sucesso!');
            localStorage.setItem('motoristaLogado', JSON.stringify(motoristaEncontrado));
            window.location.href = 'crud.html';
        } else {
            alert('Email ou senha incorretos!');
        }
    });
});