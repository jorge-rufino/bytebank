import { TipoTransacao } from "./TipoTransacao.js";
export class Conta {
    nome;
    saldo = JSON.parse(localStorage.getItem('saldo') || '0');
    transacoes = JSON.parse(localStorage.getItem('transacoes') || '[]', (key, value) => {
        if (key === 'data') {
            return new Date(value);
        }
        return value;
    });
    constructor(nome) {
        this.nome = nome;
    }
    getGrupoTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(this.transacoes); //Cria um clone do objeto "transacoes" em vez de somente criar uma referencia ao objeto
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
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1; //Faz o número ficar negativo para aparecer o sinal de menos 
        }
        else {
            throw new Error('Tipo de Transação inválida');
        }
        this.transacoes.push(novaTransacao);
        console.log(this.getGrupoTransacoes());
        //console.log(this.getResumoTransacoes());
        localStorage.setItem('transacoes', JSON.stringify(this.transacoes)); //Converte para JSON
    }
    debitar(valor) {
        if (valor <= 0) {
            throw new Error('O valor deve ser maior que 0');
        }
        if (valor > this.saldo) {
            throw new Error('Saldo insuficiente');
        }
        this.saldo -= valor;
        localStorage.setItem('saldo', this.saldo.toString());
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error('O valor deve ser maior que 0');
        }
        this.saldo += valor;
        localStorage.setItem('saldo', this.saldo.toString());
    }
    getResumoTransacoes() {
        const resumo = {
            quantidadeDepositos: 0,
            totalDepositos: 0,
            quantidadeTransferencias: 0,
            totalTransferencias: 0,
            quantidadePagBoletos: 0,
            totalPagamentosBoleto: 0
        };
        for (let transacao of this.transacoes) {
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
    getSaldo() {
        return this.saldo;
    }
    getDataAcesso() {
        return new Date();
    }
}
const conta = new Conta('Jorge');
export default conta;
