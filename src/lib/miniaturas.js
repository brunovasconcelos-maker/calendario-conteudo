/*
 * Miniaturas para guardar no navegador.
 *
 * O arquivo original não cabe: o localStorage tem cerca de 5MB no total e o
 * base64 ainda infla um terço, então um vídeo não entra de jeito nenhum e umas
 * poucas fotos já estouram. O que os dois cards do Figma mostram é justamente
 * uma miniatura, então é ela que fica guardada.
 *
 * De vídeo, o que se guarda é um quadro — o "video thumbnail/frame" do
 * próprio desenho.
 */
const LADO_MAXIMO = 480
const QUALIDADE = 0.8

function desenhar(fonte, largura, altura) {
  const escala = Math.min(1, LADO_MAXIMO / Math.max(largura, altura))
  const tela = document.createElement('canvas')
  tela.width = Math.max(1, Math.round(largura * escala))
  tela.height = Math.max(1, Math.round(altura * escala))
  tela.getContext('2d').drawImage(fonte, 0, 0, tela.width, tela.height)
  return tela.toDataURL('image/jpeg', QUALIDADE)
}

function deImagem(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(desenhar(img, img.naturalWidth, img.naturalHeight))
    img.onerror = () => resolve(null)
    img.src = url
  })
}

/*
 * Um quadro do vídeo. Procura um instante já com imagem em vez do zero
 * absoluto, que às vezes vem preto. Arquivo que o navegador não decodifica
 * devolve null, e o card mostra a moldura vazia em vez de quebrar.
 */
function deVideo(url) {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    let encerrado = false

    const terminar = (valor) => {
      if (encerrado) return
      encerrado = true
      video.removeAttribute('src')
      resolve(valor)
    }

    video.muted = true
    video.playsInline = true
    video.preload = 'metadata'
    video.onloadeddata = () => {
      try {
        video.currentTime = Math.min(0.1, (video.duration || 1) / 10)
      } catch {
        terminar(null)
      }
    }
    video.onseeked = () => {
      try {
        terminar(desenhar(video, video.videoWidth, video.videoHeight))
      } catch {
        terminar(null)
      }
    }
    video.onerror = () => terminar(null)
    // Rede de segurança: sem isso um arquivo que nunca dispara evento deixaria
    // o salvamento pendurado para sempre.
    setTimeout(() => terminar(null), 4000)
    video.src = url
  })
}

export async function gerarMiniaturas(itens) {
  return Promise.all(
    itens.map(async (item) => ({
      tipo: item.tipo,
      nome: item.nome,
      thumb: item.tipo === 'video' ? await deVideo(item.url) : await deImagem(item.url),
    })),
  )
}
