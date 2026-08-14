import { Routes, Route } from 'react-router-dom'

import ModalNovoPost from './components/ModalNovoPost.jsx'
import Home from './pages/Home.jsx'
import NovoPostEtapa2 from './pages/NovoPostEtapa2.jsx'
import NovoPostFormatos from './pages/NovoPostFormatos.jsx'
import NovoPostUpload from './pages/NovoPostUpload.jsx'

/*
 * O fluxo de Novo Post é rota de verdade, e não estado solto:
 *
 * - /novo-post é filha de /, então o calendário continua montado atrás e o
 *   modal entra por cima, escurecendo o fundo.
 * - /novo-post/:plataforma é página inteira, fora do calendário.
 *
 * A criação em si vive em /novo-post/:plataforma/:formato, uma rota por etapa.
 * São nove caminhos de formato, mas uma página só serve todos: o que muda vem
 * de src/lib/formatos.js.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="novo-post" element={<ModalNovoPost />} />
      </Route>
      <Route path="/novo-post/:plataforma" element={<NovoPostFormatos />} />
      <Route path="/novo-post/:plataforma/:formato" element={<NovoPostUpload />} />
      <Route path="/novo-post/:plataforma/:formato/etapa-2" element={<NovoPostEtapa2 />} />
      <Route path="*" element={<h1>404 — Página não encontrada</h1>} />
    </Routes>
  )
}
