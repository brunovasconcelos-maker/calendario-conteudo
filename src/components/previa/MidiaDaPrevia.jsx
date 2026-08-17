import Icone from '../Icone.jsx'
import s from './MidiaDaPrevia.module.css'

/*
 * A mídia dentro de qualquer mockup: um arquivo só, ou o carrossel com setas e
 * bolinhas. É a mesma peça nas três plataformas — o que muda por fora é a
 * decoração de cada uma.
 *
 * `formato` escolhe a moldura: 'feed' é o 394x492,5 do post e do carrossel,
 * 'vertical' é o 256x455 do reel e do stories.
 *
 * O que vier em `children` fica por cima da mídia, que é onde entram as barras
 * do stories e o trilho de ícones do reel e do TikTok.
 */
export default function MidiaDaPrevia({
  uploads,
  formato = 'feed',
  carrossel = false,
  children,
}) {
  const atual = uploads.atual
  if (!atual) return null

  const molde = formato === 'vertical' ? s.vertical : s.feed

  return (
    <div className={s.bloco}>
      <div className={`${s.quadro} ${molde}`}>
        {carrossel ? (
          <div className={s.tira}>
            <div
              className={s.trilho}
              style={{ transform: `translateX(-${uploads.indice * 100}%)` }}
            >
              {uploads.itens.map((item) => (
                <img key={item.id} className={s.midia} src={item.url} alt={item.nome} />
              ))}
            </div>
          </div>
        ) : atual.tipo === 'video' ? (
          <video className={s.midia} src={atual.url} muted playsInline />
        ) : (
          <img className={s.midia} src={atual.url} alt={atual.nome} />
        )}

        {children}
      </div>

      {carrossel && (
        <>
          {uploads.temAnterior && (
            <button
              type="button"
              className={`${s.seta} ${s.setaEsquerda}`}
              aria-label="Imagem anterior"
              onClick={() => uploads.irPara(uploads.indice - 1)}
            >
              <Icone nome="CaretLeft" tamanho={24} />
            </button>
          )}
          {uploads.temProximo && (
            <button
              type="button"
              className={`${s.seta} ${s.setaDireita}`}
              aria-label="Próxima imagem"
              onClick={() => uploads.irPara(uploads.indice + 1)}
            >
              <Icone nome="CaretRight" tamanho={24} />
            </button>
          )}

          <div className={s.bolinhas}>
            {uploads.itens.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`${s.bolinha} ${i === uploads.indice ? s.bolinhaAtiva : ''}`}
                aria-label={`Ir para a imagem ${i + 1}`}
                aria-current={i === uploads.indice}
                onClick={() => uploads.irPara(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
