import { useEffect, useRef, useState } from 'react'
import Icone from '../Icone.jsx'
import LogoDaPlataforma from './LogoDaPlataforma.jsx'
import MidiaDaPrevia from '../previa/MidiaDaPrevia.jsx'
import ModalAgendar from '../ModalAgendar.jsx'
import { useMidiasDoPost } from '../../hooks/useMidiasDoPost.js'
import { usePosts } from '../../hooks/usePosts.js'
import { useAvisos } from '../../hooks/useAvisos.js'
import {
  diaPorExtenso,
  paraCampoDeData,
  paraCampoDeHora,
} from '../../lib/agendamento.js'
import { CARROSSEL, MIDIA, VIDEO, acharFormato, rotuloCurtoDoFormato } from '../../lib/formatos.js'
import { apagarPost, atualizarPost, jaFoiPostado } from '../../lib/postsSalvos.js'
import s from './ModalDoPost.module.css'

/*
 * O detalhe de um post do calendário (nodes 6023:6173 e 6023:7349).
 *
 * Recebe o id, e não o post: assim ele lê a lista pelo usePosts e se redesenha
 * sozinho quando alguma ação regrava — "Postar Agora" vira Postado na hora, sem
 * ninguém precisar repassar o post novo para cá.
 *
 * O estado é o mesmo dos cards: comparação de data e hora com agora. Não muda
 * conforme quem criou o post.
 */
export default function ModalDoPost({ postId, onFechar }) {
  const posts = usePosts()
  const post = posts.find((item) => item.id === postId)
  const { avisar } = useAvisos()
  const [reagendando, setReagendando] = useState(false)
  const [confirmandoApagar, setConfirmandoApagar] = useState(false)
  const caixaRef = useRef(null)
  const midias = useMidiasDoPost(post)

  useEffect(() => {
    const aoTeclar = (evento) => {
      if (evento.key === 'Escape') onFechar()
    }

    document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  }, [onFechar])

  // Sumiu da lista (apagado aqui ou em outra aba): não há o que mostrar.
  if (!post) return null

  const formato = acharFormato(post.plataforma, post.formato)
  const moldura = molduraDoFormato(formato)
  const postado = jaFoiPostado(post)

  const apagar = () => {
    apagarPost(post.id)
    avisar('Post deletado.')
    onFechar()
  }

  const reagendar = ({ data, hora }) => {
    setReagendando(false)
    atualizarPost(post.id, { data, hora, via: 'agendado' })
    avisar(`Post reagendado para ${diaPorExtenso(data)}, às ${hora}`)
  }

  // Publicar é registrar com a hora de agora, igual à etapa 3: o card muda de
  // borda e anda para hoje, e o modal continua aberto já no estado Postado.
  const publicar = () => {
    const agora = new Date()
    atualizarPost(post.id, {
      data: paraCampoDeData(agora),
      hora: paraCampoDeHora(agora),
      via: 'agora',
    })
    avisar('Post publicado!')
  }

  return (
    <>
      <div
        className={s.scrim}
        onMouseDown={(evento) => {
          if (!caixaRef.current?.contains(evento.target)) onFechar()
        }}
      >
        <div
          className={s.caixa}
          ref={caixaRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-do-post"
        >
          <div className={s.cabecalho}>
            <LogoDaPlataforma plataforma={post.plataforma} tamanho={40} />
            <h2 className={s.titulo} id="titulo-do-post">
              {rotuloCurtoDoFormato(post.formato)}
            </h2>

            <div className={s.ladoDireito}>
              {postado ? (
                <span className={`${s.selo} ${s.seloPostado}`}>
                  Postado
                  <Icone nome="Check" tamanho={12} />
                </span>
              ) : (
                <span className={`${s.selo} ${s.seloAgendado}`}>
                  Agendado
                  <Icone nome="ClockCountdown" tamanho={14} />
                </span>
              )}

              <button type="button" className={s.iconeBotao} aria-label="Fechar" onClick={onFechar}>
                <Icone nome="Close" tamanho={24} />
              </button>
            </div>
          </div>

          <div className={s.corpo}>
            <div className={s.palco}>
              <div className={`${s.midia} ${moldura === 'vertical' ? s.midiaVertical : ''}`}>
                <MidiaDaPrevia
                  uploads={midias}
                  formato={moldura}
                  carrossel={formato?.comportamento === CARROSSEL}
                  caber
                />
              </div>

              {/* Só no Postado, e ainda sem tela de métricas para abrir. */}
              {postado && (
                <div className={s.metricasColuna}>
                  <button type="button" className={s.metricas} aria-label="Ver métricas">
                    <Icone nome="ChartLineUp" tamanho={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Legenda vazia não vira caixa vazia, igual aos cards. */}
            {(post.legenda?.trim() || post.hashtags?.trim()) && (
              <p className={s.texto}>
                {post.legenda} <span className={s.hashtags}>{post.hashtags}</span>
              </p>
            )}

            {!postado && (
              <div className={s.rodape}>
                <p className={s.quando}>Agendado para {diaPorExtenso(post.data)}</p>

                {confirmandoApagar ? (
                  /* Confirmação na própria barra, e não num segundo modal: o
                     post que vai sumir continua à vista, e não empilha um
                     scrim escuro por cima do outro. */
                  <div className={s.confirmacao}>
                    <p className={s.pergunta}>Deletar este post?</p>
                    <div className={s.acoesConfirmacao}>
                      <button
                        type="button"
                        className={s.botaoContorno}
                        onClick={() => setConfirmandoApagar(false)}
                      >
                        Cancelar
                      </button>
                      <button type="button" className={s.botaoPerigo} onClick={apagar}>
                        Deletar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={s.acoes}>
                    <button
                      type="button"
                      className={s.botaoContorno}
                      onClick={() => setConfirmandoApagar(true)}
                    >
                      Deletar
                    </button>
                    <div className={s.acoesDireita}>
                      <button
                        type="button"
                        className={s.botaoContorno}
                        onClick={() => setReagendando(true)}
                      >
                        Reagendar
                      </button>
                      <button type="button" className={s.botaoPrimario} onClick={publicar}>
                        Postar Agora
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {reagendando && (
        <ModalAgendar
          dataInicial={post.data}
          horaInicial={post.hora}
          onCancelar={() => setReagendando(false)}
          onAgendar={reagendar}
        />
      )}
    </>
  )
}

// A mesma escolha de moldura da etapa 3: vertical no reel, no stories e no
// vídeo; feed no resto.
function molduraDoFormato(formato) {
  const vertical = formato?.comportamento === VIDEO || formato?.comportamento === MIDIA
  return vertical ? 'vertical' : 'feed'
}
