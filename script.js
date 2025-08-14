//Exibir lista de clientes no banco de dados (CrudCrud)
const clientes = document.getElementById("listagemClientes");
//Busca a listagem de usuários no banco de dados
fetch("https://crudcrud.com/api/702912fd3fd44520888398b0bdde9f24/clientes")
//Converte a resposta para json
.then(response => {
//Tratativa de erro caso falha ao consultar os dados
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
//Conversão Json
    return response.json();
})
.then(listaDeClientes => {

    listaDeClientes.forEach(cadastro => {
        const lista = document.createElement("li");
//Definição do novo conteudo "li", aplicação de botão no elemento
        lista.innerHTML = `${cadastro.nome} - ${cadastro.email} <button onclick: "remove(${cadastro._id})">X</button>`;
//introduzindo elemento cliente manipulando DOM na variavel lista
        clientes.appendChild(lista); 
    });
})
.catch(error => {
    console.error("Ocorreu erro:", error);
})

//Adicionando evento ao clique do botão "Cadastrar"
document.getElementById("add").addEventListener("click", () => {
//Variaveis captando valor dos campos input
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value; 
//Objeto JSON para enviar enviar ao servidor
    const cliente = {
        "nome": nome,
        "email": email
    }
//Requisição POST para enviar objeto JSON ao banco de dados
    fetch('https://crudcrud.com/api/702912fd3fd44520888398b0bdde9f24/clientes',{
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(cliente)
        })
    .then(response => response.json())
    .then((cadastro) => {
        const lista = document.createElement("li");
//Definição do novo conteudo "li", aplicação de botão no elemento
        lista.innerHTML = `${cadastro.nome} - ${cadastro.email} <button onclick: "remove(${cadastro._id})">X</button>`;
//introduzindo elemento cliente manipulando DOM na variavel lista
        clientes.appendChild(lista); 
    })
});

//Função de deletar usuário
function remove(id) {
    //Requisição de API passando o id do usuário    
    fetch(`https://crudcrud.com/api/702912fd3fd44520888398b0bdde9f24/clientes/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        // Remover o elemento do DOM também
        document.getElementById(id).remove();
    })
    //tratativa de erro
    .catch(error => console.error("Erro ao deletar:", error));
}
