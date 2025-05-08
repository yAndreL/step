document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.formulario');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cpf = document.getElementById('cpf').value.trim();
        const senha = document.getElementById('senha').value;
        
        if (!cpf || !senha) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        const alunos = JSON.parse(localStorage.getItem('dbalunos')) || [];
        const alunoEncontrado = alunos.find(aluno => aluno.cpf === cpf && aluno.senha === senha);
        
        if (alunoEncontrado) {
            localStorage.setItem('alunoLogado', JSON.stringify(alunoEncontrado));
            window.location.href = 'tela_transportes_disponiveis.html';
        } else {
            alert('CPF ou senha incorretos!');
        }
    });
});