import s from './AssetPlaceholder.module.css'

/*
 * Buraco visível para asset que ainda não existe em src/assets.
 * Existe de propósito para gritar na tela: nada de cair num ícone genérico
 * parecido e o furo passar despercebido na revisão. O `nome` é o nome da
 * layer no Figma, para achar o arquivo que falta.
 */
export default function AssetPlaceholder({ nome, tamanho = 24 }) {
  return (
    <span
      className={s.placeholder}
      style={{ width: tamanho, height: tamanho }}
      title={`Asset faltando: ${nome}`}
      role="img"
      aria-label={`Asset faltando: ${nome}`}
    >
      ?
    </span>
  )
}
