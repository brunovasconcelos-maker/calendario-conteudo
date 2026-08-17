import { useEffect, useState } from 'react'
import { lerPosts, ouvirPosts } from '../lib/postsSalvos.js'

/*
 * Os posts guardados, já reagindo a quem salvar. Publicar volta para o
 * calendário na mesma navegação, então a lista precisa se atualizar sozinha —
 * e a assinatura ainda cobre outra aba mexendo na mesma chave.
 */
export function usePosts() {
  const [posts, setPosts] = useState(lerPosts)

  useEffect(() => ouvirPosts(() => setPosts(lerPosts())), [])

  return posts
}
