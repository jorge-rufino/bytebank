export class Armazenador{
  private constructor(){ }

  static salvar(chave: string, valor: any): void{
    const valorComoString = JSON.stringify(valor);
    localStorage.setItem(chave, valorComoString);
  }

  //Pode receber uma função opcional "reviver". Serve para fazer uma conversão do valor caso necessário.
  static obter(chave: string, reviver?: (this: any, key: string, value: any) => any){
    const valor = localStorage.getItem(chave);

    if(valor === null){
      return null;
    }

    if(reviver){
      return JSON.parse(valor, reviver);
    }

    return JSON.parse(valor);
  }
}