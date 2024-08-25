//seleção dos butões---------
const buttonEnter = document.querySelector("#button-ent")
const buttonAnt = document.querySelector("#button-anterior")
const buttonAudio = document.querySelector("#button-audio")
const buttonNext = document.querySelector("#button-next")
//seleção das caracteristicas do pokemon "divs do html"-------------------
const card = document.querySelector(".card")
const nomeNoCard = document.querySelector(".nome-no-card")
const pokemon = document.querySelector(".pokemon")
const move1 = document.querySelector("#move1")
const move2 = document.querySelector("#move2")
const move3 = document.querySelector("#move3")
const move4 = document.querySelector("#move4")
//o num serve pra deixar aparecendo o primeiro pokemon da lista pra deixar bonito
let num = 1
//dados da API------------------------------------------
const promiseDosPokemons = await fetch("https://pokeapi.co/api/v2/pokemon/"+num);
const dadosDoPokemon = await promiseDosPokemons.json();
console.log(dadosDoPokemon)
//aqui eu pego o src o nome e o id pelo caminha pra amostrar na tela-----------------
pokemon.src = dadosDoPokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
nomeNoCard.textContent = dadosDoPokemon.id + "-" + dadosDoPokemon.name
//aqui eu pego os movimentos do pokemon a amostra de acordo com o caminho-----------
move1.textContent = dadosDoPokemon['moves']['0']['move']['name']
move2.textContent = dadosDoPokemon['moves']['1']['move']['name']
move3.textContent = dadosDoPokemon['moves']['2']['move']['name']
move4.textContent = dadosDoPokemon['moves']['3']['move']['name']
//-------------------------------------

let novoNum = dadosDoPokemon.id

//functions que serão chamadas------------------------------------------------------------------------------------------------------
function criarMovimentos(dadosDoPokemon) {
    if(dadosDoPokemon.moves.length >= 4){
        move1.style.display = "flex"
        move2.style.display = "flex"
        move3.style.display = "flex"
        move4.style.display = "flex"
        move1.textContent = dadosDoPokemon['moves']['0']['move']['name']
        move2.textContent = dadosDoPokemon['moves']['1']['move']['name']
        move3.textContent = dadosDoPokemon['moves']['2']['move']['name']
        move4.textContent = dadosDoPokemon['moves']['3']['move']['name']
    }
    if(dadosDoPokemon.moves.length == 3){
        move1.style.display = "flex"
        move2.style.display = "flex"
        move3.style.display = "flex"
        move1.textContent = dadosDoPokemon['moves']['0']['move']['name']
        move2.textContent = dadosDoPokemon['moves']['1']['move']['name']
        move3.textContent = dadosDoPokemon['moves']['2']['move']['name']
        move4.style.display = "none"
    }
    if(dadosDoPokemon.moves.length == 2){
        move1.style.display = "flex"
        move2.style.display = "flex"
        move1.textContent = dadosDoPokemon['moves']['0']['move']['name']
        move2.textContent = dadosDoPokemon['moves']['1']['move']['name']
        move3.style.display = "none"
        move4.style.display = "none"
    }
    if(dadosDoPokemon.moves.length == 1){
        move1.style.display = "flex"
        move1.textContent = dadosDoPokemon['moves']['0']['move']['name']
        move2.style.display = "none"
        move3.style.display = "none"
        move4.style.display = "none"
    }
}

async function dadosDaApi(numero) {
    const promiseDosPokemons = await fetch("https://pokeapi.co/api/v2/pokemon/"+numero);
    const dadosDoPokemon = await promiseDosPokemons.json();

    //aqui estou pegando a imagem, nome e o id do pokemon de acordo com o caminho descrito
    pokemon.src = dadosDoPokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    nomeNoCard.textContent = dadosDoPokemon.id + "-" + dadosDoPokemon.name

    //moves-----------------------------------------
    criarMovimentos(dadosDoPokemon)
    //audio --------------------------------------
    tocarAudio(dadosDoPokemon)
    //------------------------------------

    //aqui eu estou modificando o "novoNum" pra pegar o id exato do pokemon atual pra fazer a função "proximo" e "anterior" pegar o proximo numero e o numero anterior
    novoNum = dadosDoPokemon.id
}

function tocarAudio (ola){
    new Audio(ola.cries.latest).play()
    console.log("oi")
}
//----------------------------------------------------------------------------------------------------------------------------------

//funcões que detectam o click de um botão -----------------------------------------------------------------------------------------


async function executar(evento) {
    console.log(evento)
    if(evento.target.id == "button-ent"){
        const pesquisa = document.getElementById("pesquisa").value
        //aqui eu estou pegando os dados da API
        dadosDaApi(pesquisa)
    }
    let tecla = evento.key
    if(tecla == "Enter"){
        const pesquisa = document.getElementById("pesquisa").value
        dadosDaApi(pesquisa)
    } 
}


function proximoEAnterior (evento){
    if(evento.target.id == "button-anterior"){
        if(novoNum > 1) {
            //faça a subtração do novoNum menos um "novoNum é o id"----------------
            novoNum-=1
            //aqui eu estou pegando os dados da API
            dadosDaApi(novoNum)
        }
    }
    if(evento.target.id == "button-next"){
        if(novoNum >= 1) {
            //faça a soma do novoNum mais um "novoNum é o id"----------------
            novoNum+=1
            //aqui eu estou pegando os dados da API
            dadosDaApi(novoNum)
        }
    }
}

//aqui eu estou adicionando um evento de click nos botões pra que eles executem as funções quando clicados
buttonAnt.addEventListener("click", proximoEAnterior)
buttonNext.addEventListener("click", proximoEAnterior)

buttonEnter.addEventListener("click", executar)
addEventListener("keydown", executar)
//buttonAudio.addEventListener("click", tocarAudio)