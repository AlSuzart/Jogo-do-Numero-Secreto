//para chamar algo no html usa esse comando, marcando a tag q quer vincular
//let titulo = document.querySelector('h1');
//para alterar faz isso
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

//usar funções para evitar repetição de código, no lugar do acima, usar:

// para adicionar elemntos na lista .push
// para verificar se elemento está incluso na lista .includes
// para remover o último elemento da lista .pop
let listaNumerosSorteados = [];
let quantidadeDePossibilidades = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
//para usar outro de voz nativo do crhome e edge(web speech api)
// if ('speechSynthesis' in window) {
//     let utterance = new SpeechSynthesisUtterance(texto);
//     utterance.lang = 'pt-BR'; 
//     utterance.rate = 1.2; 
//     window.speechSynthesis.speak(utterance); 
// } else {
//     console.log("Web Speech API não suportada neste navegador.");
// }


function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

}

exibirMensagemInicial();

//criar função
function verificarChute() {
    let chute = document.querySelector('input').value; //.value para
    //trazer o valor dentro daquele campo, nesse caso, dentro de input
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você acertou com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled'); //para habilitar o
        //botao novo jogo
        
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        } tentativas++;
        limparCampo();
    } 
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * quantidadeDePossibilidades + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == quantidadeDePossibilidades) {
        listaNumerosSorteados = [];
    }
    
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}