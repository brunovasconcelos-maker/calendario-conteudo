import { useNavigate } from 'react-router-dom'
import Icone from './Icone.jsx'
import { TOTAL_DE_ETAPAS } from '../lib/formatos.js'
import avatar from '../assets/images/Group 63.png'
import s from './EtapaLayout.module.css'

/*
 * A moldura das etapas de criação do post: header em cima, barra de progresso
 * e navegação embaixo, conteúdo no meio. Serve todas as etapas — a de upload e
 * as que vierem.
 *
 * A barra de progresso marca o meio da etapa corrente, não o fim dela:
 * (etapa - 0,5) / 3. É o que dá os 240px de 1440 do Figma na etapa 1.
 */
export default function EtapaLayout({
  titulo,
  etapa,
  onVoltar,
  continuarAtivo = false,
  onContinuar,
  children,
}) {
  const navigate = useNavigate()
  const progresso = ((etapa - 0.5) / TOTAL_DE_ETAPAS) * 100

  return (
    <div className={s.pagina}>
      <header className={s.cabecalho}>
        <h1 className={s.titulo}>{titulo}</h1>

        {/* Só informativo: não dá para trocar de perfil por aqui. */}
        <div className={s.publicandoComo}>
          <span className={s.rotulo}>Publicando como:</span>
          <img className={s.avatar} src={avatar} alt="" width={29} height={29} />
          <span className={s.perfil}>Inner AI</span>
        </div>

        <div className={s.ladoDireito}>
          <button
            type="button"
            className={s.fechar}
            aria-label="Fechar"
            onClick={() => navigate('/')}
          >
            <Icone nome="Close" tamanho={24} />
          </button>
        </div>
      </header>

      <main className={s.conteudo}>{children}</main>

      <div className={s.etapas}>
        <div
          className={s.barra}
          role="progressbar"
          aria-valuenow={etapa}
          aria-valuemin={1}
          aria-valuemax={TOTAL_DE_ETAPAS}
          aria-label={`Etapa ${etapa} de ${TOTAL_DE_ETAPAS}`}
        >
          <div className={s.barraCheia} style={{ width: `${progresso}%` }} />
        </div>

        <div className={s.navegacao}>
          <button type="button" className={s.voltar} onClick={onVoltar}>
            Voltar
          </button>
          <button
            type="button"
            className={s.continuar}
            disabled={!continuarAtivo}
            onClick={onContinuar}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}
