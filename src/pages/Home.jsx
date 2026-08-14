import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import s from './Home.module.css'

export default function Home() {
  return (
    <div className={s.layout}>
      <Sidebar />
      <div className={s.coluna}>
        <Header />
        {/* A grade do calendário entra aqui num próximo passo. */}
        <main className={s.principal} />
      </div>
    </div>
  )
}
