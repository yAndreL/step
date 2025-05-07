const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sNome = document.querySelector("#m-nome");
const sEmail = document.querySelector("#m-email");
const sTelefone = document.querySelector("#m-telefone");
const sSenha = document.querySelector("#m-senha");
const sTipo = document.querySelector("#m-tipo");
const sDocumento = document.querySelector("#m-documento");
const sDocumentoLabel = document.querySelector("#m-documento-label");
const btnSalvar = document.querySelector("#btnSalvar");
const btnIncluir = document.querySelector("#new");

let itens = [];
let id;

const getItensBD = (tipo = "usuarios") => JSON.parse(localStorage.getItem(`db${tipo}`)) ?? [];
const setItensBD = (itens, tipo = "usuarios") => localStorage.setItem(`db${tipo}`, JSON.stringify(itens));

function combinarUsuarios() {
    const usuarios = getItensBD("usuarios");
    const alunos = getItensBD("alunos");
    const motoristas = getItensBD("motoristas");
    
    const usuariosComTipo = usuarios.map(u => ({...u, tipo: "Geral", documento: u.documento || ""}));
    const alunosComTipo = alunos.map(a => ({...a, tipo: "Aluno", documento: a.cpf || ""}));
    const motoristasComTipo = motoristas.map(m => ({...m, tipo: "Motorista", documento: m.cnpj || ""}));
    
    return [...usuariosComTipo, ...alunosComTipo, ...motoristasComTipo];
}

function carregaItens(){
    itens = combinarUsuarios();
    tbody.innerHTML = '';
    itens.forEach((item, indexOf) => {
        insertItem(item, indexOf);
    });
}

carregaItens();

function insertItem(item, index){
    let tr = document.createElement('tr')

    const tipoClass = item.tipo.toLowerCase();

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td><span class="tipo-usuario tipo-${tipoClass}">${item.tipo}</span></td>
        <td>${item.documento}</td>
        <td>${item.telefone}</td>
        <td class='acao'>
            <button onclick='editItem(${index})'><i class='bx bx-edit'></i></button>
        </td>
        <td class='acao'>
            <button onclick='deleteItem(${index})'><i class='bx bx-trash'></i></button>
        </td>`;
    tbody.appendChild(tr);
}

function editItem(index){
    openModal(true, index);
}

function deleteItem(index){
    if(confirm("Deseja realmente excluir?")){
        const item = itens[index];
        const tipo = item.tipo.toLowerCase();
        
        const listaEspecifica = getItensBD(tipo === "geral" ? "usuarios" : `${tipo}s`);
        
        const itemIndex = listaEspecifica.findIndex(
            i => i.nome === item.nome && i.email === item.email
        );
        
        if (itemIndex !== -1) {
            listaEspecifica.splice(itemIndex, 1);
            setItensBD(listaEspecifica, tipo === "geral" ? "usuarios" : `${tipo}s`);
        }
        
        itens.splice(index, 1);
        carregaItens();
    }
}

sTipo.addEventListener('change', function() {
    if (this.value === 'Aluno') {
        sDocumentoLabel.textContent = 'CPF';
        sDocumento.placeholder = 'Digite o CPF';
    } else if (this.value === 'Motorista') {
        sDocumentoLabel.textContent = 'CNPJ';
        sDocumento.placeholder = 'Digite o CNPJ';
    } else {
        sDocumentoLabel.textContent = 'CPF/CNPJ';
        sDocumento.placeholder = 'Digite o documento (opcional)';
    }
});

function openModal(edit = false, index = 0){
    modal.classList.add("active");

    modal.onclick = (e) => {
        if(e.target.className.indexOf('modal-container') !== -1){
            modal.classList.remove("active");
        }
    }
    if(edit){
        sNome.value = itens[index].nome;
        sEmail.value = itens[index].email;
        sTelefone.value = itens[index].telefone;
        sSenha.value = itens[index].senha;
        sTipo.value = itens[index].tipo;
        sDocumento.value = itens[index].documento;
        
        if (itens[index].tipo === 'Aluno') {
            sDocumentoLabel.textContent = 'CPF';
            sDocumento.placeholder = 'Digite o CPF';
        } else if (itens[index].tipo === 'Motorista') {
            sDocumentoLabel.textContent = 'CNPJ';
            sDocumento.placeholder = 'Digite o CNPJ';
        } else {
            sDocumentoLabel.textContent = 'CPF/CNPJ';
            sDocumento.placeholder = 'Digite o documento (opcional)';
        }
        
        id = index;
    } else{
        sNome.value = '';
        sEmail.value = '';
        sTelefone.value = '';
        sSenha.value = '';
        sDocumento.value = '';
        sTipo.value = 'Geral';
        sDocumentoLabel.textContent = 'CPF/CNPJ';
        sDocumento.placeholder = 'Digite o documento (opcional)';
    }
}

btnSalvar.onclick = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
        return;
    }

    const tipoUsuario = sTipo.value;
    const documentoValor = sDocumento.value.trim();
    
    if (id !== undefined) {
        const item = itens[id];
        const tipoAntigo = item.tipo.toLowerCase();
        const tipoNovo = tipoUsuario.toLowerCase();
        
        if (tipoAntigo !== tipoNovo) {
            const listaAntiga = getItensBD(tipoAntigo === "geral" ? "usuarios" : `${tipoAntigo}s`);
            const indexAntigo = listaAntiga.findIndex(
                i => i.nome === item.nome && i.email === item.email
            );
            
            if (indexAntigo !== -1) {
                listaAntiga.splice(indexAntigo, 1);
                setItensBD(listaAntiga, tipoAntigo === "geral" ? "usuarios" : `${tipoAntigo}s`);
            }
            
            const listaNova = getItensBD(tipoNovo === "geral" ? "usuarios" : `${tipoNovo}s`);
            const novoItem = {
                nome: sNome.value,
                email: sEmail.value,
                telefone: sTelefone.value,
                senha: sSenha.value
            };
            
            if (tipoNovo === "aluno") {
                novoItem.cpf = documentoValor;
            } else if (tipoNovo === "motorista") {
                novoItem.cnpj = documentoValor;
            } else {
                novoItem.documento = documentoValor;
            }
            
            listaNova.push(novoItem);
            setItensBD(listaNova, tipoNovo === "geral" ? "usuarios" : `${tipoNovo}s`);
        } else {
            const listaEspecifica = getItensBD(tipoNovo === "geral" ? "usuarios" : `${tipoNovo}s`);
            
            const itemIndex = listaEspecifica.findIndex(
                i => i.nome === item.nome && i.email === item.email
            );
            
            if (itemIndex !== -1) {
                listaEspecifica[itemIndex].nome = sNome.value;
                listaEspecifica[itemIndex].email = sEmail.value;
                listaEspecifica[itemIndex].telefone = sTelefone.value;
                listaEspecifica[itemIndex].senha = sSenha.value;
                
                if (tipoNovo === "aluno") {
                    listaEspecifica[itemIndex].cpf = documentoValor;
                } else if (tipoNovo === "motorista") {
                    listaEspecifica[itemIndex].cnpj = documentoValor;
                } else {
                    listaEspecifica[itemIndex].documento = documentoValor;
                }
                
                setItensBD(listaEspecifica, tipoNovo === "geral" ? "usuarios" : `${tipoNovo}s`);
            }
        }
        
        itens[id].nome = sNome.value;
        itens[id].email = sEmail.value;
        itens[id].telefone = sTelefone.value;
        itens[id].senha = sSenha.value;
        itens[id].tipo = tipoUsuario;
        itens[id].documento = documentoValor;
    } else {
        const tipoNovoUsuario = tipoUsuario.toLowerCase();
        const novoItem = {
            nome: sNome.value,
            email: sEmail.value,
            telefone: sTelefone.value,
            senha: sSenha.value
        };
        
        if (tipoNovoUsuario === "aluno") {
            novoItem.cpf = documentoValor;
        } else if (tipoNovoUsuario === "motorista") {
            novoItem.cnpj = documentoValor;
        } else {
            novoItem.documento = documentoValor;
        }
        
        const listaEspecifica = getItensBD(tipoNovoUsuario === "geral" ? "usuarios" : `${tipoNovoUsuario}s`);
        listaEspecifica.push(novoItem);
        setItensBD(listaEspecifica, tipoNovoUsuario === "geral" ? "usuarios" : `${tipoNovoUsuario}s`);
        
        itens.push({
            nome: sNome.value,
            email: sEmail.value,
            telefone: sTelefone.value,
            senha: sSenha.value,
            tipo: tipoUsuario,
            documento: documentoValor
        });
    }

    modal.classList.remove("active");
    carregaItens(); 
    id = undefined; 
};

function validarFormulario() {
    if (sNome.value === '' || sEmail.value === '' || sTelefone.value === '' || sSenha.value === '') {
        alert('Preencha todos os campos obrigatórios!');
        return false;
    }
    
    if (!validarEmail(sEmail.value)) {
        alert('Email inválido! Por favor, insira um email correto.');
        return false;
    }
    
    if (!validarTelefone(sTelefone.value)) {
        alert('Telefone inválido! O formato deve ser (XX) XXXXX-XXXX ou números sem formatação.');
        return false;
    }
    
    if (sSenha.value.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return false;
    }
    
    return true;
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarTelefone(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');
    
    return numeroLimpo.length >= 10 && numeroLimpo.length <= 11;
}

function formatarTelefone(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');
    
    if (numeroLimpo.length === 11) {
        return `(${numeroLimpo.substring(0, 2)}) ${numeroLimpo.substring(2, 7)}-${numeroLimpo.substring(7)}`;
    } else if (numeroLimpo.length === 10) {
        return `(${numeroLimpo.substring(0, 2)}) ${numeroLimpo.substring(2, 6)}-${numeroLimpo.substring(6)}`;
    }
    return telefone;
}

btnIncluir.onclick = () => {
    openModal();
}

window.addEventListener('storage', function(e) {
    if (e.key === 'dbalunos' || e.key === 'dbmotoristas' || e.key === 'dbusuarios') {
        carregaItens();
    }
});