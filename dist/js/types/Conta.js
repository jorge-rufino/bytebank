import { TipoTransacao } from "./TipoTransacao.js";
//"getItem" pode retornar "null", então usasse "||" para caso seja "null" atribuir 0 ao saldo.
let saldo = JSON.parse(localStorage.getItem("saldo") || '0');
//Transforma o texto em JSON para ser reconhecido pelo JavaScript e consequentemente transformado em um array de Transacoes.
//Como Transacao tem um campo "data" que é um objeto "Date", precisamos converter.
//"getItem" pode retornar "null", então usasse "||" para caso seja "null" criar um array vazio "[]".
const transacoes = JSON.parse(localStorage.getItem("transacoes") || '[]', (key, value) => {
    if (key === "data") {
        return new Date(value);
    }
    return value;
});
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
        transacoes.push(novaTransacao);
        console.log(transacoes);
        localStorage.setItem('transacoes', JSON.stringify(transacoes)); //Converte para JSON
    }
};
export default Conta;
