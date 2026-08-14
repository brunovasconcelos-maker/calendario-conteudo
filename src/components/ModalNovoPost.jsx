import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Icone from './Icone.jsx'
import { ORDEM_DAS_PLATAFORMAS, PLATAFORMAS } from '../lib/plataformas.js'
import s from './ModalNovoPost.module.css'

/*
 * Escolha da plataforma, por cima do calendário escurecido. É rota
 * (/novo-post), e não estado solto: assim o link abre o modal direto e o
 * voltar do navegador funciona.
 *
 * Fechar — no X, no clique fora ou no Esc — leva de volta ao calendário.
 */
export default function ModalNovoPost() {
  const navigate = useNavigate()
  const caixaRef = useRef(null)

  const fechar = () => navigate('/')

  useEffect(() => {
    const aoTeclar = (evento) => {
      if (evento.key === 'Escape') fechar()
    }

    document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  })

  return (
    <div
      className={s.scrim}
      // Só o clique que nasce e morre fora da caixa fecha. Sem isso, arrastar
      // uma seleção de dentro para fora fecharia o modal sem querer.
      onMouseDown={(evento) => {
        if (!caixaRef.current?.contains(evento.target)) fechar()
      }}
    >
      <div
        className={s.caixa}
        ref={caixaRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-novo-post"
      >
        <div className={s.cabecalho}>
          <h2 className={s.titulo} id="titulo-novo-post">
            Novo Post
          </h2>
          <button type="button" className={s.fechar} aria-label="Fechar" onClick={fechar}>
            <Icone nome="Close" tamanho={24} />
          </button>
        </div>

        <div className={s.plataformas}>
          {ORDEM_DAS_PLATAFORMAS.map((id) => {
            const plataforma = PLATAFORMAS[id]

            return (
              <button
                key={id}
                type="button"
                className={s.plataforma}
                onClick={() => navigate(`/novo-post/${id}`)}
              >
                <img
                  className={s.logo}
                  src={plataforma.logo}
                  alt=""
                  width={48}
                  height={48}
                />
                <span className={s.nome}>{plataforma.nome}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
