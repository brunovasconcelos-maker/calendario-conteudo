import { useCallback, useMemo, useState } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useUploads } from '../hooks/useUploads.js'
import { ContextoDoPost } from '../hooks/usePostEmCriacao.js'
import { CARROSSEL, acharFormato } from '../lib/formatos.js'
import { sortearHashtags, sortearLegenda } from '../lib/legendas.js'

/*
 * Rota-mãe do fluxo de criação. Não desenha nada: segura o que as etapas
 * dividem entre si e entrega pelo contexto.
 *
 * A legenda e as hashtags já nascem sorteadas, então a etapa 2 abre preenchida
 * e o "Continuar" de lá pode começar ativo. Nascer aqui, e não na página, é o
 * que preserva a edição de quem escreveu ao ir e voltar entre as etapas.
 */
export default function FluxoDePost() {
  const { plataforma: idPlataforma, formato: idFormato } = useParams()
  const formato = acharFormato(idPlataforma, idFormato)

  const uploads = useUploads({ multiplo: formato?.comportamento === CARROSSEL })
  const [legenda, setLegenda] = useState(() => sortearLegenda())
  const [hashtags, setHashtags] = useState(() => sortearHashtags())

  const regenerarLegenda = useCallback(() => {
    setLegenda((atual) => sortearLegenda(atual))
  }, [])

  const regenerarHashtags = useCallback(() => {
    setHashtags((atual) => sortearHashtags(atual))
  }, [])

  const valor = useMemo(
    () => ({
      formato,
      idPlataforma,
      idFormato,
      uploads,
      legenda,
      setLegenda,
      regenerarLegenda,
      hashtags,
      setHashtags,
      regenerarHashtags,
    }),
    [
      formato,
      idPlataforma,
      idFormato,
      uploads,
      legenda,
      regenerarLegenda,
      hashtags,
      regenerarHashtags,
    ],
  )

  // Par plataforma/formato que não existe volta para a escolha de formato.
  if (!formato) return <Navigate to={`/novo-post/${idPlataforma ?? ''}`} replace />

  return (
    <ContextoDoPost.Provider value={valor}>
      <Outlet />
    </ContextoDoPost.Provider>
  )
}
