import { TipoTransacao } from "./TipoTransacao.js";
let saldo = 3000;
function debitar(valor) {
    if (valor <= 0) {
        throw new Error('O valor deve ser maior que 0');
    }
    if (valor > saldo) {
        throw new Error('Saldo insuficiente');
    }
    saldo -= valor;
}
function depositar(valor) {
    if (valor <= 0) {
        throw new Error('O valor deve ser maior que 0');
    }
    saldo += valor;
}
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
        }
        else {
            throw new Error('Tipo de Transação inválida');
        }
        console.log(novaTransacao);
    }
};
export default Conta;
