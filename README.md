# Ramone Biasotto Advocacia — Website

Site institucional da advogada e empreendedora **Ramone Biasotto**, especialista em Direito Digital, LGPD, Cibersegurança e Compliance. O projeto apresenta suas áreas de atuação, serviços, obras publicadas e cobertura na mídia, com canais diretos de contato via WhatsApp e formulário.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + Vite 8 |
| Roteamento | React Router 7 |
| Estilização | SCSS Modules |
| CMS | Contentful (headless) |
| Carousel | Swiper 12 |
| Animações | tsparticles (hero background) |
| Linting | ESLint com plugins React Hooks + Refresh |

---

## Estrutura do projeto

```
src/
├── components/
│   ├── Navbar/              # Header responsivo com menu hamburger e CTA WhatsApp
│   ├── HeroSection/         # Banner principal com background de partículas
│   │   └── ParticlesBackground/
│   ├── QuemSouEu/           # Seção "Sobre" com bio e cards de estatísticas
│   ├── AreasAtuacao/        # 8 cards expandíveis de áreas de especialidade
│   ├── Servicos/            # 3 categorias de serviços com ícones
│   ├── NaMidia/             # Carousel de notícias via Contentful CMS
│   │   └── contentful.js    # Inicialização do cliente Contentful
│   ├── EbooksLivros/        # Cards de livros/e-books com expandir/recolher
│   ├── Footer/              # Contato, redes sociais, formulário WhatsApp e links legais
│   └── Institucionais/
│       ├── Politicas/       # Página de Política de Privacidade
│       └── TermosUso/       # Página de Termos de Uso
├── routes/
│   └── routes.tsx           # Configuração do React Router
├── utils/
│   └── whatsapp.js          # Links e mensagens pré-formatadas para WhatsApp
├── assets/                  # Imagens, ícones e SVGs
├── sass/
│   └── custom-mixins.scss   # Mixins globais SCSS
├── App.jsx
└── main.jsx
```

---

## Pré-requisitos

- Node.js 18+
- Yarn ou npm

---

## Instalação e execução

```bash
# Instalar dependências
yarn install

# Rodar em desenvolvimento
yarn dev

# Build de produção
yarn build

# Preview do build
yarn preview
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz com as credenciais do Contentful:

```env
VITE_CONTENTFUL_SPACE_ID=seu_space_id
VITE_CONTENTFUL_DELIVERY_TOKEN=seu_delivery_token
```

As notícias da seção **Na Mídia** são gerenciadas pelo Contentful usando o content type `naMidia`.

---

## Integrações

### Contentful CMS
A seção "Na Mídia" busca entradas do tipo `naMidia` ordenadas pela data de criação. Cada entrada utiliza os campos `imagemNoticia` (asset com título e imagem) e `textoNoticia` (rich text).

### WhatsApp
Links centralizados em `src/utils/whatsapp.js` com mensagens pré-formatadas para diferentes CTAs (contato geral, proposta, livros).

---

## Animações e UX

- **Scroll animations**: hook `useInView()` com `IntersectionObserver` para fade-in de seções ao entrar na viewport.
- **Text clamp**: seção Na Mídia trunca descrições em 6 linhas com botão "Ver mais / Ver menos", calculado dinamicamente pelo `scrollHeight`.
- **Partículas**: background animado na HeroSection via tsparticles.
