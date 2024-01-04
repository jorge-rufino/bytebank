export class Armazenador {
    constructor() { }
    static salvar(chave, valor) {
        const valorComoString = JSON.stringify(valor);
        localStorage.setItem(chave, valorComoString);
    }
    //Pode receber uma função opcional "reviver". Serve para fazer uma conversão do valor caso necessário.
    //Transformamos a função usando "Generics", assim podemos definir o tipo de dado que queremos no retorno. Ou a função retorna o tipo definido ou retorna "null"
    static obter(chave, reviver) {
        const valor = localStorage.getItem(chave);
        if (valor === null) {
            return null;
        }
        if (reviver) {
            return JSON.parse(valor, reviver);
        }
        return JSON.parse(valor);
    }
}
