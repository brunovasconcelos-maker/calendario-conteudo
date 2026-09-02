/*
 * Os posts criados, guardados no navegador.
 *
 * Uma camada só de leitura e escrita, para a tela não falar com o localStorage
 * direto — quando isso virar API, muda só aqui.
 */
const CHAVE = 'squad-calendario-posts'
const EVENTO = 'squad-calendario-posts-mudou'

const FORMATO_DA_DATA = /^\d{4}-\d{2}-\d{2}$/
const FORMATO_DA_HORA = /^\d{2}:\d{2}$/

/*
 * O mínimo para um post atravessar o calendário sem quebrar nada: um objeto com
 * id, e com data e hora nos formatos que o resto do código desmonta com split.
 *
 * O que falta aqui é o que estoura em quem lê — postsDoDia compara `post.data`
 * e ordena por `post.hora`, quandoDoPost fatia as duas. Um item nulo ou sem
 * esses campos derrubaria a grade inteira.
 *
 * Os outros campos não entram na conta: legenda, mídias e plataforma já são
 * lidos com tolerância a ausência, e barrar um post por causa deles esconderia
 * do calendário algo que dava para mostrar.
 */
function postUsavel(post) {
  return (
    typeof post === 'object' &&
    post !== null &&
    typeof post.id === 'string' &&
    typeof post.data === 'string' &&
    FORMATO_DA_DATA.test(post.data) &&
    typeof post.hora === 'string' &&
    FORMATO_DA_HORA.test(post.hora)
  )
}

/*
 * Conteúdo estranho na chave não pode derrubar o calendário — nem quando é a
 * chave inteira (JSON quebrado, um objeto no lugar da lista), nem quando é um
 * item solto dentro de uma lista boa.
 *
 * O que não serve é descartado na leitura, e some de vez na próxima gravação:
 * salvar, atualizar e apagar regravam o que esta função devolveu.
 */
export function lerPosts() {
  try {
    const cru = localStorage.getItem(CHAVE)
    const lista = cru ? JSON.parse(cru) : []
    if (!Array.isArray(lista)) return []

    const usaveis = lista.filter(postUsavel)
    if (usaveis.length !== lista.length) {
      console.warn(
        `${lista.length - usaveis.length} post(s) inválido(s) foram ignorados em ${CHAVE}.`,
      )
    }

    return usaveis
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
