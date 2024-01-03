import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";
const elementoRegistroTransacaoesExtrato = document.querySelector('.extrato .registro-transacoes');
renderizarExtrato();
function renderizarExtrato() {
    const grupoTransacoes = Conta.getGrupoTransacoes();
    elementoRegistroTransacaoesExtrato.innerHTML = ''; //Limpa todo o Html
    let htmlRegistroTransacoes = '';
    for (let grupoTransacao of grupoTransacoes) {
        let htmlTransacaoItem = '';
        for (let transacao of grupoTransacao.transacoes) {
            htmlTransacaoItem += `
        <div class="transacao-item">
          <div class="transacao-info">
              <span class="tipo">${transacao.tipoTransacao}</span>
              <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
          </div>
        <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
        </div>
      `;
        }
        htmlRegistroTransacoes += `
      <div class="transacoes-group">
        <strong class="mes-group">${grupoTransacao.data}</strong>
        ${htmlTransacaoItem}
      </div>
    `;
    }
    if (htmlRegistroTransacoes === '') {
        htmlRegistroTransacoes = '<div">Não há transações registradas.</div>';
    }
    elementoRegistroTransacaoesExtrato.innerHTML = htmlRegistroTransacoes;
}
const ExtratoComponent = {
    atualizar() {
        renderizarExtrato();
    }
};
export default ExtratoComponent;
