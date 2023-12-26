var saldo = 6000;
var elementoSaldo = document.querySelector('.saldo-valor .valor'); //Pega o elemento da classe ".valor" que está dentro de ".saldo-valor"
if (elementoSaldo != null) {
    elementoSaldo.textContent = saldo.toString();
}
var elementoFormulario = document.querySelector('.block-nova-transacao form'); //Pega o "form" que está dentro da classe ".block-nova-transacao"
elementoFormulario.addEventListener('submit', function (event) {
    event.preventDefault(); //Toda vez que submete um formulario, ele recarrega a página, essa linha preveni isso
    var inputTipoTransacao = elementoFormulario.querySelector('#tipoTransacao');
    var inputValor = elementoFormulario.querySelector('#valor');
    var inputData = elementoFormulario.querySelector('#data');
    //Tipando as variaveis
    var tipoTransacao = inputTipoTransacao.value;
    var valor = inputValor.valueAsNumber;
    var data = new Date(inputData.value);
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
    var novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoFormulario.reset(); //Reseta o formulario
});
