//Tipos Primitivos
let nome: string = "Jorge";
let numero: number = 1234;
let booleano: boolean = false;
let qualquerCoisa: any = "teste";
qualquerCoisa = 12345;            //Tipo "any" é o padrão do Javascript, uma váriavel que pode receber qualquer coisa

//Tipo Array
//Se não definirmos o tipo no array, ele será criado como "any[]", aceitando qualquer coisa nele, inclusive valores misturados

const lista: number[] = [];
lista.push(13,5.55,1001,0.589);

//Tipo Personalizado (Type alias)
type Transacao = {
  tipoTransacao: TipoTransacao;
  data: Date;
  valor: number;
}

//Enum (Percebe que Enum não tem o simbolo de "=")
enum TipoTransacao {
  DEPOSITO = "Depósito",
  TRANSFERENCIA = "Transferência",
  PAGAMENTO_BOLETO = "Pagamento de Boleto"
}

//Como "novaTransacao" é do tipo "Transacao", tem que seguir exatamente os nomes dos atributos e seus respectivos tipos
const novaTransacao: Transacao = {
  tipoTransacao: TipoTransacao.DEPOSITO,
  data: new Date(),
  valor: 0
}

