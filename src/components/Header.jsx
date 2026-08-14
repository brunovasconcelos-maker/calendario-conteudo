import s from './Header.module.css'

import chevron from '../assets/icons/Chevron.svg'
import arrowDown from '../assets/icons/Arrow-Down.svg'
import plus from '../assets/icons/Plus.svg'

/*
 * Header do calendário — só o visual, nada clica ainda.
 *
 * A seta de avançar é a mesma Chevron.svg girada 180° no CSS: o Figma exporta
 * duas instâncias do mesmo componente em rotações diferentes, e guardar dois
 * arquivos idênticos a menos do giro só dá manutenção dobrada.
 */
export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.linha}>
        <h1 className={s.titulo}>Calendário de Conteúdo</h1>

        <div className={s.controles}>
          <div className={s.mes}>
            <div className={s.setas}>
              <button type="button" className={s.seta} aria-label="Mês anterior">
                <img src={chevron} alt="" width={20} height={19} />
              </button>
              <button
                type="button"
                className={`${s.seta} ${s.setaProxima}`}
                aria-label="Próximo mês"
              >
                <img src={chevron} alt="" width={20} height={19} />
              </button>
            </div>
            <span className={s.mesLabel}>Março, 2026</span>
          </div>

          <button type="button" className={s.filtro}>
            <span className={s.filtroLabel}>Semanal</span>
            <img src={arrowDown} alt="" width={16} height={16} />
          </button>

          <button type="button" className={s.novoPost}>
            Novo Post
            <img src={plus} alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </header>
  )
}
