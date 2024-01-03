import { Transacao } from "./Transacao.js";

export type GrupoTransacao = {
  data: string;               //Mês e Ano
  transacoes: Transacao[];
}