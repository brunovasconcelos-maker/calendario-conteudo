/*
 * Legendas e hashtags de exemplo. Ainda não há IA por trás nem contexto do
 * negócio ou tom de voz: o "Regenerar" só sorteia outro item destas listas, e
 * o texto não tem relação com a imagem anexada.
 *
 * O primeiro de cada lista é o que aparece no Figma.
 */
const LEGENDAS = [
  'Sua empresa não precisa de mais uma ferramenta. Precisa de um time. Conheça o Squad e descubra o que a IA pode fazer por você.',
  'Menos tarefa repetida, mais tempo para o que importa. O Squad cuida do operacional enquanto você cuida da estratégia.',
  'Todo mundo fala em inteligência artificial. Poucos mostram o resultado. A gente prefere mostrar.',
  'Um time de agentes trabalhando pela sua marca, todo dia, sem parar. É assim que o Squad funciona.',
  'Da ideia ao post publicado sem trocar de ferramenta. Simples assim.',
]

const HASHTAGS = [
  '#SquadCom #InteligenciaArtificial #GestaoEmpresarial #AutomacaoDeNegocios #PMEs',
  '#InnerAI #MarketingDigital #ProdutividadeComIA #ConteudoInteligente',
  '#Squad #IAgenerativa #TransformacaoDigital #Negocios #Inovacao',
  '#SquadCom #AgentesDeIA #FuturoDoTrabalho #Automacao',
  '#InnerAI #EstrategiaDeConteudo #SocialMedia #IAnaPratica',
]

// Sorteia sempre diferente do que está na tela, senão "Regenerar" às vezes não
// faz nada visível e parece quebrado.
function sortear(lista, atual) {
  const outros = lista.filter((item) => item !== atual)
  const fonte = outros.length > 0 ? outros : lista
  return fonte[Math.floor(Math.random() * fonte.length)]
}

export function sortearLegenda(atual) {
  return sortear(LEGENDAS, atual)
}

export function sortearHashtags(atual) {
  return sortear(HASHTAGS, atual)
}
