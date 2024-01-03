import Conta from "../types/Conta.js";
import { formatarMoeda } from "../utils/formatters.js";
const elementoResumoTransacoesItem = document.querySelector('.resumo-transacoes .resumo-item');
renderizarResumo();
function renderizarResumo() {
    const resumo = Conta.getResumoTransacoes();
    elementoResumoTransacoesItem.innerHTML = '';
    if (resumo.temResumo) {
        elementoResumoTransacoesItem.innerHTML = `
        <span class="resumo-titulo">Resumo das Transações</span>
        <div>Total Depósitos: <span>${formatarMoeda(resumo.totalDepositos)}</span></div> 
        <div>Total Transferências: <span>${formatarMoeda(resumo.totalTransferencias)}</span></div> 
        <div>Total Pag. Boletos: <span>${formatarMoeda(resumo.totalPagamentosBoleto)}</span></div> 
      `;
    }
}
const ResumoComponent = {
    atualizar() {
        renderizarResumo();
    }
};
export default ResumoComponent;
