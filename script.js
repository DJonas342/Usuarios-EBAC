//Exibir lista de clientes no banco de dados (CrudCrud)
const clientes = document.getElementById("listagemClientes");
//Busca a listagem de usuários no banco de dados
fetch("https://crudcrud.com/api/a3054f9a09e4408698486e0652b6b9d8/clientes")
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
        lista.id = cadastro._id;
//Definição do novo conteudo "li", aplicação de botão no elemento
        lista.textContent = `${cadastro.nome} - ${cadastro.email}`;

        const botaoX = document.createElement("button");

        botaoX.textContent = "X"
//Adicionando evento ao clique do botão X
        botaoX.addEventListener("click", ()=> remove(cadastro._id));

//introduzindo elemento cliente manipulando DOM na variavel lista
        lista.appendChild(botaoX);
        clientes.appendChild(lista); 
    });
})
.catch(error => {
    console.error("Ocorreu erro:", error);
})

//Adicionando evento ao clique do botão "Cadastrar"
document.getElementById("add").addEventListener("click", (dados) => {
    if (dados && dados.preventDefault) dados.preventDefault();
//Variaveis captando valor dos campos input
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value; 
//Objeto JSON para enviar enviar ao servidor
    const cliente = {
        "nome": nome,
        "email": email
    }
//Requisição POST para enviar objeto JSON ao banco de dados
    fetch('https://crudcrud.com/api/a3054f9a09e4408698486e0652b6b9d8/clientes',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(cliente)
        })
    .then(response => {
        if (!response.ok) 
            throw new Error(`HTTP ${response.status}`);
        return response.json();
        })
        
    .then((cadastro) => {
        const lista = document.createElement("li");
        lista.id = cadastro._id;
//Definição do novo conteudo "li", aplicação de botão no elemento
        lista.textContent = `${cadastro.nome} - ${cadastro.email}`;

        const botaoX = document.createElement("button");

        botaoX.textContent = "X"
//Adicionando evento ao clique do botão X
        botaoX.addEventListener("click", ()=> remove(cadastro._id));

//introduzindo elemento cliente manipulando DOM na variavel lista
        lista.appendChild(botaoX);
        clientes.appendChild(lista); 
    })
//Limpar valores dos campos inputs
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
});

//Evento de deletar usuário
function remove(id) {
    //Requisição de API passando o id do usuário    
    fetch(`https://crudcrud.com/api/a3054f9a09e4408698486e0652b6b9d8/clientes/${id}`, {
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
