import LogoDaPlataforma from './LogoDaPlataforma.jsx'
import { rotuloCurtoDoFormato } from '../../lib/formatos.js'
import { jaFoiPostado } from '../../lib/postsSalvos.js'
import s from './CartaoMensal.module.css'

/*
 * O card do post na vista mensal (node 6016:4614): mais enxuto que o semanal —
 * selo da rede, tipo, horário e duas linhas de legenda. Sem miniatura, que na
 * célula do mês não caberia.
 *
 * Legenda vazia não sai, igual ao semanal. Clicar abre o detalhe, igual também.
 */
export default function CartaoMensal({ post, agora, onAbrir }) {
  const postado = jaFoiPostado(post, agora)

  return (
    <button
      type="button"
      className={`${s.cartao} ${postado ? s.postado : s.agendado}`}
      onClick={() => onAbrir(post.id)}
    >
      <div className={s.linha}>
        <LogoDaPlataforma plataforma={post.plataforma} tamanho={14} />
        <span className={s.tipo}>{rotuloCurtoDoFormato(post.formato)}</span>
        <span className={s.hora}>{post.hora}</span>
      </div>

      {post.legenda?.trim() && <p className={s.legenda}>{post.legenda}</p>}
    </button>
  )
}
