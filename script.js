//Exibir lista de clientes no banco de dados (CrudCrud)
const clientes = document.getElementById("listagemClientes");
//Busca a listagem de usuários no banco de dados
fetch("https://crudcrud.com/api/4fa4bf41f7bf4246ad70da372a3aa967/clientes")
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
        lista.innerHTML = `${cadastro.nome} - ${cadastro.email} <button>X</button>`;
//introduzindo elemento cliente manipulando DOM na variavel lista
        clientes.appendChild(lista); 
    });
})
.catch(error => {
    console.error("Ocorreu erro:", error);
})
