import { useCallback, useMemo, useRef, useState } from 'react'
import { ContextoDeAvisos } from '../hooks/useAvisos.js'
import s from './Avisos.module.css'

const DURACAO = 3200

export default function Avisos({ children }) {
  const [avisos, setAvisos] = useState([])
  const proximoId = useRef(0)

  const avisar = useCallback((mensagem) => {
    const id = (proximoId.current += 1)
    setAvisos((atuais) => [...atuais, { id, mensagem }])
    setTimeout(() => {
      setAvisos((atuais) => atuais.filter((aviso) => aviso.id !== id))
    }, DURACAO)
  }, [])

  const valor = useMemo(() => ({ avisar }), [avisar])

  return (
    <ContextoDeAvisos.Provider value={valor}>
      {children}
      {/* aria-live para quem usa leitor de tela ouvir a confirmação, já que ela
          aparece longe do que foi clicado e some sozinha. */}
      <div className={s.pilha} role="status" aria-live="polite">
        {avisos.map((aviso) => (
          <div key={aviso.id} className={s.aviso}>
            {aviso.mensagem}
          </div>
        ))}
      </div>
    </ContextoDeAvisos.Provider>
  )
}
