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
  stories: {
    titulo: 'Novo Stories',
    comportamento: MIDIA,
    aceita: 'ambos',
    chamada: 'o arquivo',
  },
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

export const TOTAL_DE_ETAPAS = 3
