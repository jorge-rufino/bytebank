function formatarMoeda(valor: number) : string {
  return valor.toLocaleString('pt-br', { style: 'currency', currency:'BRL'});
}

function formatarData(data: Date, formato: FormatoData = FormatoData.PADRAO) : string {

  // Segunda-feira, 01/12/2023
  if(formato === FormatoData.DIA_SEMANA__DIA_MES_ANO){
    return data.toLocaleDateString('pt-br', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // 01/12
  else if (formato === FormatoData.DIA_MES){
    return data.toLocaleDateString('pt-br', {
      day: '2-digit',
      month: '2-digit'
    });
  }

  // Segunda-feira, 01 de Dezembro de 2023
  else if(formato === FormatoData.DIA_SEMANA__DIA_MES_ANO__ANO){
    return data.toLocaleDateString('pt-br', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  // 01/12/2023
  else {
    return data.toLocaleDateString('pt-br');
  }
}