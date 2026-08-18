import { useMemo, useState } from 'react'

/*
 * As mídias de um post salvo, no mesmo formato que o useUploads entrega ao
 * MidiaDaPrevia — assim o detalhe reaproveita a peça da etapa 3 sem que ela
 * precise saber de onde veio a imagem.
 *
 * O que está guardado é a miniatura em JPEG, inclusive a do vídeo: o arquivo
 * original não sobrevive ao recarregar a página. Por isso todo item entra como
 * imagem; marcar um deles como vídeo faria o MidiaDaPrevia montar um <video>
 * apontando para um JPEG.
 *
 * Miniatura que não deu para gerar vira item sem url, e o quadro sai vazio —
 * o mesmo que o card do calendário já faz.
 */
export function useMidiasDoPost(post) {
  const [indice, setIndice] = useState(0)

  const itens = useMemo(
    () =>
      (post?.midias ?? []).map((midia, i) => ({
        id: `${post.id}-${i}`,
        url: midia.thumb ?? '',
        nome: midia.nome ?? '',
        tipo: 'imagem',
      })),
    [post],
  )

  // O post pode ter sido trocado por outro mais curto enquanto o modal está
  // aberto (o "Postar Agora" regrava a lista), então o cursor é preso ao fim.
  const atual = Math.min(indice, Math.max(itens.length - 1, 0))

  return {
    itens,
    indice: atual,
    atual: itens[atual] ?? null,
    vazio: itens.length === 0,
    temAnterior: atual > 0,
    temProximo: atual < itens.length - 1,
    irPara: setIndice,
  }
}
