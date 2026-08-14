import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Icone from '../components/Icone.jsx'
import { PLATAFORMAS } from '../lib/plataformas.js'
import s from './NovoPostFormatos.module.css'

/*
 * Os formatos de uma plataforma, em página inteira. Uma página só serve as
 * três: o que muda vem de src/lib/plataformas.js.
 *
 * Cada card abre a etapa 1 do formato, em /novo-post/:plataforma/:formato.
 */
export default function NovoPostFormatos() {
  const { plataforma: id } = useParams()
  const navigate = useNavigate()
  const plataforma = PLATAFORMAS[id]

  // Plataforma que não existe volta ao calendário em vez de renderizar vazio.
  if (!plataforma) return <Navigate to="/" replace />

  return (
    <div className={s.pagina}>
      <header className={s.cabecalho}>
        <h1 className={s.titulo}>Novo Post {plataforma.nome}</h1>
        <button
          type="button"
          className={s.fechar}
          aria-label="Fechar"
          onClick={() => navigate('/')}
        >
          <Icone nome="Close" tamanho={24} />
        </button>
      </header>

      <main className={s.conteudo}>
        <div className={s.formatos}>
          {plataforma.formatos.map((formato) => (
            <button
              key={formato.id}
              type="button"
              className={s.card}
              onClick={() => navigate(`/novo-post/${id}/${formato.id}`)}
            >
              <span className={s.topo}>
                <span className={s.selo}>
                  <Icone nome={formato.icone} tamanho={24} />
                </span>
                <Icone nome="ArrowUpRight" tamanho={24} />
              </span>
              <span className={s.nome}>{formato.nome}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
