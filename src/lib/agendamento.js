import { MESES } from './datas.js'

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
