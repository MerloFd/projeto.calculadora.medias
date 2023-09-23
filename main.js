const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji Comemoração" />'
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji Decepcionado" />'
const atividades = []; // arrays que vão armazenar os valores do input
const notas = [];

const spanAprovado = '<span class="aprovado">Aprovado</span>'; //const de resultado media final
const spanReprovado = '<span class="reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a nota miníma:')); //padronização da nota minima para cálculo


let linhas = ''; // responsavel por criar linhas novas na table (global para não levar reset do event)

form.addEventListener('submit', function(e){ //evento de quando o button do form tem um submit
    e.preventDefault();

    adicionaLinha(); //functions sendo invocadas
    atualizaTabela();
    atualizaMediaFinal()

})

function adicionaLinha(){ //faz toda a lógica por trás da tabela
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)){ //validação para o bug de atividade com o mesmo nome inserida
        alert (`Já existe uma atividade com o mesmo nome "${inputNomeAtividade.value}"`);
    }
    else {
        atividades.push(inputNomeAtividade.value); // .push adicionando os valores do input nos arrays
        notas.push(parseFloat(inputNotaAtividade.value));
    
        let linha = '<tr>'; // alimentando o tbody do HTML com interações do user
        linha += `<td>${inputNomeAtividade.value}</td>`; // valores do input
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado }</td>`; // validação com if (? :)
        linha += '</tr>';
    
        linhas += linha; //concatenando linhas (cria linhas novas) com linha (escreve o input)
    }

    inputNomeAtividade.value = ''; // apaga os valores dos campos após adicionar algo a tabela
    inputNotaAtividade.value = '';
}

function atualizaTabela(){ // passa os valores do adicionaLinha para o html via innerHTML
    const corpoTabela = document.querySelector('tbody'); // selecionando o tbody para escrever os inputs nele
    corpoTabela.innerHTML = linhas; // escrevendo o valor de linha no tbody
}


function atualizaMediaFinal(){ //passa os valores da média para o html via innerHTML
    const mediaFinal = calculaMediaFinal ();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); //escreva no campo com o id mencionado o valor obtido da string
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal (){ //faz toda a lógica por trás do calculo das medias
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++){ //looping que se repete até todo o conteudo do array notas ter sido lido
        somaDasNotas += notas[i]; // soma os valores do array. é como um notas[0] + notas[1] etc
    }

    return somaDasNotas / notas.length; // retorna a soma dos valores / pela quantia de strings no array (a média)
}