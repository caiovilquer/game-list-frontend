# Game List Frontend

Frontend em React + TypeScript para consumo da API Java Spring Boot do sistema de cadastro de jogos.

## Tecnologias utilizadas

- React
- TypeScript
- Axios
- React Router DOM
- Vite

## Como executar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação será executada em `http://localhost:5173`.

## Estrutura do Projeto

- `src/pages/`: páginas principais da aplicação
- `src/components/`: componentes reutilizáveis (futuros)
- `src/services/`: configuração do Axios
- `src/types/`: definições de tipos TypeScript

## API Esperada

Este frontend consome a API hospedada em `http://localhost:8080/games`, proveniente do backend Spring Boot disponível [aqui](https://github.com/caiovilquer/Game-List).

---
Projeto desenvolvido como parte de prática para vaga Full Stack.
