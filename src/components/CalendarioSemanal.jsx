import { DIAS_DA_SEMANA, mesmoDia, semanaDe } from '../lib/datas.js'
import s from './CalendarioSemanal.module.css'

/*
 * Uma semana, de domingo a sábado. Só a grade: os dias estão vazios de
 * propósito, os cards entram depois.
 *
 * O cabeçalho dos dias e o corpo usam a mesma régua de sete colunas
 * (--colunas-semana), então o número do dia fica sempre em cima da sua
 * coluna, em qualquer largura de tela.
 */
export default function CalendarioSemanal({ referencia, hoje }) {
  const dias = semanaDe(referencia)

  return (
    <section className={s.calendario} aria-label="Semana">
      <div className={s.cabecalho}>
        {dias.map((dia) => {
          const ehHoje = mesmoDia(dia, hoje)

          return (
            <div key={dia.toISOString()} className={s.diaCabecalho}>
              <span className={s.nome}>{DIAS_DA_SEMANA[dia.getDay()]}</span>
              <span className={`${s.numero} ${ehHoje ? s.numeroHoje : ''}`}>
                {dia.getDate()}
              </span>
            </div>
          )
        })}
      </div>

      {/* Rola junto: as sete colunas sobem e descem como um bloco só, para as
          faixas de horário continuarem alinhadas quando os cards existirem. */}
      <div className={s.corpo}>
        <div className={s.colunas}>
          {dias.map((dia) => (
            <div key={dia.toISOString()} className={s.coluna} />
          ))}
        </div>
      </div>
    </section>
  )
}
