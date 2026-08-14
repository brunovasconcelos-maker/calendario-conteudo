import { Routes, Route } from 'react-router-dom'

import ModalNovoPost from './components/ModalNovoPost.jsx'
import Home from './pages/Home.jsx'
import NovoPostFormatos from './pages/NovoPostFormatos.jsx'

/*
 * O fluxo de Novo Post é rota de verdade, e não estado solto:
 *
 * - /novo-post é filha de /, então o calendário continua montado atrás e o
 *   modal entra por cima, escurecendo o fundo.
 * - /novo-post/:plataforma é página inteira, fora do calendário.
 *
 * A tela de criação de cada formato entra depois, pendurada em
 * /novo-post/:plataforma/:formato.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="novo-post" element={<ModalNovoPost />} />
      </Route>
      <Route path="/novo-post/:plataforma" element={<NovoPostFormatos />} />
      <Route path="*" element={<h1>404 — Página não encontrada</h1>} />
    </Routes>
  )
}
