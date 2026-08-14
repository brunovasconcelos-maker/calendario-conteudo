import logoInstagram from '../assets/images/skill-icons_instagram.png'
import logoTiktok from '../assets/images/ic_baseline-tiktok.png'
import logoLinkedin from '../assets/images/devicon_linkedin.png'

/*
 * As plataformas do fluxo de Novo Post e os formatos de cada uma. É daqui que
 * saem o modal, as rotas e as páginas de formato — mexer numa plataforma é
 * mexer só neste arquivo.
 *
 * Os nomes seguem o texto do Figma ("Tiktok", "Linkedin", sem o caixa-alta do
 * meio que as marcas usam).
 *
 * A quebra de linha em "Post\nÚnico" é do próprio Figma, que desenha esse
 * rótulo em duas linhas enquanto os outros ficam numa.
 */
export const PLATAFORMAS = {
  instagram: {
    id: 'instagram',
    nome: 'Instagram',
    logo: logoInstagram,
    formatos: [
      { id: 'post-unico', nome: 'Post\nÚnico', icone: 'ImageSquare' },
      { id: 'carrossel', nome: 'Carrossel', icone: 'Slideshow' },
      { id: 'reels', nome: 'Reels', icone: 'PlayCircle' },
      { id: 'stories', nome: 'Stories', icone: 'ClockClockwise' },
    ],
  },
  tiktok: {
    id: 'tiktok',
    nome: 'Tiktok',
    logo: logoTiktok,
    // O frame do Figma ainda traz quatro cards, herdados do Instagram
    // (inclusive Stories). Valem os dois combinados para o TikTok.
    formatos: [
      { id: 'video', nome: 'Vídeo', icone: 'PlayCircle' },
      { id: 'carrossel', nome: 'Carrossel', icone: 'Slideshow' },
    ],
  },
  linkedin: {
    id: 'linkedin',
    nome: 'Linkedin',
    logo: logoLinkedin,
    formatos: [
      { id: 'post-unico', nome: 'Post\nÚnico', icone: 'ImageSquare' },
      { id: 'carrossel', nome: 'Carrossel', icone: 'Slideshow' },
      { id: 'video', nome: 'Vídeo', icone: 'PlayCircle' },
    ],
  },
}

export const ORDEM_DAS_PLATAFORMAS = ['instagram', 'tiktok', 'linkedin']
