"use strict";
let saldo = 3000;
const elementoSaldo = document.querySelector('.saldo-valor .valor'); //Pega o elemento da classe ".valor" que está dentro de ".saldo-valor"
if (elementoSaldo != null) {
    elementoSaldo.textContent = saldo.toString();
}
