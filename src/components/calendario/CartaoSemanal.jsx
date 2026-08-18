import Icone from '../Icone.jsx'
import LogoDaPlataforma from './LogoDaPlataforma.jsx'
import { rotuloCurtoDoFormato } from '../../lib/formatos.js'
import { jaFoiPostado } from '../../lib/postsSalvos.js'
import s from './CartaoSemanal.module.css'

/*
 * O card do post na vista semanal (node 6016:3346): selo da rede, "Postado"
 * quando já passou da hora, tipo e horário, miniatura e um resumo da legenda.
 *
 * Legenda vazia não vira caixa vazia nem texto de enfeite: a linha simplesmente
 * não sai.
 *
 * Clicar abre o detalhe do post, então agora é botão de verdade: quem navega
 * por teclado ou leitor de tela chega nele e ouve o que ele faz.
 */
export default function CartaoSemanal({ post, agora, onAbrir }) {
  const postado = jaFoiPostado(post, agora)
  const capa = post.midias?.[0]
  const vertical = capa?.tipo === 'video' || post.formato === 'stories'

  return (
    <button
      type="button"
      className={`${s.cartao} ${postado ? s.postado : s.agendado}`}
      onClick={() => onAbrir(post.id)}
    >
      <div className={s.topo}>
        <LogoDaPlataforma plataforma={post.plataforma} tamanho={24} />
        {postado && (
          <span className={s.selo}>
            Postado
            <Icone nome="Check" tamanho={10} />
          </span>
        )}
      </div>

      <div className={s.linha}>
        <span className={s.tipo}>{rotuloCurtoDoFormato(post.formato)}</span>
        <span className={s.hora}>{post.hora}</span>
      </div>

      <div className={`${s.moldura} ${vertical ? s.molduraVertical : ''}`}>
        {capa?.thumb && <img className={s.miniatura} src={capa.thumb} alt="" />}
      </div>

      {post.legenda?.trim() && <p className={s.legenda}>{post.legenda}</p>}
    </button>
  )
}
