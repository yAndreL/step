document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form-esqueci-senha');
  const inputCNPJ = document.getElementById('cnpj');
  
  inputCNPJ.addEventListener('input', function() {
    this.value = mascararCNPJ(this.value);
  });
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cnpj = inputCNPJ.value.trim();
    
    const motoristas = JSON.parse(localStorage.getItem('dbmotoristas')) || [];
    const motoristaEncontrado = motoristas.find(motorista => motorista.cnpj === cnpj);
    
    if (motoristaEncontrado) {
      alert(`Uma nova senha foi enviada para o email: ${motoristaEncontrado.email}`);
      window.location.href = 'login_motorista.html';
    } else {
      alert('CNPJ não encontrado no sistema!');
    }
  });
  
  function mascararCNPJ(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    return valor.substring(0, 18);
  }
});