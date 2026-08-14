import { useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EtapaLayout from '../components/EtapaLayout.jsx'
import Icone from '../components/Icone.jsx'
import { useUploads } from '../hooks/useUploads.js'
import { CARROSSEL, MIDIA, VIDEO, acharFormato } from '../lib/formatos.js'
import s from './NovoPostUpload.module.css'

/*
 * Etapa 1 dos nove caminhos: anexar o arquivo.
 *
 * Uma página só serve os nove. O que muda vem de src/lib/formatos.js — título,
 * tipos aceitos, e se anexar empilha (carrossel) ou troca.
 */
export default function NovoPostUpload() {
  const { plataforma: idPlataforma, formato: idFormato } = useParams()
  const navigate = useNavigate()
  const formato = acharFormato(idPlataforma, idFormato)

  const ehCarrossel = formato?.comportamento === CARROSSEL
  const uploads = useUploads({ multiplo: ehCarrossel })

  // Um input só para as três aberturas do seletor. `modo` diz o que fazer com
  // o que voltar: começar, empilhar no carrossel ou trocar o item à mostra.
  const inputRef = useRef(null)
  const [modo, setModo] = useState('adicionar')
  const [arrastando, setArrastando] = useState(false)
  const [tocando, setTocando] = useState(false)
  const videoRef = useRef(null)

  // Par plataforma/formato que não existe volta para a escolha de formato.
  if (!formato) return <Navigate to={`/novo-post/${idPlataforma ?? ''}`} replace />

  const abrirSeletor = (proximoModo) => {
    setModo(proximoModo)
    if (inputRef.current) inputRef.current.value = ''
    inputRef.current?.click()
  }

  const receber = (arquivos) => {
    if (!arquivos || arquivos.length === 0) return
    if (modo === 'substituir') uploads.substituir(arquivos)
    else uploads.adicionar(arquivos)
  }

  const aoSoltar = (evento) => {
    evento.preventDefault()
    setArrastando(false)
    // Arrastar sempre entra como item novo, nunca como troca.
    uploads.adicionar(evento.dataTransfer.files)
  }

  const ehVideo = uploads.atual?.tipo === 'video'
  const mostraPlay =
    uploads.atual &&
    (formato.comportamento === VIDEO || (formato.comportamento === MIDIA && ehVideo))

  const tocar = () => {
    videoRef.current?.play()
    setTocando(true)
  }

  return (
    <EtapaLayout
      titulo={formato.titulo}
      etapa={1}
      onVoltar={() => navigate(`/novo-post/${idPlataforma}`)}
      continuarAtivo={!uploads.vazio}
      onContinuar={() => navigate(`/novo-post/${idPlataforma}/${idFormato}/etapa-2`)}
    >
      <input
        ref={inputRef}
        type="file"
        className={s.input}
        accept={formato.accept}
        multiple={ehCarrossel && modo === 'adicionar'}
        onChange={(evento) => receber(evento.target.files)}
      />

      {uploads.vazio ? (
        <div className={s.centro}>
          <button
            type="button"
            className={`${s.zona} ${arrastando ? s.zonaAtiva : ''}`}
            onClick={() => abrirSeletor('adicionar')}
            onDragOver={(evento) => {
              evento.preventDefault()
              setArrastando(true)
            }}
            onDragLeave={() => setArrastando(false)}
            onDrop={aoSoltar}
          >
            <Icone nome="FileArrowUp" tamanho={40} />
            <span className={s.chamada}>
              Faça upload ou arraste {formato.chamada} pra cá
              <br />
              {formato.linha}
            </span>
          </button>
        </div>
      ) : (
        <div className={s.centro}>
          <div className={s.linha}>
            {ehCarrossel && (
              <button
                type="button"
                className={`${s.seta} ${uploads.temAnterior ? '' : s.invisivel}`}
                aria-label="Imagem anterior"
                aria-hidden={!uploads.temAnterior}
                tabIndex={uploads.temAnterior ? 0 : -1}
                onClick={() => uploads.irPara(uploads.indice - 1)}
              >
                <Icone nome="CaretLeft" tamanho={24} />
              </button>
            )}

            <div
              className={`${s.palco} ${
                formato.comportamento === VIDEO || formato.comportamento === MIDIA
                  ? s.palcoVertical
                  : ''
              }`}
            >
              {ehVideo ? (
                <video
                  ref={videoRef}
                  className={s.midia}
                  src={uploads.atual.url}
                  controls={tocando}
                  onPause={() => setTocando(false)}
                  onEnded={() => setTocando(false)}
                />
              ) : (
                <img className={s.midia} src={uploads.atual.url} alt={uploads.atual.nome} />
              )}

              {mostraPlay && !tocando && (
                <>
                  <span className={s.veu} />
                  <button
                    type="button"
                    className={s.play}
                    aria-label="Reproduzir"
                    onClick={tocar}
                  >
                    <Icone nome="Play" tamanho={24} />
                  </button>
                </>
              )}
            </div>

            <div className={s.acoes}>
              <button
                type="button"
                className={s.acao}
                aria-label="Trocar arquivo"
                onClick={() => abrirSeletor('substituir')}
              >
                <Icone nome="PencilSimpleLine" tamanho={24} />
              </button>
              <button
                type="button"
                className={s.acao}
                aria-label="Remover arquivo"
                onClick={uploads.remover}
              >
                <Icone nome="Trash" tamanho={24} />
              </button>
            </div>

            {ehCarrossel && (
              <>
                <button
                  type="button"
                  className={`${s.seta} ${uploads.temProximo ? '' : s.invisivel}`}
                  aria-label="Próxima imagem"
                  aria-hidden={!uploads.temProximo}
                  tabIndex={uploads.temProximo ? 0 : -1}
                  onClick={() => uploads.irPara(uploads.indice + 1)}
                >
                  <Icone nome="CaretRight" tamanho={24} />
                </button>
                <button
                  type="button"
                  className={s.seta}
                  aria-label="Adicionar imagem"
                  onClick={() => abrirSeletor('adicionar')}
                >
                  <Icone nome="Plus" tamanho={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </EtapaLayout>
  )
}
