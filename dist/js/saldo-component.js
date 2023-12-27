"use strict";
let saldo = 3000;
const elementoSaldo = document.querySelector('.saldo-valor .valor'); //Pega o elemento da classe ".valor" que está dentro de ".saldo-valor"
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (elementoSaldo != null) {
    //Formata o Saldo em estilo de moeda Brasileira
    elementoSaldo.textContent = saldo.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' });
}
if (elementoDataAcesso != null) {
    const dataAcesso = new Date();
    //Se passarmos somente o "pt-br", ele irá utilizar somente data numerica dd/MM/aaa
    elementoDataAcesso.textContent = dataAcesso.toLocaleDateString('pt-br', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit', //Poderia usar "long" para deixar a data toda por extenso
        year: 'numeric'
    });
}
