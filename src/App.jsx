import Avisos from './components/Avisos.jsx'
import AppRoutes from './routes.jsx'

// Os avisos ficam por fora das rotas: quem dispara um costuma sair da tela no
// mesmo clique, e o recado precisa continuar visível depois da troca de página.
export default function App() {
  return (
    <Avisos>
      <AppRoutes />
    </Avisos>
  )
}
