import { Navigate, useNavigate } from 'react-router-dom'
import EtapaLayout from '../components/EtapaLayout.jsx'
import Icone from '../components/Icone.jsx'
import { usePostEmCriacao } from '../hooks/usePostEmCriacao.js'
import {
  CARROSSEL,
  VIDEO,
  caminhoDaEtapa,
  etapaAnterior,
  posicaoDaEtapa,
  proximaEtapa,
} from '../lib/formatos.js'
import s from './NovoPostLegenda.module.css'

/*
 * Etapa 2: legenda e hashtags, com a mídia anexada em prévia menor.
 *
 * Serve Post Único, Carrossel e Vídeo — oito dos nove caminhos. O Stories não
 * passa por aqui, e é barrado logo na entrada.
 *
 * Aqui a mídia é só prévia: editar e apagar ficaram na etapa 1, e o vídeo não
 * toca.
 */
export default function NovoPostLegenda() {
  const {
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
  } = usePostEmCriacao()
  const navigate = useNavigate()

  const raiz = `/novo-post/${idPlataforma}/${idFormato}`

  // O Stories não tem esta etapa; quem chegar pela URL vai para a seguinte.
  if (formato.semLegenda) {
    return <Navigate to={caminhoDaEtapa(raiz, proximaEtapa(formato, 'upload'))} replace />
  }

  // Sem arquivo não há o que legendar: volta para o upload.
  if (uploads.vazio) return <Navigate to={raiz} replace />

  const { numero, total } = posicaoDaEtapa(formato, 'legenda')
  const ehCarrossel = formato.comportamento === CARROSSEL
  const ehVertical = formato.comportamento === VIDEO

  return (
    <EtapaLayout
      titulo={formato.titulo}
      etapa={numero}
      totalDeEtapas={total}
      onVoltar={() => navigate(caminhoDaEtapa(raiz, etapaAnterior(formato, 'legenda')))}
      continuarAtivo
      onContinuar={() => navigate(caminhoDaEtapa(raiz, proximaEtapa(formato, 'legenda')))}
    >
      <div className={s.rolagem}>
        <div className={s.coluna}>
          <div className={s.previa}>
            {ehCarrossel ? (
              <>
                {/* Tira de imagens: a atual no meio, as vizinhas espiando pelas
                    bordas, como no node 6008:2651. */}
                <div className={s.tira}>
                  <div
                    className={s.trilho}
                    style={{ transform: `translateX(calc(50% - ${uploads.indice * 268 + 128}px))` }}
                  >
                    {uploads.itens.map((item, i) => (
                      <img
                        key={item.id}
                        className={`${s.quadro} ${i === uploads.indice ? '' : s.quadroApagado}`}
                        src={item.url}
                        alt={item.nome}
                      />
                    ))}
                  </div>

                </div>

                {/* Fora da tira de propósito: ela recorta o que passa das
                    bordas para as vizinhas espiarem, e levaria as setas junto.
                    Cada uma só existe quando há para onde ir, como na etapa 1. */}
                {uploads.temAnterior && (
                  <button
                    type="button"
                    className={`${s.seta} ${s.setaEsquerda}`}
                    aria-label="Imagem anterior"
                    onClick={() => uploads.irPara(uploads.indice - 1)}
                  >
                    <Icone nome="CaretLeft" tamanho={24} />
                  </button>
                )}

                {uploads.temProximo && (
                  <button
                    type="button"
                    className={`${s.seta} ${s.setaDireita}`}
                    aria-label="Próxima imagem"
                    onClick={() => uploads.irPara(uploads.indice + 1)}
                  >
                    <Icone nome="CaretRight" tamanho={24} />
                  </button>
                )}

                <div className={s.bolinhas}>
                  {uploads.itens.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`${s.bolinha} ${i === uploads.indice ? s.bolinhaAtiva : ''}`}
                      aria-label={`Ir para a imagem ${i + 1}`}
                      aria-current={i === uploads.indice}
                      onClick={() => uploads.irPara(i)}
                    />
                  ))}
                </div>
              </>
            ) : uploads.atual.tipo === 'video' ? (
              <video
                className={`${s.midia} ${ehVertical ? s.midiaVertical : ''}`}
                src={uploads.atual.url}
                muted
                playsInline
              />
            ) : (
              <img
                className={`${s.midia} ${ehVertical ? s.midiaVertical : ''}`}
                src={uploads.atual.url}
                alt={uploads.atual.nome}
              />
            )}
          </div>

          <Campo
            rotulo="Legenda"
            valor={legenda}
            onChange={setLegenda}
            onRegenerar={regenerarLegenda}
          />
          <Campo
            rotulo="Hashtags"
            valor={hashtags}
            onChange={setHashtags}
            onRegenerar={regenerarHashtags}
            azul
          />
        </div>
      </div>
    </EtapaLayout>
  )
}

// Legenda e hashtags são o mesmo campo; muda só o rótulo e a cor do texto.
function Campo({ rotulo, valor, onChange, onRegenerar, azul = false }) {
  return (
    <div className={s.campo}>
      <div className={s.cabecalhoDoCampo}>
        <span className={s.rotulo}>{rotulo}</span>
        <button type="button" className={s.regenerar} onClick={onRegenerar}>
          Regenerar
          <Icone nome="ArrowsClockwise" tamanho={16} />
        </button>
      </div>
      <textarea
        className={`${s.caixa} ${azul ? s.caixaAzul : ''}`}
        value={valor}
        onChange={(evento) => onChange(evento.target.value)}
        aria-label={rotulo}
      />
    </div>
  )
}
