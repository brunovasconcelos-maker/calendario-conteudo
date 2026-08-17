import Icone from '../Icone.jsx'
import s from './LogoDaPlataforma.module.css'

/*
 * O selo da rede no card.
 *
 * O Instagram vai solto; o TikTok e o Linkedin vão dentro de um círculo cinza,
 * como o Figma desenha. O logo do Instagram é o Vector.svg — que é o nome que a
 * layer tem no card do mensal, e o mesmo desenho serve no semanal em 24px, já
 * que é vetor.
 */
const LOGOS = {
  instagram: 'Vector',
  tiktok: 'TiktokLogo',
  linkedin: 'LinkedinLogo',
}

export default function LogoDaPlataforma({ plataforma, tamanho = 24 }) {
  const nome = LOGOS[plataforma] ?? LOGOS.instagram

  if (plataforma === 'instagram') {
    return <Icone nome={nome} tamanho={tamanho} />
  }

  return (
    <span className={s.circulo} style={{ width: tamanho, height: tamanho }}>
      <Icone nome={nome} tamanho={Math.round(tamanho * 0.58)} />
    </span>
  )
}
