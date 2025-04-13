# Game List Frontend

Frontend em **React** + **TypeScript** para consumo de uma API desenvolvida em Java Spring Boot. Este projeto permite listar, cadastrar e gerenciar jogos de forma simples, com interface amigável.

## Sumário

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Instalação](#instalação)
5. [Como Executar](#como-executar)
6. [Configuração da API](#configuração-da-api)
7. [Links Importantes](#links-importantes)
8. [Funcionalidades Principais](#funcionalidades-principais)
9. [Build para Produção](#build-para-produção)
10. [Contribuição](#contribuição)

---

## Sobre o Projeto

O **Game List Frontend** foi criado para interagir com uma API que gerencia cadastros de jogos (título, plataforma, gênero etc.). A aplicação lista todos os jogos cadastrados e permite sua manipulação (adicionar, consultar, remover, etc.). Faz parte de uma prática de desenvolvimento Full Stack.

## Tecnologias Utilizadas

- **React** (criado com [Vite](https://vitejs.dev/))
- **TypeScript**
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/en/main)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) (para gerenciamento de dependências)

## Estrutura de Pastas

```plaintext
game-list-frontend/
├─ public/
├─ src/
│  ├─ assets/             # Imagens, ícones e outros arquivos estáticos
│  ├─ components/         # Componentes reutilizáveis
│  ├─ pages/              # Páginas principais da aplicação
│  ├─ services/           # Configuração do Axios ou serviços de API
│  ├─ types/              # Definições de tipos TypeScript
│  ├─ App.tsx             # Componente raiz
│  └─ main.tsx            # Ponto de entrada
├─ .gitignore
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## Instalação

1. **Clone** este repositório:

   ```bash
   git clone https://github.com/caiovilquer/game-list-frontend.git
   ```
   
2. **Acesse a pasta** do projeto:

   ```bash
   cd game-list-frontend
   ```

3. **Instale as dependências**:

   ```bash
   npm install
   ```
   
## Como Executar

Após instalar as dependências, você pode rodar o servidor de desenvolvimento:

```bash
npm run dev
```
   
A aplicação estará disponível em `http://localhost:5173/` (ou outra porta indicada no terminal).

## Configuração da API

Por padrão, este frontend faz requisições para `http://localhost:8080/games`. Caso você queira apontar para outra URL, verifique o(s) arquivo(s) em `src/services/` (ou crie variáveis de ambiente) para alterar o endpoint base da API.

A API **Game List Backend** está disponível em:
- Repositório GitHub: [game-list-backend](https://github.com/caiovilquer/game-list-backend)
- Endereço local padrão: `http://localhost:8080/games`

## Links Importantes

- **Frontend (GitHub):** [https://github.com/caiovilquer/game-list-frontend](https://github.com/caiovilquer/game-list-frontend)
- **Backend (GitHub):** [https://github.com/caiovilquer/game-list-backend](https://github.com/caiovilquer/game-list-backend)
- **Deploy (Vercel):** [https://game-list-frontend.vercel.app/](https://game-list-frontend.vercel.app/)

## Funcionalidades Principais

- **Listagem de jogos:** exibe todos os jogos disponíveis na base de dados.
- **Cadastro de novos jogos:** formulário para inserir novo título, gênero e plataforma.
- **Visualização detalhada:**  exibe detalhes de cada jogo.
- **Remoção de jogos:** (em desenvolvimento ou futuro) permite remover registros específicos.
- **Navegação SPA (Single Page Application):** troca de páginas sem recarregar a aplicação.
- **Sistema de login de usuários:** (em desenvolvimento ou futuro) permite com que cada usuário personalize sua própria lista de jogos

## Build para Produção

Para gerar uma versão otimizada para produção, execute:

```bash
npm run build
```

Os arquivos finais ficarão na pasta `dist/`, que pode ser servida por qualquer servidor estático (ex.: [Nginx](https://www.nginx.com/), [Vercel](https://vercel.com/), etc.).

## Contribuição

1. Faça um _fork_ deste repositório.
2. Crie um _branch_ para sua feature/bugfix: `git checkout -b feature/nova-feature`.
3. Faça o commit das suas alterações: `git commit -m 'Adiciona nova feature'`.
4. Faça o _push_ para o _branch_: `git push origin feature/nova-feature`.
5. Abra um _Pull Request_ no GitHub, descrevendo suas mudanças.


---

**Observação:** Se você tiver qualquer dúvida ou problema relacionado à configuração ou uso deste frontend, sinta-se à vontade para abrir uma issue no repositório principal, descrevendo o que está ocorrendo.
