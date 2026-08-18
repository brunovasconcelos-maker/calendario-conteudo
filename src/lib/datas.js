/*
 * Contas de data do calendário. Sem biblioteca: é só semana e mês, e o Date
 * nativo dá conta. A semana começa no domingo, como no Figma.
 */

export const DIAS_DA_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

// Por extenso, para as linhas de texto — o cabeçalho da grade continua com as
// abreviações, que são o que cabe na coluna.
export const DIAS_DA_SEMANA_LONGOS = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

// Meia-noite local. Comparar dia com dia sem zerar a hora escorrega conforme
// a hora em que a página é aberta.
export function diaLimpo(data) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate())
}

export function somaDias(data, dias) {
  const nova = diaLimpo(data)
  nova.setDate(nova.getDate() + dias)
  return nova
}

// Cai sempre no dia 1. Somar mês a partir de um dia 31 estouraria: 31 de
// março mais um mês viraria 1º de maio, pulando abril inteiro.
export function somaMeses(data, meses) {
  return new Date(data.getFullYear(), data.getMonth() + meses, 1)
}

export function inicioDaSemana(data) {
  const limpa = diaLimpo(data)
  return somaDias(limpa, -limpa.getDay())
}

export function mesmoDia(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function semanaDe(data) {
  const inicio = inicioDaSemana(data)
  return Array.from({ length: 7 }, (_, i) => somaDias(inicio, i))
}

/*
 * As semanas que cobrem o mês, cada uma com os sete dias. A primeira e a
 * última entram inteiras, então sobram dias do mês vizinho nas pontas — é o
 * que fecha a grade, e eles aparecem apagados.
 */
export function semanasDoMes(data) {
  const ultimo = new Date(data.getFullYear(), data.getMonth() + 1, 0)
  const semanas = []
  let cursor = inicioDaSemana(new Date(data.getFullYear(), data.getMonth(), 1))

  while (cursor <= ultimo) {
    semanas.push(Array.from({ length: 7 }, (_, i) => somaDias(cursor, i)))
    cursor = somaDias(cursor, 7)
  }

  return semanas
}

/*
 * O rótulo do header. No mensal é só o mês. No semanal, quando a semana pega
 * dois meses, os dois aparecem ("Março-Abril, 2026"); e na virada do ano cada
 * mês leva o seu ano, senão não dá para saber de quem é qual.
 */
export function rotuloDoPeriodo(data, vista) {
  if (vista === 'mensal') {
    return `${MESES[data.getMonth()]}, ${data.getFullYear()}`
  }

  const dias = semanaDe(data)
  const inicio = dias[0]
  const fim = dias[6]

  if (inicio.getFullYear() !== fim.getFullYear()) {
    return (
      `${MESES[inicio.getMonth()]}, ${inicio.getFullYear()}` +
      `-${MESES[fim.getMonth()]}, ${fim.getFullYear()}`
    )
  }

  if (inicio.getMonth() !== fim.getMonth()) {
    return `${MESES[inicio.getMonth()]}-${MESES[fim.getMonth()]}, ${fim.getFullYear()}`
  }

  return `${MESES[inicio.getMonth()]}, ${inicio.getFullYear()}`
}
