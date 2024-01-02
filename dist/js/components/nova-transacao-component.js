import SaldoComponent from "./saldo-component.js";
import Conta from "../types/Conta.js";
const elementoFormulario = document.querySelector('.block-nova-transacao form'); //Pega o "form" que está dentro da classe ".block-nova-transacao"
//Adciona um evento para toda vez que submeter o formulario, ter acesso as informações
elementoFormulario.addEventListener('submit', function (event) {
    try {
        //Toda vez que submete um formulario, ele recarrega a página, essa linha preveni isso   
        event.preventDefault();
        const inputTipoTransacao = elementoFormulario.querySelector('#tipoTransacao');
        const inputValor = elementoFormulario.querySelector('#valor');
        const inputData = elementoFormulario.querySelector('#data');
        //Tipando as variaveis
        let tipoTransacao = inputTipoTransacao.value; //Converte o valor do input em "TipoTransacao"
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value);
        //Se os elementos não tiverem preenchidos ou se o valor for 0
        if (!elementoFormulario.checkValidity() || valor == 0) {
            alert('Por favor, preencha todos os campos da transação');
            return; //Somente para parar a função
        }
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        };
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        elementoFormulario.reset(); //Reseta o formulario
    }
    catch (erro) {
        if (erro instanceof Error) {
            alert(erro.message);
        }
    }
});
