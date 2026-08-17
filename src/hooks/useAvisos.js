import { createContext, useContext } from 'react'

/*
 * Os avisos curtos de confirmação. Vivem acima das rotas, no App, porque quem
 * dispara costuma sair da tela no mesmo clique — publicar um post avisa e volta
 * para o calendário, e um aviso preso à página iria embora junto com ela.
 */
export const ContextoDeAvisos = createContext(null)

export function useAvisos() {
  const contexto = useContext(ContextoDeAvisos)

  if (!contexto) {
    throw new Error('useAvisos precisa estar dentro de <Avisos>.')
  }

  return contexto
}
