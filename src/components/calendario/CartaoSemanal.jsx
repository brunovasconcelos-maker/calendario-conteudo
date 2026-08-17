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
 * Clicar ainda não faz nada — a tela de detalhe é passo futuro. Por isso é
 * <article>, e não botão: anunciar um botão que não age atrapalha quem navega
 * por leitor de tela.
 */
export default function CartaoSemanal({ post, agora }) {
  const postado = jaFoiPostado(post, agora)
  const capa = post.midias?.[0]
  const vertical = capa?.tipo === 'video' || post.formato === 'stories'

  return (
    <article className={`${s.cartao} ${postado ? s.postado : s.agendado}`}>
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
    </article>
  )
}
