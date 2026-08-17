import { useEffect, useRef } from 'react'
import CartaoMensal from './calendario/CartaoMensal.jsx'
import { usePosts } from '../hooks/usePosts.js'
import { DIAS_DA_SEMANA, mesmoDia, semanasDoMes } from '../lib/datas.js'
import { postsDoDia } from '../lib/postsSalvos.js'
import s from './CalendarioMensal.module.css'

/*
 * O mês inteiro, uma linha por semana, com os posts salvos de cada dia.
 *
 * O cabeçalho dos dias fica fora da área que rola, então ele não sai da tela
 * quando as semanas sobem.
 */
export default function CalendarioMensal({ referencia, hoje }) {
  const semanas = semanasDoMes(referencia)
  const mesCorrente = referencia.getMonth()
  const corpoRef = useRef(null)
  const posts = usePosts()
  const agora = new Date()

  // Trocou de mês, a rolagem volta ao topo: o dia 1º está sempre na primeira
  // linha, então é ali que a visão precisa estar ancorada.
  const chaveDoMes = `${referencia.getFullYear()}-${mesCorrente}`
  useEffect(() => {
    corpoRef.current?.scrollTo({ top: 0 })
  }, [chaveDoMes])

  return (
    <section className={s.calendario} aria-label="Mês">
      <div className={s.cabecalho}>
        {DIAS_DA_SEMANA.map((nome) => (
          <span key={nome} className={s.nome}>
            {nome}
          </span>
        ))}
      </div>

      <div className={s.corpo} ref={corpoRef}>
        {semanas.map((semana) => (
          <div key={semana[0].toISOString()} className={s.semana}>
            {semana.map((dia) => {
              const foraDoMes = dia.getMonth() !== mesCorrente
              const ehHoje = mesmoDia(dia, hoje)

              return (
                <div
                  key={dia.toISOString()}
                  className={`${s.dia} ${foraDoMes ? s.diaForaDoMes : ''}`}
                >
                  <span className={`${s.numero} ${ehHoje ? s.numeroHoje : ''}`}>
                    {dia.getDate()}
                  </span>

                  <div className={s.cartoes}>
                    {postsDoDia(posts, dia).map((post) => (
                      <CartaoMensal key={post.id} post={post} agora={agora} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
