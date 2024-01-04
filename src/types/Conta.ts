import { Armazenador } from "./Armazenador.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { ResumoTransacoes } from "./ResumoTransacoes.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
  protected nome: string;
  protected saldo: number = Armazenador.obter<number>('saldo') || 0;

  //Aqui temos um exemplo da função opcional "reviver"
  private transacoes: Transacao[] = Armazenador.obter<Transacao[]>('transacoes', (key: string, value: string) => {
    if (key === 'data') {
      return new Date(value);
    }
  
    return value;
  }) || [];

  constructor(nome: string){
    this.nome = nome;
  }

  getSaldo(): number {
    return this.saldo;
  }

  getDataAcesso(): Date {
    return new Date();
  }

  getTitular(){
    return this.nome;
  }

  getGrupoTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTransacoes: Transacao[] = structuredClone(this.transacoes)   //Cria um clone do objeto "transacoes" em vez de somente criar uma referencia ao objeto
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
  }

  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
      this.depositar(novaTransacao.valor);
    } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
      this.debitar(novaTransacao.valor);
      novaTransacao.valor *= -1;                                    //Faz o número ficar negativo para aparecer o sinal de menos 
    } else {
      throw new Error('Tipo de Transação inválida');
    }

    this.transacoes.push(novaTransacao);    
    
    Armazenador.salvar('transacoes', JSON.stringify(this.transacoes)); //Converte para JSON
  }

  private debitar(valor: number) {
    if (valor <= 0) {
      throw new Error('O valor deve ser maior que 0');
    }
  
    if (valor > this.saldo) {
      throw new Error('Saldo insuficiente');
    }
  
    this.saldo -= valor;
    Armazenador.salvar('saldo', this.saldo.toString());
  }

  private depositar(valor: number) {
    if (valor <= 0) {
      throw new Error('O valor deve ser maior que 0');
    }
    this.saldo += valor;
    Armazenador.salvar('saldo', this.saldo.toString());
  }

  getResumoTransacoes(): ResumoTransacoes {

    const resumo: ResumoTransacoes = {
      quantidadeDepositos: 0,
      totalDepositos: 0,
      quantidadeTransferencias: 0,
      totalTransferencias: 0,
      quantidadePagBoletos: 0,
      totalPagamentosBoleto: 0,
      temResumo: false
    };

    for (let transacao of this.transacoes) {
      switch (transacao.tipoTransacao) {
        case TipoTransacao.DEPOSITO:
          resumo.temResumo = true;
          resumo.quantidadeDepositos++;
          resumo.totalDepositos += transacao.valor;
          break;

        case TipoTransacao.TRANSFERENCIA:
          resumo.temResumo = true;
          resumo.quantidadeTransferencias++;
          resumo.totalTransferencias += transacao.valor;
          break;

        case TipoTransacao.PAGAMENTO_BOLETO:
          resumo.temResumo = true;
          resumo.quantidadePagBoletos++;
          resumo.totalPagamentosBoleto += transacao.valor;
          break;
      }
    }

    return resumo;
  }

}

export class ContaPremium extends Conta{
  registrarTransacao(transacao: Transacao): void {
    if(transacao.tipoTransacao === TipoTransacao.DEPOSITO){
      console.log('Você ganhou um bônus de 0.50 centavos');
      transacao.valor += 0.5;
    }

    super.registrarTransacao(transacao);
  }
}

const conta = new Conta('Jorge');
const contaPremium = new ContaPremium('Larissa');
export default conta;