import { formatarMoeda, formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
let saldo = 3000;
const elementoSaldo = document.querySelector('.saldo-valor .valor'); //Pega o elemento da classe ".valor" que está dentro de ".saldo-valor"
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (elementoDataAcesso != null) {
    const dataAcesso = new Date();
    elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA__DIA_MES_ANO);
}
export function getSaldo() {
    return saldo;
}
//Chama a função para carregar o saldo ao abrir o site
atualizarSaldo(saldo);
//Void pois não vamos retornar nada
export function atualizarSaldo(novoSaldo) {
    saldo = novoSaldo;
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(saldo);
    }
}
