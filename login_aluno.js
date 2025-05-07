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
        
        const alunos = JSON.parse(localStorage.getItem('dbalunos')) || [];
        
        const alunoEncontrado = alunos.find(aluno => aluno.email === email && aluno.senha === senha);
        
        if (alunoEncontrado) {
            alert('Login realizado com sucesso!');
            localStorage.setItem('alunoLogado', JSON.stringify(alunoEncontrado));
            window.location.href = 'crud.html';
        } else {
            alert('Email ou senha incorretos!');
        }
    });
});