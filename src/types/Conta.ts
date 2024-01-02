import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo: number = 3000;

function debitar(valor: number){
  if(valor <= 0){
    throw new Error('O valor deve ser maior que 0');
  }

  if(valor > saldo){
    throw new Error('Saldo insuficiente');
  }

  saldo -= valor;
}

function depositar(valor: number){
  if(valor <= 0){
    throw new Error('O valor deve ser maior que 0');
  }
  saldo += valor;
}

const Conta = {
  getSaldo() : number {
    return saldo;
  },

  getDataAcesso() : Date {
    return new Date();
  },

  registrarTransacao(novaTransacao: Transacao ) : void {
    if(novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO){
      depositar(novaTransacao.valor)
    } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO){
      debitar(novaTransacao.valor)
    } else {
      throw new Error('Tipo de Transação inválida');      
    }

    console.log(novaTransacao);
  }
}

export default Conta;