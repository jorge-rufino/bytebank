import Conta from "../types/Conta.js";
import { ResumoTransacoes } from "../types/ResumoTransacoes.js";
import { formatarMoeda } from "../utils/formatters.js";

const elementoResumoTransacoesItem = document.querySelector('.resumo-transacoes .resumo-item') as HTMLElement;

renderizarResumo();

function renderizarResumo(): void {
  const resumo: ResumoTransacoes = Conta.getResumoTransacoes();
  elementoResumoTransacoesItem.innerHTML = '';

  elementoResumoTransacoesItem.innerHTML = `
    <div>Total Depósitos: <span>${formatarMoeda(resumo.totalDepositos)}</span></div> 
    <div>Total Transferências: <span>${formatarMoeda(resumo.totalTransferencias)}</span></div> 
    <div>Total Pag. Boletos: <span>${formatarMoeda(resumo.totalPagamentosBoleto)}</span></div> 
  `;
} 

const ResumoComponent = {
  atualizar(): void {
    renderizarResumo();
  }
}

export default ResumoComponent;