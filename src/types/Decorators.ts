import { Conta } from "./Conta.js";

export function ValidaDebito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
 
  descriptor.value = function (valorDoDebito: number) {
    if (valorDoDebito <= 0) {
      throw new Error("O valor a ser debitado precisa ser maior do que zero!");
    }
    
    if (valorDoDebito > (this as Conta).getSaldo()) {
      throw new Error("Seu saldo é insuficiente para realizar a operação!");
    }

    return originalMethod.apply(this, [valorDoDebito]);
  }

  return descriptor;
}