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
}
const conta = new Conta('Jorge');
export default conta;
