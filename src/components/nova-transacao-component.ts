import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import SaldoComponent from "./saldo-component.js";
import Conta from "../types/Conta.js"; 

const elementoFormulario = document.querySelector('.block-nova-transacao form') as HTMLFormElement;  //Pega o "form" que está dentro da classe ".block-nova-transacao"

elementoFormulario.addEventListener('submit', function(event) { //Adciona um evento para toda vez que submeter o formulario, ter acesso as informações  
  event.preventDefault();                                       //Toda vez que submete um formulario, ele recarrega a página, essa linha preveni isso

  const inputTipoTransacao = elementoFormulario.querySelector('#tipoTransacao') as HTMLSelectElement;
  const inputValor = elementoFormulario.querySelector('#valor') as HTMLInputElement;
  const inputData = elementoFormulario.querySelector('#data') as HTMLInputElement;

  //Tipando as variaveis
  let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao; //Converte o valor do input em "TipoTransacao"
  let valor: number = inputValor.valueAsNumber;
  let data: Date =  new Date (inputData.value);
  
  //Se os elementos não tiverem preenchidos ou se o valor for 0
  if (!elementoFormulario.checkValidity() || valor == 0){
    alert('Por favor, preencha todos os campos da transação');        
    return;                                                     //Somente para parar a função
  }

  const novaTransacao: Transacao = {
    tipoTransacao: tipoTransacao,
    valor: valor,
    data: data
  }
  
  Conta.registrarTransacao(novaTransacao);
  SaldoComponent.atualizar();

  elementoFormulario.reset();                                 //Reseta o formulario
});