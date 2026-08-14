import AssetPlaceholder from './AssetPlaceholder.jsx'
import s from './Sidebar.module.css'

import sidepanel from '../assets/icons/Sidepanel.svg'
import houseSimple from '../assets/icons/HouseSimple.svg'
import ferramentas from '../assets/icons/Ferramentas.svg'
import calendarHeart from '../assets/icons/CalendarHeart.svg'
import dotsThreeOutline from '../assets/icons/DotsThreeOutline.svg'
import megaphoneSimple from '../assets/icons/MegaphoneSimple.svg'
import userCheck from '../assets/icons/UserCheck.svg'
import stack from '../assets/icons/Stack.svg'
import gearSix from '../assets/icons/GearSix.svg'

import moduloAtual from '../assets/images/Group 63.png'
import avatarUm from '../assets/images/Frame 1000006139.png'
import avatarDois from '../assets/images/Frame 1000006140.png'

/*
 * Sidebar do calendário — só o visual, nada clica ainda.
 *
 * A ordem vem do Figma (node 6041:8499), de cima para baixo: alternar painel,
 * ícone do módulo atual, "+", navegação, divisória, avatares, divisória,
 * navegação de baixo, divisória e engrenagem.
 *
 * Os sete blocos ficam num space-between: no Figma as folgas entre eles são
 * todas de 25,71px, que é exatamente a sobra dos 928px de altura dividida
 * pelos sete vãos. Ou seja, é distribuição, não gap fixo.
 */
export default function Sidebar() {
  return (
    <aside className={s.sidebar}>
      <div className={s.topo}>
        <button type="button" className={s.slotAlternar} aria-label="Alternar painel">
          <img src={sidepanel} alt="" width={24} height={24} />
        </button>

        <div className={s.modulo}>
          {/* O PNG já vem com o anel de vidro embutido (é o Group 63 inteiro
              exportado), então o anel não é refeito em CSS: sairia dobrado. */}
          <img
            className={s.moduloIcone}
            src={moduloAtual}
            alt="Módulo atual"
            width={48}
            height={48}
          />
          <button type="button" className={s.adicionar} aria-label="Adicionar">
            {/* Falta o Tool 1.svg em src/assets/icons. */}
            <AssetPlaceholder nome="Tool 1" tamanho={24} />
          </button>
        </div>
      </div>

      <nav className={s.navegacao} aria-label="Navegação principal">
        <button type="button" className={s.slot} aria-label="Início">
          <img src={houseSimple} alt="" width={24} height={24} />
        </button>
        <button type="button" className={s.slot} aria-label="Ferramentas">
          <img src={ferramentas} alt="" width={21} height={21} />
        </button>
        <button
          type="button"
          className={`${s.slot} ${s.slotAtivo}`}
          aria-label="Calendário"
          aria-current="page"
        >
          <img src={calendarHeart} alt="" width={24} height={24} />
        </button>
      </nav>

      <hr className={s.divisor} />

      <div className={s.avatares}>
        <button type="button" className={s.slot} aria-label="Maky">
          <img className={s.avatar} src={avatarUm} alt="" width={40} height={40} />
        </button>
        <button type="button" className={s.slot} aria-label="Personagem">
          <img className={s.avatar} src={avatarDois} alt="" width={40} height={40} />
        </button>
        <button type="button" className={s.slot} aria-label="Mais personagens">
          <img src={dotsThreeOutline} alt="" width={24} height={24} />
        </button>
      </div>

      <hr className={s.divisor} />

      <nav className={s.navegacao} aria-label="Navegação secundária">
        <button type="button" className={s.slot} aria-label="Campanhas">
          <img src={megaphoneSimple} alt="" width={24} height={24} />
        </button>
        <button type="button" className={s.slot} aria-label="Aprovações">
          <img src={userCheck} alt="" width={24} height={24} />
        </button>
        <button type="button" className={s.slot} aria-label="Coleções">
          <img src={stack} alt="" width={24} height={24} />
        </button>
        <button type="button" className={s.slot} aria-label="Mais">
          <img src={dotsThreeOutline} alt="" width={24} height={24} />
        </button>
      </nav>

      <hr className={s.divisor} />

      <button type="button" className={s.slotConfig} aria-label="Configurações">
        <img src={gearSix} alt="" width={24} height={24} />
      </button>
    </aside>
  )
}
