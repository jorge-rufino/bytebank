import { TipoTransacao } from "./TipoTransacao.js";
//"getItem" pode retornar "null", então usasse "||" para caso seja "null" atribuir 0 ao saldo.
let saldo = JSON.parse(localStorage.getItem("saldo") || '0');
//Transforma o texto em JSON para ser reconhecido pelo JavaScript e consequentemente transformado em um array de Transacoes.
//Como Transacao tem um campo "data" que é um objeto "Date", precisamos converter.
//"getItem" pode retornar "null", então usasse "||" para caso seja "null" criar um array vazio "[]".
const transacoes = JSON.parse(localStorage.getItem('transacoes') || '[]', (key, value) => {
    if (key === 'data') {
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
    localStorage.setItem('saldo', saldo.toString());
}
function depositar(valor) {
    if (valor <= 0) {
        throw new Error('O valor deve ser maior que 0');
    }
    saldo += valor;
    localStorage.setItem('saldo', saldo.toString());
}
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getGrupoTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = transacoes; //Cria um clone do objeto "transacoes" em vez de somente criar uma referencia ao objeto
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let dataAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let dataGrupoTransacao = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
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
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1; //Faz o número ficar negativo para aparecer o sinal de menos 
        }
        else {
            throw new Error('Tipo de Transação inválida');
        }
        transacoes.push(novaTransacao);
        console.log(this.getGrupoTransacoes());
        console.log(this.getResumoTransacoes());
        localStorage.setItem('transacoes', JSON.stringify(transacoes)); //Converte para JSON
    },
    getResumoTransacoes() {
        const resumo = {
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
};
export default Conta;
