import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import EtapaLayout from '../components/EtapaLayout.jsx'
import ModalAgendar from '../components/ModalAgendar.jsx'
import PreviaDoPost from '../components/previa/PreviaDoPost.jsx'
import { usePostEmCriacao } from '../hooks/usePostEmCriacao.js'
import { useAvisos } from '../hooks/useAvisos.js'
import { dataPorExtenso } from '../lib/agendamento.js'
import { caminhoDaEtapa, etapaAnterior, posicaoDaEtapa } from '../lib/formatos.js'
import s from './NovoPostRevisao.module.css'

/*
 * Última etapa: o post como vai ficar na rede, e a escolha entre publicar agora
 * ou agendar.
 *
 * Nenhuma das duas ações fala com API: publicar e agendar avisam e fecham o
 * fluxo. O que foi agendado ainda não é guardado nem aparece no calendário.
 */
export default function NovoPostRevisao() {
  const { formato, idPlataforma, idFormato, uploads, legenda, hashtags } =
    usePostEmCriacao()
  const navigate = useNavigate()
  const { avisar } = useAvisos()
  const [agendando, setAgendando] = useState(false)

  const raiz = `/novo-post/${idPlataforma}/${idFormato}`
  if (uploads.vazio) return <Navigate to={raiz} replace />

  const { numero, total } = posicaoDaEtapa(formato, 'revisao')

  const publicar = () => {
    avisar('Post publicado!')
    navigate('/')
  }

  const agendar = ({ data, hora }) => {
    setAgendando(false)
    avisar(`Post agendado para ${dataPorExtenso(data, hora)}`)
    navigate('/')
  }

  return (
    <>
      <EtapaLayout
        titulo={formato.titulo}
        etapa={numero}
        totalDeEtapas={total}
        onVoltar={() => navigate(caminhoDaEtapa(raiz, etapaAnterior(formato, 'revisao')))}
        acoes={[
          { rotulo: 'Postar Agora', variante: 'contorno', onClick: publicar },
          { rotulo: 'Agendar Post', variante: 'primaria', onClick: () => setAgendando(true) },
        ]}
      >
        <div className={s.rolagem}>
          <div className={s.centro}>
            <PreviaDoPost
              plataforma={idPlataforma}
              formato={formato}
              uploads={uploads}
              legenda={legenda}
              hashtags={hashtags}
            />
          </div>
        </div>
      </EtapaLayout>

      {agendando && (
        <ModalAgendar onCancelar={() => setAgendando(false)} onAgendar={agendar} />
      )}
    </>
  )
}
