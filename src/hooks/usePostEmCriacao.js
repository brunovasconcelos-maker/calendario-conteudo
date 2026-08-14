import { createContext, useContext } from 'react'

/*
 * O post que está sendo montado, compartilhado entre as etapas.
 *
 * Vive no FluxoDePost, que é a rota-mãe de /novo-post/:plataforma/:formato.
 * Precisa ficar acima das etapas porque a etapa 2 mostra a mídia anexada na
 * etapa 1 — em estado local de cada página, isso se perderia na navegação.
 *
 * Sair do fluxo desmonta o provedor, que é quando os previews são liberados.
 */
export const ContextoDoPost = createContext(null)

export function usePostEmCriacao() {
  const contexto = useContext(ContextoDoPost)

  if (!contexto) {
    throw new Error('usePostEmCriacao precisa estar dentro de <FluxoDePost>.')
  }

  return contexto
}
