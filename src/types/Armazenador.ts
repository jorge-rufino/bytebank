export class Armazenador{
  private constructor(){ }

  static salvar(chave: string, valor: any): void{
    const valorComoString = JSON.stringify(valor);
    localStorage.setItem(chave, valorComoString);
  }

  //Pode receber uma função opcional "reviver". Serve para fazer uma conversão do valor caso necessário.
  //Transformamos a função usando "Generics", assim podemos definir o tipo de dado que queremos no retorno. Ou a função retorna o tipo definido ou retorna "null"
  static obter<T>(chave: string, reviver?: (this: any, key: string, value: any) => any): T | null{
    const valor = localStorage.getItem(chave);

    if(valor === null){
      return null;
    }

    if(reviver){
      return JSON.parse(valor, reviver) as T;
    }

    return JSON.parse(valor) as T;
  }
}