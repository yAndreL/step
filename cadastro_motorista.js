document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.formulario');
  const inputCNPJ = document.getElementById('cnpj');
  const inputTelefone = document.getElementById('telefone');
  
  inputCNPJ.addEventListener('input', function() {
    this.value = mascararCNPJ(this.value);
  });
  
  inputTelefone.addEventListener('input', function() {
    this.value = mascararTelefone(this.value);
  });
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = inputTelefone.value.trim();
    const cnpj = inputCNPJ.value.trim();
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirma-senha').value;
    
    if (!validarCampos(nome, email, telefone, cnpj, senha, confirmaSenha)) {
      return;
    }
    
    const motoristas = JSON.parse(localStorage.getItem('dbmotoristas')) || [];
    
    if (motoristas.some(motorista => motorista.cnpj === cnpj)) {
      alert('CNPJ já cadastrado!');
      return;
    }
    
    if (motoristas.some(motorista => motorista.email === email)) {
      alert('Email já cadastrado!');
      return;
    }
    
    const novoMotorista = {
      nome,
      email,
      telefone,
      cnpj,
      senha
    };
    
    motoristas.push(novoMotorista);
    localStorage.setItem('dbmotoristas', JSON.stringify(motoristas));
    
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login_motorista.html';
  });
  
  function validarCampos(nome, email, telefone, cnpj, senha, confirmaSenha) {
    if (!nome || !email || !telefone || !cnpj || !senha || !confirmaSenha) {
      alert('Todos os campos são obrigatórios!');
      return false;
    }
    
    if (!validarEmail(email)) {
      alert('Email inválido!');
      return false;
    }
    
    if (cnpj.length < 18) {
      alert('CNPJ inválido!');
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
  
  function mascararCNPJ(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    return valor.substring(0, 18);
  }
  
  function mascararTelefone(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    return valor.substring(0, 15);
  }
});