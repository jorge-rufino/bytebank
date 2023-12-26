"use strict";
let saldo = 6000;
const elementoSaldo = document.querySelector('.saldo-valor .valor'); //Pega o elemento da classe ".valor" que está dentro de ".saldo-valor"
if (elementoSaldo != null) {
    elementoSaldo.textContent = saldo.toString();
}
const elementoFormulario = document.querySelector('.block-nova-transacao form'); //Pega o "form" que está dentro da classe ".block-nova-transacao"
elementoFormulario.addEventListener('submit', function (event) {
    event.preventDefault(); //Toda vez que submete um formulario, ele recarrega a página, essa linha preveni isso
    const inputTipoTransacao = elementoFormulario.querySelector('#tipoTransacao');
    const inputValor = elementoFormulario.querySelector('#valor');
    const inputData = elementoFormulario.querySelector('#data');
    //Tipando as variaveis
    let tipoTransacao = inputTipoTransacao.value;
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    //Se os elementos não tiverem preenchidos ou se o valor for 0
    if (!elementoFormulario.checkValidity() || valor == 0) {
        alert('Por favor, preencha todos os campos da transação');
        return; //Somente para parar a função
    }
    if (tipoTransacao == 'Depósito') {
        saldo += valor;
    }
    else if (tipoTransacao == 'Transferência' || tipoTransacao == 'Pagamento de Boleto') {
        saldo -= valor;
    }
    else {
        alert('Tipo de Transação inválida');
        return;
    }
    elementoSaldo.textContent = saldo.toString();
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoFormulario.reset(); //Reseta o formulario
});
