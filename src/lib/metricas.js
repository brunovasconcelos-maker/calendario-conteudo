/*
 * Os números das métricas de um post.
 *
 * Não há analytics de verdade por trás: são sorteados a cada abertura e não
 * ficam guardados em lugar nenhum. As faixas são as do pedido — milhares nas
 * visualizações, centenas nos likes, dezenas no resto — e a ordem de grandeza
 * é o que faz a tela parecer plausível.
 *
 * Quando isto virar dado real, é este arquivo que some.
 */
const FAIXAS = {
  visualizacoes: [1200, 24000],
  likes: [120, 980],
  comentarios: [10, 99],
  compartilhamentos: [10, 99],
  salvos: [10, 99],
}

const entre = (minimo, maximo) => minimo + Math.floor(Math.random() * (maximo - minimo + 1))

export function sortearMetricas() {
  return Object.fromEntries(
    Object.entries(FAIXAS).map(([nome, [minimo, maximo]]) => [nome, entre(minimo, maximo)]),
  )
}

// 12072 vira "12.072": o ponto de milhar do português, como no Figma.
export function comSeparadorDeMilhar(numero) {
  return numero.toLocaleString('pt-BR')
}
