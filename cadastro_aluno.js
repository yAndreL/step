document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form-cadastro');
  const inputCPF = document.getElementById('cpf');
  const inputTelefone = document.getElementById('telefone');
  
  inputCPF.addEventListener('input', function() {
    this.value = mascararCPF(this.value);
  });
  
  inputTelefone.addEventListener('input', function() {
    this.value = mascararTelefone(this.value);
  });
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = inputTelefone.value.trim();
    const cpf = inputCPF.value.trim();
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmar-senha').value;
    
    if (!validarCampos(nome, email, telefone, cpf, senha, confirmaSenha)) {
      return;
    }
    
    const alunos = JSON.parse(localStorage.getItem('dbalunos')) || [];
    
    if (alunos.some(aluno => aluno.cpf === cpf)) {
      alert('CPF já cadastrado!');
      return;
    }
    
    if (alunos.some(aluno => aluno.email === email)) {
      alert('Email já cadastrado!');
      return;
    }
    
    const novoAluno = {
      nome,
      email,
      telefone,
      cpf,
      senha
    };
    
    alunos.push(novoAluno);
    localStorage.setItem('dbalunos', JSON.stringify(alunos));
    
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login_aluno.html';
  });
  
  function validarCampos(nome, email, telefone, cpf, senha, confirmaSenha) {
    if (!nome || !email || !telefone || !cpf || !senha || !confirmaSenha) {
      alert('Todos os campos são obrigatórios!');
      return false;
    }
    
    if (!validarEmail(email)) {
      alert('Email inválido!');
      return false;
    }
    
    if (cpf.length < 14) {
      alert('CPF inválido!');
      return false;
    }
    
    if (telefone.length < 14) {
      alert('Telefone inválido!');
      return false;
    }
    
    if (senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return false;
    }
    
    if (senha !== confirmaSenha) {
      alert('As senhas não coincidem!');
      return false;
    }
    
    return true;
  }
  
  function validarEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  function mascararCPF(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return valor.substring(0, 14);
  }
  
  function mascararTelefone(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    return valor.substring(0, 15);
  }
});