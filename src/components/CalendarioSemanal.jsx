import CartaoSemanal from './calendario/CartaoSemanal.jsx'
import { usePosts } from '../hooks/usePosts.js'
import { DIAS_DA_SEMANA, mesmoDia, semanaDe } from '../lib/datas.js'
import { postsDoDia } from '../lib/postsSalvos.js'
import s from './CalendarioSemanal.module.css'

/*
 * Uma semana, de domingo a sábado, com os posts salvos de cada dia.
 *
 * O cabeçalho dos dias e o corpo usam a mesma régua de sete colunas
 * (--colunas-semana), então o número do dia fica sempre em cima da sua
 * coluna, em qualquer largura de tela.
 */
export default function CalendarioSemanal({ referencia, hoje }) {
  const dias = semanaDe(referencia)
  const posts = usePosts()
  // Uma leitura só do relógio para toda a grade: assim dois cards do mesmo
  // instante não caem em estados diferentes.
  const agora = new Date()

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
          faixas de horário continuarem alinhadas. */}
      <div className={s.corpo}>
        <div className={s.colunas}>
          {dias.map((dia) => (
            <div key={dia.toISOString()} className={s.coluna}>
              {postsDoDia(posts, dia).map((post) => (
                <CartaoSemanal key={post.id} post={post} agora={agora} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
