const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sNome = document.querySelector("#m-nome");
const sEmail = document.querySelector("#m-email");
const sTelefone = document.querySelector("#m-telefone");
const sSenha = document.querySelector("#m-senha");
const btnSalvar = document.querySelector("#btnSalvar");
const btnIncluir = document.querySelector("#new");  // Alterado para #new

let itens = [];
let id;

const getItensBD = () => JSON.parse(localStorage.getItem("dbusuarios")) ?? [];
const setItensBD = () => localStorage.setItem("dbusuarios", JSON.stringify(itens));

function carregaItens(){
    itens = getItensBD();
    tbody.innerHTML = '';
    itens.forEach((item, indexOf)=>{
        insertItem(item, indexOf);
    })
}

carregaItens();

function insertItem(item, index){
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td>${item.telefone}</td>
        <td>${item.senha}</td>
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
    itens.splice(index, 1);
    setItensBD();
    carregaItens();
}

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
        id = index;
    } else{
        sNome.value = '';
        sEmail.value = '';
        sTelefone.value = '';
        sSenha.value = '';
    }
}

btnSalvar.onclick = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do botão

    if (sNome.value === '' || sEmail.value === '' || sTelefone.value === '' || sSenha.value === '') {
        alert('Preencha todos os campos!');
        return;
    }

    if (id !== undefined) {
        // Editar item existente
        itens[id].nome = sNome.value;
        itens[id].email = sEmail.value;
        itens[id].telefone = sTelefone.value;
        itens[id].senha = sSenha.value;
    } else {
        // Adicionar novo item
        itens.push({
            nome: sNome.value,
            email: sEmail.value,
            telefone: sTelefone.value,
            senha: sSenha.value
        });
    }

    setItensBD(); 
    modal.classList.remove("active");
    carregaItens(); 
    id = undefined; 
};

btnIncluir.onclick = () => {
    openModal();
}