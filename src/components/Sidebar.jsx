import s from './Sidebar.module.css'

import sidepanel from '../assets/icons/Sidepanel.svg'
import houseSimple from '../assets/icons/HouseSimple.svg'
import ferramentas from '../assets/icons/Ferramentas.svg'
import calendarHeart from '../assets/icons/CalendarHeart.svg'
import dotsThreeOutline from '../assets/icons/DotsThreeOutline.svg'
import gearSix from '../assets/icons/GearSix.svg'

import moduloAtual from '../assets/images/Group 63.png'
import avatarUm from '../assets/images/Frame 1000006139.png'
import avatarDois from '../assets/images/Frame 1000006140.png'

/*
 * Sidebar do calendário — só o visual, nada clica ainda.
 *
 * A ordem vem do Figma (node 6041:8499), de cima para baixo: alternar painel,
 * ícone do módulo, navegação, divisória, avatares e a engrenagem lá embaixo.
 *
 * A pilha de cima e a engrenagem ficam num space-between: no Figma a pilha vai
 * de 12 a 534 e a engrenagem de 868 a 916, ou seja, uma encostada em cada
 * ponta. Dentro da pilha as folgas entre blocos são de 26px.
 */
export default function Sidebar() {
  return (
    <aside className={s.sidebar}>
      <div className={s.pilha}>
        <div className={s.topo}>
          <button type="button" className={s.slotAlternar} aria-label="Alternar painel">
            <img src={sidepanel} alt="" width={24} height={24} />
          </button>

          {/* O PNG já vem com o anel de vidro embutido (é o Group 63 inteiro
              exportado), então o anel não é refeito em CSS: sairia dobrado.
              Tem 48px numa coluna de 44, e sobra 2px para cada lado. */}
          <img
            className={s.moduloIcone}
            src={moduloAtual}
            alt="Módulo atual"
            width={48}
            height={48}
          />
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
      </div>

      <button type="button" className={s.slotConfig} aria-label="Configurações">
        <img src={gearSix} alt="" width={24} height={24} />
      </button>
    </aside>
  )
}
