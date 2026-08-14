import { useEffect, useRef, useState } from 'react'
import s from './Header.module.css'

import chevron from '../assets/icons/Chevron.svg'
import arrowDown from '../assets/icons/Arrow-Down.svg'
import plus from '../assets/icons/Plus.svg'

const VISTAS = [
  { id: 'semanal', rotulo: 'Semanal' },
  { id: 'mensal', rotulo: 'Mensal' },
]

/*
 * Header do calendário. As setas e o filtro já funcionam; o "Novo Post" ainda
 * não leva a lugar nenhum.
 *
 * A seta de avançar é a mesma Chevron.svg girada 180° no CSS: o Figma exporta
 * duas instâncias do mesmo componente em rotações diferentes, e guardar dois
 * arquivos iguais a menos do giro só dá manutenção dobrada.
 */
export default function Header({ rotulo, vista, onMudarVista, onAnterior, onProximo }) {
  const [aberto, setAberto] = useState(false)
  const filtroRef = useRef(null)

  // Clique fora e Esc fecham o menu, igual ao TopBar do squad-identidade-visual.
  useEffect(() => {
    if (!aberto) return undefined

    const aoClicar = (evento) => {
      if (!filtroRef.current?.contains(evento.target)) setAberto(false)
    }
    const aoTeclar = (evento) => {
      if (evento.key === 'Escape') setAberto(false)
    }

    document.addEventListener('mousedown', aoClicar)
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.removeEventListener('mousedown', aoClicar)
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [aberto])

  const vistaAtual = VISTAS.find((opcao) => opcao.id === vista)

  return (
    <header className={s.header}>
      <div className={s.linha}>
        <h1 className={s.titulo}>Calendário de Conteúdo</h1>

        <div className={s.controles}>
          <div className={s.mes}>
            <div className={s.setas}>
              <button
                type="button"
                className={s.seta}
                aria-label={vista === 'mensal' ? 'Mês anterior' : 'Semana anterior'}
                onClick={onAnterior}
              >
                <img src={chevron} alt="" width={20} height={19} />
              </button>
              <button
                type="button"
                className={`${s.seta} ${s.setaProxima}`}
                aria-label={vista === 'mensal' ? 'Próximo mês' : 'Próxima semana'}
                onClick={onProximo}
              >
                <img src={chevron} alt="" width={20} height={19} />
              </button>
            </div>
            <span className={s.mesLabel}>{rotulo}</span>
          </div>

          <div className={s.filtro} ref={filtroRef}>
            <button
              type="button"
              className={s.filtroBotao}
              aria-haspopup="menu"
              aria-expanded={aberto}
              onClick={() => setAberto((estava) => !estava)}
            >
              <span className={s.filtroLabel}>{vistaAtual.rotulo}</span>
              <img src={arrowDown} alt="" width={16} height={16} />
            </button>

            {aberto && (
              <div className={s.opcoes} role="menu">
                {VISTAS.map((opcao) => (
                  <button
                    key={opcao.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={opcao.id === vista}
                    className={`${s.opcao} ${opcao.id === vista ? s.opcaoAtiva : ''}`}
                    onClick={() => {
                      setAberto(false)
                      onMudarVista(opcao.id)
                    }}
                  >
                    {opcao.rotulo}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="button" className={s.novoPost}>
            Novo Post
            <img src={plus} alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </header>
  )
}
