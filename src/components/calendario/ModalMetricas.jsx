import { useEffect, useRef, useState } from 'react'
import Icone from '../Icone.jsx'
import { diaPorExtensoLongo } from '../../lib/agendamento.js'
import { comSeparadorDeMilhar, sortearMetricas } from '../../lib/metricas.js'
import s from './ModalMetricas.module.css'

/*
 * As métricas de um post já publicado (node 6023:6621).
 *
 * Os números são sorteados no primeiro render e ficam parados enquanto a tela
 * está aberta: como o componente monta de novo a cada abertura, cada visita
 * traz números diferentes sem que nada precise ser guardado.
 *
 * A seta de "Comentários" ainda não leva a lugar nenhum — o módulo de
 * comentários é passo futuro —, então ela não é botão: anunciar um botão que
 * não age atrapalha quem navega por leitor de tela.
 */
const CARTOES = [
  [
    { chave: 'visualizacoes', rotulo: 'Visualizações' },
    { chave: 'likes', rotulo: 'Likes' },
  ],
  [
    { chave: 'comentarios', rotulo: 'Comentários', comSeta: true },
    { chave: 'compartilhamentos', rotulo: 'Compartilhamentos' },
    { chave: 'salvos', rotulo: 'Salvos' },
  ],
]

export default function ModalMetricas({ post, onVoltar, onFechar }) {
  const [numeros] = useState(sortearMetricas)
  const caixaRef = useRef(null)

  // Esc volta ao detalhe, e não fecha tudo: é o mesmo caminho da seta.
  useEffect(() => {
    const aoTeclar = (evento) => {
      if (evento.key === 'Escape') onVoltar()
    }

    document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  }, [onVoltar])

  return (
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
        aria-labelledby="titulo-metricas"
      >
        <div className={s.cabecalho}>
          <button
            type="button"
            className={s.iconeBotao}
            aria-label="Voltar para o post"
            onClick={onVoltar}
          >
            <Icone nome="CaretLeft" tamanho={24} />
          </button>

          <h2 className={s.titulo} id="titulo-metricas">
            Métricas
          </h2>

          <button type="button" className={s.iconeBotao} aria-label="Fechar" onClick={onFechar}>
            <Icone nome="Close" tamanho={24} />
          </button>
        </div>

        <div className={s.corpo}>
          <p className={s.quando}>Postado em {diaPorExtensoLongo(post.data)}</p>

          <div className={s.grade}>
            {CARTOES.map((linha) => (
              <div key={linha[0].chave} className={s.linha}>
                {linha.map(({ chave, rotulo, comSeta }) => (
                  <div key={chave} className={s.cartao}>
                    <div className={s.topo}>
                      <span className={s.numero}>{comSeparadorDeMilhar(numeros[chave])}</span>
                      {comSeta && (
                        <span className={s.seta} aria-hidden="true">
                          <Icone nome="ArrowUpRight" tamanho={24} />
                        </span>
                      )}
                    </div>
                    <span className={s.rotulo}>{rotulo}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
