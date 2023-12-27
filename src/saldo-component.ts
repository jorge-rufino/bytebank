let saldo = 3000;

const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;  //Pega o elemento da classe ".valor" que está dentro de ".saldo-valor"

if(elementoSaldo !=  null){
  elementoSaldo.textContent = saldo.toString();
}