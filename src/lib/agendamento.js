import { DIAS_DA_SEMANA, DIAS_DA_SEMANA_LONGOS, MESES } from './datas.js'

const doisDigitos = (n) => String(n).padStart(2, '0')

/*
 * O valor de um <input type="date">, que é sempre AAAA-MM-DD — e montado à mão
 * a partir das partes locais, porque toISOString converte para UTC e vira o dia
 * anterior para quem está a oeste de Greenwich.
 */
export function paraCampoDeData(data) {
  return `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}-${doisDigitos(data.getDate())}`
}

export function paraCampoDeHora(data) {
  return `${doisDigitos(data.getHours())}:${doisDigitos(data.getMinutes())}`
}

/*
 * O horário que o campo já traz: uma hora à frente de agora, arredondada para a
 * próxima meia hora. O arredondamento só soma, então a folga de uma hora que o
 * pedido pede continua garantida.
 */
export function horarioSugerido(agora = new Date()) {
  const data = new Date(agora.getTime() + 60 * 60 * 1000)
  const sobra = data.getMinutes() % 30

  if (sobra !== 0) data.setMinutes(data.getMinutes() + (30 - sobra))
  data.setSeconds(0, 0)

  return data
}

/*
 * "11 Agosto 2026", como o Figma escreve. Os campos são nativos e mostram a
 * data no formato do navegador; esta forma é para o aviso de confirmação.
 */
export function dataPorExtenso(valorDoCampo, valorDaHora) {
  const [ano, mes, dia] = valorDoCampo.split('-').map(Number)
  return `${dia} ${MESES[mes - 1]} ${ano} às ${valorDaHora}`
}

/*
 * "QUA, 12 de Agosto de 2026" — a linha do detalhe do post (node 6023:7390).
 * O dia da semana sai do próprio Date, e não de conta com o dia do mês, para
 * não errar em ano bissexto nem na virada de mês.
 */
export function diaPorExtenso(valorDoCampo) {
  const [ano, mes, dia] = valorDoCampo.split('-').map(Number)
  const quando = new Date(ano, mes - 1, dia)
  return `${DIAS_DA_SEMANA[quando.getDay()].toUpperCase()}, ${dia} de ${MESES[mes - 1]} de ${ano}`
}

/*
 * "Quarta-feira, 12 de Agosto, 2026" — a linha das métricas (node 6023:6641),
 * com o dia da semana escrito por inteiro e a vírgula antes do ano, como o
 * Figma escreve ali.
 */
export function diaPorExtensoLongo(valorDoCampo) {
  const [ano, mes, dia] = valorDoCampo.split('-').map(Number)
  const quando = new Date(ano, mes - 1, dia)
  return `${DIAS_DA_SEMANA_LONGOS[quando.getDay()]}, ${dia} de ${MESES[mes - 1]}, ${ano}`
}
