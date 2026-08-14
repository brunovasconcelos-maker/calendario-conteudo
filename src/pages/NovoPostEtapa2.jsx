import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EtapaLayout from '../components/EtapaLayout.jsx'
import { acharFormato } from '../lib/formatos.js'

/*
 * Etapa 2, ainda sem conteúdo. Existe para fechar o caminho do "Continuar":
 * mesma moldura da etapa 1, com o progresso um passo à frente e o miolo vazio,
 * à espera do que essa etapa vai ser.
 */
export default function NovoPostEtapa2() {
  const { plataforma: idPlataforma, formato: idFormato } = useParams()
  const navigate = useNavigate()
  const formato = acharFormato(idPlataforma, idFormato)

  if (!formato) return <Navigate to={`/novo-post/${idPlataforma ?? ''}`} replace />

  return (
    <EtapaLayout
      titulo={formato.titulo}
      etapa={2}
      onVoltar={() => navigate(`/novo-post/${idPlataforma}/${idFormato}`)}
      continuarAtivo={false}
    />
  )
}
