document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form-esqueci-senha');
  const inputCPF = document.getElementById('cpf');
  
  inputCPF.addEventListener('input', function() {
    this.value = mascararCPF(this.value);
  });
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cpf = inputCPF.value.trim();
    
    const alunos = JSON.parse(localStorage.getItem('dbalunos')) || [];
    const alunoEncontrado = alunos.find(aluno => aluno.cpf === cpf);
    
    if (alunoEncontrado) {
      alert(`Uma nova senha foi enviada para o email: ${alunoEncontrado.email}`);
      window.location.href = 'login_aluno.html';
    } else {
      alert('CPF não encontrado no sistema!');
    }
  });
  
  function mascararCPF(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return valor.substring(0, 14);
  }
});