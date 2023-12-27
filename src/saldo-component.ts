let saldo: number = 3000;

const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;  //Pega o elemento da classe ".valor" que está dentro de ".saldo-valor"
const elementoDataAcesso = document.querySelector('.block-saldo time') as HTMLElement;

if(elementoSaldo !=  null){

  elementoSaldo.textContent = formatarMoeda(saldo);
}

if(elementoDataAcesso != null) {
  const dataAcesso = new Date();

  elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA__DIA_MES_ANO);
}