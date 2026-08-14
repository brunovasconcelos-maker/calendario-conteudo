import { Navigate, useNavigate } from 'react-router-dom'
import EtapaLayout from '../components/EtapaLayout.jsx'
import { usePostEmCriacao } from '../hooks/usePostEmCriacao.js'
import { caminhoDaEtapa, etapaAnterior, posicaoDaEtapa } from '../lib/formatos.js'

/*
 * Última etapa — revisão e publicação —, ainda sem conteúdo. Existe para
 * fechar o caminho do "Continuar" com a moldura certa: no Stories é a etapa 2
 * de 2, e nos outros oito formatos, a 3 de 3.
 */
export default function NovoPostRevisao() {
  const { formato, idPlataforma, idFormato, uploads } = usePostEmCriacao()
  const navigate = useNavigate()

  const raiz = `/novo-post/${idPlataforma}/${idFormato}`
  if (uploads.vazio) return <Navigate to={raiz} replace />

  const { numero, total } = posicaoDaEtapa(formato, 'revisao')

  return (
    <EtapaLayout
      titulo={formato.titulo}
      etapa={numero}
      totalDeEtapas={total}
      onVoltar={() => navigate(caminhoDaEtapa(raiz, etapaAnterior(formato, 'revisao')))}
      continuarAtivo={false}
    />
  )
}
