"use strict";
//Tipos Primitivos
let nome = "Jorge";
let numero = 1234;
let booleano = false;
let qualquerCoisa = "teste";
qualquerCoisa = 12345; //Tipo "any" é o padrão do Javascript, uma váriavel que pode receber qualquer coisa
//Tipo Array
//Se não definirmos o tipo no array, ele será criado como "any[]", aceitando qualquer coisa nele, inclusive valores misturados
const lista = [];
lista.push(13, 5.55, 1001, 0.589);
//Como "novaTransacao" é do tipo "Transacao", tem que seguir exatamente os nomes dos atributos e seus respectivos tipos
const novaTransacao = {
    tipoTransacao: "",
    data: new Date(),
    valor: 0
};
