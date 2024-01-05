import { Conta } from "./Conta.js";
import { Transacao } from "./Transacao.js";

export function ValidaDebito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // Guarda uma referência ao método original
  const originalMethod = descriptor.value;  
 
  // Substitui o método original por uma nova função, fazendo assim a validação do Saldo
  //Esta nova função recebe os mesmos parametros do método original
  descriptor.value = function (valorDoDebito: number) {
    if (valorDoDebito <= 0) {
      throw new Error("O valor a ser debitado precisa ser maior do que zero!");
    }
    
    if (valorDoDebito > (this as Conta).getSaldo()) {
      throw new Error("Seu saldo é insuficiente para realizar a operação!");
    }
    // Chama o método original com os argumentos originais e retorna o valor esperado
    return originalMethod.apply(this, [valorDoDebito]);
  }
  
  return descriptor;
}

export function ValidaDeposito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
 
  descriptor.value = function (valorDoDeposito: number) {
    if (valorDoDeposito <= 0) {
      throw new Error("O valor a ser depositado precisa ser maior do que zero!");
    }
        
    return originalMethod.apply(this, [valorDoDeposito]);
  }

  return descriptor;
}

export function ValidaDataTransacao(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
 
  descriptor.value = function (transacao: Transacao) {
    const dataAtual = new Date();
    
    if (transacao.data > dataAtual) {
      throw new Error("Não pode efetuar transação em data futura!");
    }
        
    return originalMethod.apply(this, [transacao]);
  }

  return descriptor;
}