import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import EtapaLayout from '../components/EtapaLayout.jsx'
import ModalAgendar from '../components/ModalAgendar.jsx'
import PreviaDoPost from '../components/previa/PreviaDoPost.jsx'
import { usePostEmCriacao } from '../hooks/usePostEmCriacao.js'
import { useAvisos } from '../hooks/useAvisos.js'
import {
  dataPorExtenso,
  paraCampoDeData,
  paraCampoDeHora,
} from '../lib/agendamento.js'
import { caminhoDaEtapa, etapaAnterior, posicaoDaEtapa } from '../lib/formatos.js'
import { gerarMiniaturas } from '../lib/miniaturas.js'
import { salvarPost } from '../lib/postsSalvos.js'
import s from './NovoPostRevisao.module.css'

/*
 * Última etapa: o post como vai ficar na rede, e a escolha entre publicar agora
 * ou agendar.
 *
 * As duas ações guardam o post no navegador e voltam ao calendário. Nada de
 * API: "publicar" aqui é registrar com a hora de agora.
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

  /*
   * Guarda e sai. As miniaturas são geradas antes de salvar, então isto é
   * assíncrono — mas o aviso e a saída não esperam mais que o necessário.
   *
   * Cota cheia não impede a saída: o aviso de sucesso sai como sempre, e vai um
   * segundo recado dizendo que não deu para guardar. Falhar calado seria pior.
   *
   * Quem pula a etapa 2 (Stories) sai sem legenda: o fluxo sorteia uma no
   * começo, mas ela nunca aparece nem na etapa 2 nem na prévia, então guardá-la
   * poria no calendário um texto que ninguém viu nem escolheu.
   */
  const guardar = async ({ data, hora, via }) => {
    const midias = await gerarMiniaturas(uploads.itens)

    const gravou = salvarPost({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      plataforma: idPlataforma,
      formato: idFormato,
      midias,
      legenda: formato.semLegenda ? '' : legenda,
      hashtags: formato.semLegenda ? '' : hashtags,
      data,
      hora,
      via,
      criadoEm: new Date().toISOString(),
    })

    if (!gravou) {
      avisar('Não deu para guardar o post neste navegador (espaço cheio).')
    }
  }

  const publicar = async () => {
    const agora = new Date()
    await guardar({
      data: paraCampoDeData(agora),
      hora: paraCampoDeHora(agora),
      via: 'agora',
    })
    avisar('Post publicado!')
    navigate('/')
  }

  const agendar = async ({ data, hora }) => {
    setAgendando(false)
    await guardar({ data, hora, via: 'agendado' })
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
