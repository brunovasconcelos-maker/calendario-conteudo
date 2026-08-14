import s from './Icone.module.css'

/*
 * Os SVGs de src/assets/icons, resolvidos pelo nome do arquivo — que é o nome
 * da layer no Figma. O glob varre a pasta em tempo de build, então basta o
 * arquivo existir para o ícone aparecer: nada a mudar no código.
 *
 * Ícone que ainda não chegou deixa o espaço vazio, do tamanho certo, e avisa
 * no console. Nada de cair num ícone parecido: o furo tem que aparecer na
 * revisão, não se disfarçar.
 */
const arquivos = import.meta.glob('../assets/icons/*.svg', {
  query: '?url',
  import: 'default',
  eager: true,
})

const icones = Object.fromEntries(
  Object.entries(arquivos).map(([caminho, url]) => [
    caminho.split('/').pop().replace('.svg', ''),
    url,
  ]),
)

export default function Icone({ nome, tamanho = 24, className }) {
  const url = icones[nome]

  if (!url) {
    console.warn(`Ícone "${nome}" não encontrado em src/assets/icons.`)
    return (
      <span
        aria-hidden="true"
        className={[s.vazio, className].filter(Boolean).join(' ')}
        style={{ width: tamanho, height: tamanho }}
      />
    )
  }

  return (
    <img
      src={url}
      alt=""
      width={tamanho}
      height={tamanho}
      className={[s.icone, className].filter(Boolean).join(' ')}
    />
  )
}
