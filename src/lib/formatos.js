import { PLATAFORMAS } from './plataformas.js'

/*
 * O que cada formato faz na etapa de upload. São nove caminhos
 * (/novo-post/:plataforma/:formato), mas só quatro comportamentos por baixo —
 * a chave aqui é o formato, que se repete entre plataformas: o carrossel do
 * Instagram, do Tiktok e do Linkedin é o mesmo.
 */
export const IMAGEM_UNICA = 'imagem-unica'
export const CARROSSEL = 'carrossel'
export const VIDEO = 'video'
export const MIDIA = 'midia' // imagem ou vídeo, o que vier

const ACEITA = {
  imagem: {
    accept: 'image/png,image/jpeg',
    linha: 'Você pode adicionar arquivos PNG ou JPG.',
  },
  video: {
    accept: 'video/mp4,video/quicktime',
    linha: 'Você pode adicionar arquivos MP4 ou MOV.',
  },
  ambos: {
    accept: 'image/png,image/jpeg,video/mp4,video/quicktime',
    linha: 'Você pode adicionar arquivos PNG, JPG, MP4 ou MOV.',
  },
}

/*
 * O "arraste a logo pra cá" das telas de imagem é o texto do próprio Figma.
 * As telas de vídeo e de Stories seguem a mesma frase trocando o objeto.
 */
const FORMATOS = {
  'post-unico': {
    titulo: 'Novo Post Único',
    comportamento: IMAGEM_UNICA,
    aceita: 'imagem',
    chamada: 'a logo',
  },
  carrossel: {
    titulo: 'Novo Carrossel',
    comportamento: CARROSSEL,
    aceita: 'imagem',
    chamada: 'a logo',
  },
  // O Figma nomeia a tela do Instagram de "Novo Reel"; o vídeo do Tiktok e do
  // Linkedin usa o mesmo comportamento com o título no genérico.
  reels: {
    titulo: 'Novo Reel',
    comportamento: VIDEO,
    aceita: 'video',
    chamada: 'o vídeo',
  },
  video: {
    titulo: 'Novo Vídeo',
    comportamento: VIDEO,
    aceita: 'video',
    chamada: 'o vídeo',
  },
  // O Stories pula a legenda e vai do upload direto para a revisão, então o
  // fluxo dele tem duas etapas, e não três.
  stories: {
    titulo: 'Novo Stories',
    comportamento: MIDIA,
    aceita: 'ambos',
    chamada: 'o arquivo',
    semLegenda: true,
  },
}

/*
 * As etapas na ordem, por nome. O nome é o que vai na URL, e não o número:
 * a revisão é a etapa 3 em quase todo formato, mas a 2 no Stories, e um
 * /etapa-3 que às vezes é a segunda tela seria confuso de ler.
 */
const COM_LEGENDA = ['upload', 'legenda', 'revisao']
const SEM_LEGENDA = ['upload', 'revisao']

export function etapasDoFormato(formato) {
  return formato.semLegenda ? SEM_LEGENDA : COM_LEGENDA
}

// O número da etapa, contando de 1, e quantas são no total desse formato.
export function posicaoDaEtapa(formato, nome) {
  const etapas = etapasDoFormato(formato)
  return { numero: etapas.indexOf(nome) + 1, total: etapas.length }
}

// A etapa seguinte, ou null quando não há — hoje a revisão é sempre a última.
export function proximaEtapa(formato, nome) {
  const etapas = etapasDoFormato(formato)
  return etapas[etapas.indexOf(nome) + 1] ?? null
}

export function etapaAnterior(formato, nome) {
  const etapas = etapasDoFormato(formato)
  return etapas[etapas.indexOf(nome) - 1] ?? null
}

/*
 * A URL de uma etapa. O upload é a rota-índice do fluxo, então ele é a própria
 * raiz — /novo-post/:plataforma/:formato/upload não existe.
 */
export function caminhoDaEtapa(raiz, nome) {
  return nome === 'upload' ? raiz : `${raiz}/${nome}`
}

/*
 * O nome curto do formato, para os cards do calendário — "Novo Post Único" é
 * título de tela, e no card entra só "Post Único".
 */
const ROTULOS_CURTOS = {
  'post-unico': 'Post Único',
  carrossel: 'Carrossel',
  reels: 'Reels',
  video: 'Vídeo',
  stories: 'Stories',
}

export function rotuloCurtoDoFormato(idFormato) {
  return ROTULOS_CURTOS[idFormato] ?? idFormato
}

/*
 * Devolve o formato só quando o par plataforma/formato existe de verdade —
 * /novo-post/tiktok/stories, por exemplo, não existe, e cai fora.
 */
export function acharFormato(idPlataforma, idFormato) {
  const plataforma = PLATAFORMAS[idPlataforma]
  if (!plataforma) return null

  const daPlataforma = plataforma.formatos.some((f) => f.id === idFormato)
  if (!daPlataforma) return null

  const formato = FORMATOS[idFormato]
  if (!formato) return null

  return { ...formato, ...ACEITA[formato.aceita], plataforma }
}
