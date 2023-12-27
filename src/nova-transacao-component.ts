const elementoFormulario = document.querySelector('.block-nova-transacao form') as HTMLFormElement;  //Pega o "form" que está dentro da classe ".block-nova-transacao"

elementoFormulario.addEventListener('submit', function(event) { //Adciona um evento para toda vez que submeter o formulario, ter acesso as informações  
  event.preventDefault();                                       //Toda vez que submete um formulario, ele recarrega a página, essa linha preveni isso

  const inputTipoTransacao = elementoFormulario.querySelector('#tipoTransacao') as HTMLSelectElement;
  const inputValor = elementoFormulario.querySelector('#valor') as HTMLInputElement;
  const inputData = elementoFormulario.querySelector('#data') as HTMLInputElement;

  //Tipando as variaveis
  let tipoTransacao: string = inputTipoTransacao.value;
  let valor: number = inputValor.valueAsNumber;
  let data: Date =  new Date (inputData.value);
  
  //Se os elementos não tiverem preenchidos ou se o valor for 0
  if (!elementoFormulario.checkValidity() || valor == 0){
    alert('Por favor, preencha todos os campos da transação');        
    return;                                                     //Somente para parar a função
  }

  if(tipoTransacao == 'Depósito'){
    saldo += valor;
  } else if (tipoTransacao == 'Transferência' || tipoTransacao == 'Pagamento de Boleto'){
    saldo -= valor;
  } else {
    alert('Tipo de Transação inválida');
    return;
  }

  elementoSaldo.textContent = saldo.toString();

  const novaTransacao = {
    tipoTransacao: tipoTransacao,
    valor: valor,
    data: data
  }

  console.log(novaTransacao);
  elementoFormulario.reset();                                 //Reseta o formulario
});