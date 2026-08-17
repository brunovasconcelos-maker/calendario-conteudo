import { useNavigate } from 'react-router-dom'
import Icone from './Icone.jsx'
import avatar from '../assets/images/Group 63.png'
import s from './EtapaLayout.module.css'

/*
 * A moldura das etapas de criação do post: header em cima, barra de progresso
 * e navegação embaixo, conteúdo no meio. Serve todas as etapas.
 *
 * A barra anda uma fatia por etapa: etapa / total. Fecha em 100% na última,
 * nos dois fluxos — o de três etapas e o do Stories, que tem duas.
 *
 * O Figma desenha a barra em metade disso (240px de 1440 na etapa 1, 480px na
 * etapa 2), o que deixaria a última etapa parada na metade. A barra cheia no
 * fim foi decisão de produto, contra o desenho.
 */
export default function EtapaLayout({
  titulo,
  etapa,
  totalDeEtapas,
  onVoltar,
  continuarAtivo = false,
  onContinuar,
  // Botões da direita quando não é um "Continuar" só — a última etapa tem dois.
  // Cada item: { rotulo, onClick, variante: 'primaria' | 'contorno' }.
  acoes,
  children,
}) {
  const navigate = useNavigate()
  const progresso = (etapa / totalDeEtapas) * 100

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
          aria-valuemax={totalDeEtapas}
          aria-label={`Etapa ${etapa} de ${totalDeEtapas}`}
        >
          <div className={s.barraCheia} style={{ width: `${progresso}%` }} />
        </div>

        <div className={s.navegacao}>
          <button type="button" className={s.voltar} onClick={onVoltar}>
            Voltar
          </button>
          {acoes ? (
            <div className={s.acoes}>
              {acoes.map((acao) => (
                <button
                  key={acao.rotulo}
                  type="button"
                  className={acao.variante === 'contorno' ? s.contorno : s.continuar}
                  onClick={acao.onClick}
                >
                  {acao.rotulo}
                </button>
              ))}
            </div>
          ) : (
            <button
              type="button"
              className={s.continuar}
              disabled={!continuarAtivo}
              onClick={onContinuar}
            >
              Continuar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
