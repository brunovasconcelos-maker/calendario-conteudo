import { Routes, Route } from 'react-router-dom'

import FluxoDePost from './components/FluxoDePost.jsx'
import ModalNovoPost from './components/ModalNovoPost.jsx'
import Home from './pages/Home.jsx'
import NovoPostFormatos from './pages/NovoPostFormatos.jsx'
import NovoPostLegenda from './pages/NovoPostLegenda.jsx'
import NovoPostRevisao from './pages/NovoPostRevisao.jsx'
import NovoPostUpload from './pages/NovoPostUpload.jsx'

/*
 * O fluxo de Novo Post é rota de verdade, e não estado solto:
 *
 * - /novo-post é filha de /, então o calendário continua montado atrás e o
 *   modal entra por cima, escurecendo o fundo.
 * - /novo-post/:plataforma é a escolha de formato, em página inteira.
 * - /novo-post/:plataforma/:formato é a criação em si, com uma rota por etapa
 *   pendurada no FluxoDePost — que é quem segura o que as etapas dividem.
 *
 * As etapas vão por nome, e não por número: a revisão é a terceira tela em
 * quase todo formato, mas a segunda no Stories, que pula a legenda.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="novo-post" element={<ModalNovoPost />} />
      </Route>
      <Route path="/novo-post/:plataforma" element={<NovoPostFormatos />} />
      <Route path="/novo-post/:plataforma/:formato" element={<FluxoDePost />}>
        <Route index element={<NovoPostUpload />} />
        <Route path="legenda" element={<NovoPostLegenda />} />
        <Route path="revisao" element={<NovoPostRevisao />} />
      </Route>
      <Route path="*" element={<h1>404 — Página não encontrada</h1>} />
    </Routes>
  )
}
