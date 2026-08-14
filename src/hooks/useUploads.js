import { useCallback, useEffect, useRef, useState } from 'react'

let proximoId = 0

function paraItem(arquivo) {
  return {
    id: (proximoId += 1),
    url: URL.createObjectURL(arquivo),
    tipo: arquivo.type.startsWith('video/') ? 'video' : 'imagem',
    nome: arquivo.name,
  }
}

/*
 * Os arquivos anexados na etapa 1, com o cursor de qual está à mostra.
 *
 * `multiplo` liga o carrossel: sem ele, anexar troca o que já existia em vez
 * de empilhar.
 *
 * A lista e o cursor moram no mesmo estado de propósito. Separados, remover o
 * último item deixava o cursor um passo à frente do fim da lista por um
 * render.
 *
 * Cada preview é uma object URL, então toda saída de item passa por revoke —
 * sem isso o blob fica preso na memória até a aba fechar.
 */
export function useUploads({ multiplo = false } = {}) {
  const [{ itens, indice }, setEstado] = useState({ itens: [], indice: 0 })

  // O cleanup do unmount precisa da lista de agora, não da do primeiro render.
  const itensRef = useRef(itens)
  itensRef.current = itens

  useEffect(() => {
    return () => itensRef.current.forEach((item) => URL.revokeObjectURL(item.url))
  }, [])

  const adicionar = useCallback(
    (arquivos) => {
      const novos = Array.from(arquivos).map(paraItem)
      if (novos.length === 0) return

      setEstado(({ itens: atuais }) => {
        if (!multiplo) {
          atuais.forEach((item) => URL.revokeObjectURL(item.url))
          return { itens: novos.slice(0, 1), indice: 0 }
        }
        // O cursor pula para o primeiro dos que acabaram de entrar.
        return { itens: [...atuais, ...novos], indice: atuais.length }
      })
    },
    [multiplo],
  )

  // Troca só o item à mostra, mantendo a posição dele no carrossel.
  const substituir = useCallback((arquivos) => {
    const novo = Array.from(arquivos).map(paraItem)[0]
    if (!novo) return

    setEstado(({ itens: atuais, indice: atual }) => {
      if (atuais.length === 0) return { itens: [novo], indice: 0 }

      return {
        itens: atuais.map((item, i) => {
          if (i !== atual) return item
          URL.revokeObjectURL(item.url)
          return novo
        }),
        indice: atual,
      }
    })
  }, [])

  /*
   * Tira o item à mostra. O cursor fica onde está, que passa a ser o item
   * seguinte; se o que saiu era o último da fila, recua um.
   */
  const remover = useCallback(() => {
    setEstado(({ itens: atuais, indice: atual }) => {
      const sai = atuais[atual]
      if (!sai) return { itens: atuais, indice: atual }
      URL.revokeObjectURL(sai.url)

      const restantes = atuais.filter((_, i) => i !== atual)
      return {
        itens: restantes,
        indice: Math.min(atual, Math.max(restantes.length - 1, 0)),
      }
    })
  }, [])

  const irPara = useCallback((novo) => {
    setEstado(({ itens: atuais }) => ({
      itens: atuais,
      indice: Math.min(Math.max(novo, 0), Math.max(atuais.length - 1, 0)),
    }))
  }, [])

  return {
    itens,
    indice,
    atual: itens[indice] ?? null,
    vazio: itens.length === 0,
    temAnterior: indice > 0,
    temProximo: indice < itens.length - 1,
    adicionar,
    substituir,
    remover,
    irPara,
  }
}
