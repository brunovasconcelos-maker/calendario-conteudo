# Squad — Calendário de Conteúdo

Scaffold React + Vite com react-router-dom, publicado no GitHub Pages.

Site: https://brunovasconcelos-maker.github.io/calendario-conteudo/

## Rodando local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build    # gera dist/ (inclui o 404.html de fallback da SPA)
npm run preview  # serve o dist/ com o mesmo base do Pages
```

## Deploy

O deploy é feito pelo GitHub Actions (`.github/workflows/deploy.yml`) a cada
push na `main`. É preciso ter o Pages ligado em Settings → Pages com
**Source: GitHub Actions**.

O `base` do Vite (`vite.config.js`) é `/calendario-conteudo/` em produção,
igual ao nome do repositório — se o repositório for renomeado, o `base`
precisa acompanhar.

## Estrutura

```
src/
  pages/       páginas de rota (Home)
  components/  componentes compartilhados
  assets/      imagens e arquivos estáticos importados pelo bundler
  routes.jsx   mapa de rotas
```
