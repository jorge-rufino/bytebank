import { TipoTransacao } from "../types/TipoTransacao.js";
import { atualizarSaldo, getSaldo } from "./saldo-component.js";
const elementoFormulario = document.querySelector('.block-nova-transacao form'); //Pega o "form" que está dentro da classe ".block-nova-transacao"
elementoFormulario.addEventListener('submit', function (event) {
    event.preventDefault(); //Toda vez que submete um formulario, ele recarrega a página, essa linha preveni isso
    const inputTipoTransacao = elementoFormulario.querySelector('#tipoTransacao');
    const inputValor = elementoFormulario.querySelector('#valor');
    const inputData = elementoFormulario.querySelector('#data');
    //Tipando as variaveis
    let tipoTransacao = inputTipoTransacao.value; //Converte o valor do input em "TipoTransacao"
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    let saldo = getSaldo();
    //Se os elementos não tiverem preenchidos ou se o valor for 0
    if (!elementoFormulario.checkValidity() || valor == 0) {
        alert('Por favor, preencha todos os campos da transação');
        return; //Somente para parar a função
    }
    if (tipoTransacao == TipoTransacao.DEPOSITO) {
        saldo += valor;
    }
    else if (tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
        saldo -= valor;
    }
    else {
        alert('Tipo de Transação inválida');
        return;
    }
    //  elementoSaldo.textContent = formatarMoeda(saldo);
    atualizarSaldo(saldo);
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoFormulario.reset(); //Reseta o formulario
});
