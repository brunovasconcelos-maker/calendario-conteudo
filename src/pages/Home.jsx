import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import CalendarioMensal from '../components/CalendarioMensal.jsx'
import CalendarioSemanal from '../components/CalendarioSemanal.jsx'
import Header from '../components/Header.jsx'
import ModalDoPost from '../components/calendario/ModalDoPost.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { diaLimpo, rotuloDoPeriodo, somaDias, somaMeses } from '../lib/datas.js'
import s from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()
  const [hoje] = useState(() => diaLimpo(new Date()))
  const [vista, setVista] = useState('semanal')
  const [referencia, setReferencia] = useState(hoje)
  // Guarda o id, e não o post: o detalhe relê a lista sozinho, então ele
  // continua certo depois de reagendar ou publicar dali de dentro.
  const [postAberto, setPostAberto] = useState(null)

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
          onNovoPost={() => navigate('/novo-post')}
        />
        <main className={s.principal}>
          {vista === 'mensal' ? (
            <CalendarioMensal
              referencia={referencia}
              hoje={hoje}
              onAbrirPost={setPostAberto}
            />
          ) : (
            <CalendarioSemanal
              referencia={referencia}
              hoje={hoje}
              onAbrirPost={setPostAberto}
            />
          )}
        </main>
      </div>

      {postAberto && (
        <ModalDoPost postId={postAberto} onFechar={() => setPostAberto(null)} />
      )}

      {/* O modal de /novo-post entra aqui, por cima do calendário. */}
      <Outlet />
    </div>
  )
}
