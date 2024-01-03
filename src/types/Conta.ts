import { GrupoTransacao } from "./GrupoTransacao.js";
import { ResumoTransacoes } from "./ResumoTransacoes.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

//"getItem" pode retornar "null", então usasse "||" para caso seja "null" atribuir 0 ao saldo.
let saldo: number = JSON.parse(localStorage.getItem("saldo") || '0');

//Transforma o texto em JSON para ser reconhecido pelo JavaScript e consequentemente transformado em um array de Transacoes.
//Como Transacao tem um campo "data" que é um objeto "Date", precisamos converter.
//"getItem" pode retornar "null", então usasse "||" para caso seja "null" criar um array vazio "[]".
const transacoes: Transacao[] = JSON.parse(localStorage.getItem('transacoes') || '[]', (key: string, value: string) => {
  if (key === 'data') {
    return new Date(value);
  }

  return value;
});

function debitar(valor: number) {
  if (valor <= 0) {
    throw new Error('O valor deve ser maior que 0');
  }

  if (valor > saldo) {
    throw new Error('Saldo insuficiente');
  }

  saldo -= valor;
  localStorage.setItem('saldo', saldo.toString());
}

function depositar(valor: number) {
  if (valor <= 0) {
    throw new Error('O valor deve ser maior que 0');
  }
  saldo += valor;
  localStorage.setItem('saldo', saldo.toString());
}

const Conta = {
  getSaldo(): number {
    return saldo;
  },

  getDataAcesso(): Date {
    return new Date();
  },

  getGrupoTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTransacoes: Transacao[] = transacoes   //Cria um clone do objeto "transacoes" em vez de somente criar uma referencia ao objeto
    const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
    let dataAtualGrupoTransacao: string = "";

    for (let transacao of transacoesOrdenadas) {
      let dataGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
      if (dataAtualGrupoTransacao !== dataGrupoTransacao) {
        dataAtualGrupoTransacao = dataGrupoTransacao;
        gruposTransacoes.push({
          data: dataGrupoTransacao,
          transacoes: []
        });
      }
      gruposTransacoes[gruposTransacoes.length - 1].transacoes.push(transacao);
    }

    return gruposTransacoes;
  },

  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
      depositar(novaTransacao.valor);
    } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
      debitar(novaTransacao.valor);
      novaTransacao.valor *= -1;                                    //Faz o número ficar negativo para aparecer o sinal de menos 
    } else {
      throw new Error('Tipo de Transação inválida');
    }

    transacoes.push(novaTransacao);
    console.log(this.getGrupoTransacoes());
    console.log(this.getResumoTransacoes());
    localStorage.setItem('transacoes', JSON.stringify(transacoes)); //Converte para JSON
  },

  getResumoTransacoes(): ResumoTransacoes {

    const resumo: ResumoTransacoes = {
      quantidadeDepositos: 0,
      totalDepositos: 0,
      quantidadeTransferencias: 0,
      totalTransferencias: 0,
      quantidadePagBoletos: 0,
      totalPagamentosBoleto: 0
    };

    for (let transacao of transacoes) {
      switch (transacao.tipoTransacao) {
        case TipoTransacao.DEPOSITO:
          resumo.quantidadeDepositos++;
          resumo.totalDepositos += transacao.valor;
          break;

        case TipoTransacao.TRANSFERENCIA:
          resumo.quantidadeTransferencias++;
          resumo.totalTransferencias += transacao.valor;
          break;

        case TipoTransacao.PAGAMENTO_BOLETO:
          resumo.quantidadePagBoletos++;
          resumo.totalPagamentosBoleto += transacao.valor;
          break;
      }
    }

    return resumo;
  }
}

export default Conta;