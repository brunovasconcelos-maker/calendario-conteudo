import Icone from '../Icone.jsx'
import MidiaDaPrevia from './MidiaDaPrevia.jsx'
import { CARROSSEL, MIDIA, VIDEO } from '../../lib/formatos.js'
import avatar from '../../assets/images/Group 63.png'
import s from './PreviaDoPost.module.css'

/*
 * O post como ele ficaria na rede escolhida.
 *
 * A mídia e o texto são os mesmos nos três casos; o que muda é a decoração em
 * volta. O Instagram sai do Figma (nodes 6008:2379, 6008:2872, 6008:3075 e
 * 6011:3230); TikTok e Linkedin não têm desenho para esta etapa e seguem as
 * convenções de cada app, com o mesmo espaçamento do Instagram.
 */
export default function PreviaDoPost({ plataforma, formato, uploads, legenda, hashtags }) {
  const comum = { uploads, legenda, hashtags, formato }

  if (plataforma === 'tiktok') return <PreviaTiktok {...comum} />
  if (plataforma === 'linkedin') return <PreviaLinkedin {...comum} />
  return <PreviaInstagram {...comum} />
}

// O texto do post: legenda em cinza e hashtags em azul, no mesmo parágrafo,
// como o Figma escreve.
function Texto({ legenda, hashtags, className }) {
  return (
    <p className={[s.texto, className].filter(Boolean).join(' ')}>
      {legenda} <span className={s.hashtags}>{hashtags}</span>
    </p>
  )
}

function Perfil({ className, tamanho = 32, claro = false }) {
  return (
    <div className={[s.perfil, className].filter(Boolean).join(' ')}>
      <img
        className={s.avatar}
        src={avatar}
        alt=""
        width={tamanho}
        height={tamanho}
        style={{ width: tamanho, height: tamanho }}
      />
      <span className={claro ? s.nomeClaro : s.nome}>Inner AI</span>
    </div>
  )
}

/* ---------------------------------------------------------------- Instagram */

function PreviaInstagram({ formato, uploads, legenda, hashtags }) {
  // Stories: só a mídia com a barra escura por cima, sem legenda e sem ações.
  if (formato.comportamento === MIDIA) {
    return (
      <MidiaDaPrevia uploads={uploads} formato="vertical">
        {/* Mesmo motivo do reel: a barra de cima é branca. */}
        <div className={s.veuSuperior} />
        <div className={s.chromeStories}>
          <span className={s.barrinhas}>
            <span className={s.barrinhaAtiva} />
          </span>
          <div className={s.topoStories}>
            <Perfil tamanho={20} claro />
            <span className={s.acoesStories}>
              <Icone nome="DotsThree" tamanho={16} className={s.iconeClaro} />
              {/* O Figma usa uma layer "X" para este fechar; o repositório tem o
                  Close, que é o mesmo desenho, clareado aqui pelo filtro. */}
              <Icone nome="Close" tamanho={16} className={s.iconeClaro} />
            </span>
          </div>
        </div>
      </MidiaDaPrevia>
    )
  }

  // Reel: os ícones de interação ficam por cima da mídia, e a legenda embaixo.
  if (formato.comportamento === VIDEO) {
    return (
      <div className={s.coluna}>
        <MidiaDaPrevia uploads={uploads} formato="vertical">
          {/* Escurece o pé do vídeo: os ícones são brancos, e sem isso eles
              desaparecem quando o arquivo de quem usa é claro. */}
          <div className={s.veuInferior} />
          <div className={s.trilhoReel}>
            <Icone nome="Heart" tamanho={24} className={s.iconeClaro} />
            <Icone nome="ChatCircle" tamanho={24} className={s.iconeClaro} />
            <Icone nome="PaperPlaneTilt" tamanho={24} className={s.iconeClaro} />
          </div>
        </MidiaDaPrevia>
        <Texto legenda={legenda} hashtags={hashtags} className={s.textoLargo} />
      </div>
    )
  }

  // Post e carrossel: feed, com a fila de ações entre a mídia e a legenda.
  return (
    <div className={s.coluna}>
      <MidiaDaPrevia
        uploads={uploads}
        formato="feed"
        carrossel={formato.comportamento === CARROSSEL}
      />
      <div className={s.acoesFeed}>
        <span className={s.grupoDeAcoes}>
          <Icone nome="Heart" tamanho={24} />
          <Icone nome="ChatCircle" tamanho={24} className={s.espelhado} />
          <Icone nome="PaperPlaneTilt" tamanho={24} />
        </span>
        <Icone nome="BookmarkSimple" tamanho={24} />
      </div>
      <Texto legenda={legenda} hashtags={hashtags} />
    </div>
  )
}

/* ------------------------------------------------------------------- TikTok */

/*
 * Sem desenho no Figma. Segue o app: vídeo em pé, trilho de ações à direita e
 * o texto por cima do rodapé da mídia, tudo em branco sobre o vídeo.
 */
function PreviaTiktok({ formato, uploads, legenda, hashtags }) {
  const ehCarrossel = formato.comportamento === CARROSSEL

  return (
    <MidiaDaPrevia uploads={uploads} formato="vertical" carrossel={ehCarrossel}>
      <div className={s.veuTiktok} />

      <div className={s.trilhoTiktok}>
        <span className={s.avatarTrilho}>
          <img className={s.avatar} src={avatar} alt="" width={36} height={36} />
        </span>
        <Icone nome="Heart" tamanho={24} className={s.iconeClaro} />
        <Icone nome="ChatCircle" tamanho={24} className={s.iconeClaro} />
        <Icone nome="PaperPlaneTilt" tamanho={24} className={s.iconeClaro} />
      </div>

      <div className={s.rodapeTiktok}>
        <span className={s.nomeClaro}>@innerai</span>
        <Texto legenda={legenda} hashtags={hashtags} className={s.textoClaro} />
      </div>
    </MidiaDaPrevia>
  )
}

/* ----------------------------------------------------------------- LinkedIn */

/*
 * Sem desenho no Figma. Segue o app: card branco com borda, autor no topo,
 * mídia no meio e a fila de reações embaixo.
 */
function PreviaLinkedin({ formato, uploads, legenda, hashtags }) {
  const vertical = formato.comportamento === VIDEO

  return (
    <div className={s.cardLinkedin}>
      <div className={s.autorLinkedin}>
        <Perfil tamanho={40} />
        <Icone nome="DotsThree" tamanho={24} />
      </div>

      <Texto legenda={legenda} hashtags={hashtags} className={s.textoLinkedin} />

      <MidiaDaPrevia
        uploads={uploads}
        formato={vertical ? 'vertical' : 'feed'}
        carrossel={formato.comportamento === CARROSSEL}
      />

      <div className={s.reacoesLinkedin}>
        <span className={s.reacao}>
          <Icone nome="Heart" tamanho={20} />
          Gostei
        </span>
        <span className={s.reacao}>
          <Icone nome="ChatCircle" tamanho={20} className={s.espelhado} />
          Comentar
        </span>
        <span className={s.reacao}>
          <Icone nome="PaperPlaneTilt" tamanho={20} />
          Enviar
        </span>
      </div>
    </div>
  )
}
