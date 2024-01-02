import { formatarMoeda, formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";

const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;  //Pega o elemento da classe ".valor" que está dentro de ".saldo-valor"
const elementoDataAcesso = document.querySelector('.block-saldo time') as HTMLElement;

if(elementoDataAcesso != null) {
  elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA__DIA_MES_ANO);
}

renderizarSaldo();

export function renderizarSaldo() : void {
  if(elementoSaldo !=  null){
    elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
  }
}

const SaldoComponent = {
  atualizar() {
    renderizarSaldo();
  }
}

export default SaldoComponent;