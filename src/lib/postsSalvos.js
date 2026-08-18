/*
 * Os posts criados, guardados no navegador.
 *
 * Uma camada só de leitura e escrita, para a tela não falar com o localStorage
 * direto — quando isso virar API, muda só aqui.
 */
const CHAVE = 'squad-calendario-posts'
const EVENTO = 'squad-calendario-posts-mudou'

export function lerPosts() {
  try {
    const cru = localStorage.getItem(CHAVE)
    const lista = cru ? JSON.parse(cru) : []
    // Conteúdo estranho na chave não pode derrubar o calendário.
    return Array.isArray(lista) ? lista : []
  } catch {
    return []
  }
}

/*
 * Grava a lista inteira. Devolve true quando gravou. Falha de cota devolve
 * false em vez de estourar: quem chamou decide o que dizer, e o fluxo de
 * publicar não quebra por causa do armazenamento.
 */
function gravar(lista) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista))
    // Avisa as telas abertas nesta aba; o 'storage' do navegador só cobre as
    // outras.
    window.dispatchEvent(new Event(EVENTO))
    return true
  } catch (erro) {
    console.error('Não foi possível salvar o post no navegador.', erro)
    return false
  }
}

export function salvarPost(post) {
  return gravar([...lerPosts(), post])
}

/*
 * Troca alguns campos de um post e regrava. Apagar já ocupava espaço, então
 * mudar data e hora nunca esbarra na cota — mas o retorno segue o mesmo
 * contrato do salvar, para quem chama não precisar saber disso.
 */
export function atualizarPost(id, mudancas) {
  return gravar(lerPosts().map((post) => (post.id === id ? { ...post, ...mudancas } : post)))
}

export function apagarPost(id) {
  return gravar(lerPosts().filter((post) => post.id !== id))
}

export function ouvirPosts(aoMudar) {
  const daOutraAba = (evento) => {
    if (evento.key === CHAVE) aoMudar()
  }

  window.addEventListener(EVENTO, aoMudar)
  window.addEventListener('storage', daOutraAba)

  return () => {
    window.removeEventListener(EVENTO, aoMudar)
    window.removeEventListener('storage', daOutraAba)
  }
}

/*
 * Data e hora ficam em campos separados, no formato dos próprios inputs
 * ('2026-08-17' e '15:00'). Guardar um instante em UTC daria o dia errado para
 * quem está a oeste de Greenwich, e o calendário é todo em dia local.
 */
export function quandoDoPost(post) {
  const [ano, mes, dia] = post.data.split('-').map(Number)
  const [hora, minuto] = post.hora.split(':').map(Number)
  return new Date(ano, mes - 1, dia, hora, minuto)
}

// Passou da hora, é "Postado". Vale para os dois casos: o que foi publicado na
// hora e o que foi agendado e já venceu.
export function jaFoiPostado(post, agora = new Date()) {
  return quandoDoPost(post) <= agora
}

export function postsDoDia(posts, dia) {
  const alvo = `${dia.getFullYear()}-${String(dia.getMonth() + 1).padStart(2, '0')}-${String(
    dia.getDate(),
  ).padStart(2, '0')}`

  return posts
    .filter((post) => post.data === alvo)
    .sort((a, b) => a.hora.localeCompare(b.hora))
}
