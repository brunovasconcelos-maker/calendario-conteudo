import { useEffect, useRef, useState } from 'react'
import Icone from './Icone.jsx'
import {
  horarioSugerido,
  paraCampoDeData,
  paraCampoDeHora,
} from '../lib/agendamento.js'
import s from './ModalAgendar.module.css'

/*
 * "Agende o Post": uma data e uma hora, do node 6008:2453.
 *
 * Os campos são os nativos de data e hora, e não texto livre. O Figma escreve
 * "11 Agosto 2026", mas um campo de texto nesse formato precisaria interpretar
 * o que a pessoa digita, e daria para salvar uma data que não existe. Com os
 * nativos, o navegador cuida do calendário, do teclado e do formato local — o
 * "por extenso" do Figma volta no aviso de confirmação.
 *
 * Sem `dataInicial` e `horaInicial` os campos abrem em hoje e no horário
 * sugerido, como na criação. O reagendar, que já tem um horário marcado, passa
 * o do post.
 */
export default function ModalAgendar({ onCancelar, onAgendar, dataInicial, horaInicial }) {
  const hoje = new Date()
  const [data, setData] = useState(() => dataInicial ?? paraCampoDeData(hoje))
  const [hora, setHora] = useState(() => horaInicial ?? paraCampoDeHora(horarioSugerido(hoje)))
  const caixaRef = useRef(null)

  useEffect(() => {
    const aoTeclar = (evento) => {
      if (evento.key === 'Escape') onCancelar()
    }

    document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  }, [onCancelar])

  return (
    <div
      className={s.scrim}
      onMouseDown={(evento) => {
        if (!caixaRef.current?.contains(evento.target)) onCancelar()
      }}
    >
      <div
        className={s.caixa}
        ref={caixaRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-agendar"
      >
        <div className={s.cabecalho}>
          <h2 className={s.titulo} id="titulo-agendar">
            Agende o Post
          </h2>
          <button type="button" className={s.fechar} aria-label="Fechar" onClick={onCancelar}>
            <Icone nome="Close" tamanho={24} />
          </button>
        </div>

        <div className={s.campos}>
          <input
            type="date"
            className={s.campo}
            aria-label="Data"
            value={data}
            onChange={(evento) => setData(evento.target.value)}
          />
          <input
            type="time"
            className={s.campo}
            aria-label="Hora"
            value={hora}
            onChange={(evento) => setHora(evento.target.value)}
          />
        </div>

        <div className={s.acoes}>
          <button type="button" className={s.cancelar} onClick={onCancelar}>
            Cancelar
          </button>
          <button
            type="button"
            className={s.agendar}
            disabled={!data || !hora}
            onClick={() => onAgendar({ data, hora })}
          >
            Agendar
          </button>
        </div>
      </div>
    </div>
  )
}
