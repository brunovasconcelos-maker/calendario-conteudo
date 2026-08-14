import { useState } from 'react'
import CalendarioMensal from '../components/CalendarioMensal.jsx'
import CalendarioSemanal from '../components/CalendarioSemanal.jsx'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { diaLimpo, rotuloDoPeriodo, somaDias, somaMeses } from '../lib/datas.js'
import s from './Home.module.css'

export default function Home() {
  const [hoje] = useState(() => diaLimpo(new Date()))
  const [vista, setVista] = useState('semanal')
  const [referencia, setReferencia] = useState(hoje)

  // A seta anda de semana em semana ou de mês em mês, conforme a vista.
  const passo = (direcao) => {
    setReferencia((atual) =>
      vista === 'mensal' ? somaMeses(atual, direcao) : somaDias(atual, direcao * 7),
    )
  }

  return (
    <div className={s.layout}>
      <Sidebar />
      <div className={s.coluna}>
        <Header
          rotulo={rotuloDoPeriodo(referencia, vista)}
          vista={vista}
          onMudarVista={setVista}
          onAnterior={() => passo(-1)}
          onProximo={() => passo(1)}
        />
        <main className={s.principal}>
          {vista === 'mensal' ? (
            <CalendarioMensal referencia={referencia} hoje={hoje} />
          ) : (
            <CalendarioSemanal referencia={referencia} hoje={hoje} />
          )}
        </main>
      </div>
    </div>
  )
}
