# \# Pokédex - PokéAPI 🔴

# 

# Uma Pokédex moderna e responsiva construída com Next.js e Tailwind CSS, consumindo os dados oficiais da \[PokéAPI](https://pokeapi.co/). O projeto apresenta um visual "Classic Dark", trazendo a nostalgia da Pokédex com um toque minimalista e atual.

# 

# \## 🚀 Funcionalidades

# 

# \* \*\*Listagem com Scroll Infinito:\*\* Navegue por todos os Pokémons sem precisar clicar em botões de paginação. Novos monstrinhos são carregados automaticamente ao chegar no final da página.

# \* \*\*Busca Específica:\*\* Pesquise rapidamente por qualquer Pokémon usando seu nome ou número da Pokédex (ID).

# \* \*\*Página de Detalhes:\*\* Informações completas de cada Pokémon, incluindo:

# &#x20;   \* Imagem oficial em alta resolução (Official Artwork).

# &#x20;   \* Tipos, Peso e Altura.

# &#x20;   \* Barras de progresso dinâmicas e coloridas para os Status Base (HP, Attack, Defense, etc.).

# \* \*\*Design Responsivo:\*\* Layout fluido que se adapta perfeitamente a celulares, tablets e monitores ultrawide.

# \* \*\*Tema Dark Clássico:\*\* Interface focada no conforto visual (Dark Mode) com os clássicos detalhes em vermelho da franquia.

# 

# \## 💻 Tecnologias Utilizadas

# 

# \* \*\*\[Next.js 15+](https://nextjs.org/):\*\* Framework React utilizando o App Router para renderização híbrida (Server e Client Components).

# \* \*\*\[React](https://reactjs.org/):\*\* Biblioteca para a construção das interfaces.

# \* \*\*\[TypeScript](https://www.typescriptlang.org/):\*\* Tipagem estática para garantir um código mais seguro e sem erros de "any".

# \* \*\*\[Tailwind CSS](https://tailwindcss.com/):\*\* Framework de utilitários CSS para estilização rápida e responsiva diretamente no código.

# \* \*\*\[PokéAPI](https://pokeapi.co/):\*\* API RESTful pública utilizada para fornecer todos os dados e imagens da aplicação.

# 

# \## 🛠️ Como rodar o projeto localmente

# 

# Siga os passos abaixo para testar o projeto na sua máquina:

# 

# 1\. \*\*Clone o repositório:\*\*

# &#x20;  ```bash

# &#x20;  git clone \[https://github.com/LucasRyuMuraoka/Pokedex]

# ````

# 

# 2\.  \*\*Acesse a pasta do projeto:\*\*

# 

# &#x20;   ```bash

# &#x20;   cd Pokedex

# &#x20;   ```

# 

# 3\.  \*\*Instale as dependências:\*\*

# &#x20;   Você pode usar `npm`, `yarn`, `pnpm` ou `bun`.

# 

# &#x20;   ```bash

# &#x20;   npm install

# &#x20;   ```

# 

# 4\.  \*\*Inicie o servidor de desenvolvimento:\*\*

# 

# &#x20;   ```bash

# &#x20;   npm run dev

# &#x20;   ```

# 

# 5\.  \*\*Abra no navegador:\*\*

# &#x20;   Acesse \[http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) para ver a Pokédex em ação.

# 

# \## 📁 Estrutura Principal

# 

# &#x20; \* `app/page.tsx`: Página inicial contendo a busca e listagem principal de Pokémons.

# &#x20; \* `app/pokemon/\[id]/page.tsx`: Página dinâmica responsável por exibir os detalhes de um Pokémon específico.

# &#x20; \* `components/InfiniteScrollList.tsx`: Componente Client-Side que gerencia a grade de Pokémons e a lógica do scroll infinito usando `IntersectionObserver`.

# &#x20; \* `components/SearchBar.tsx`: Componente de campo de busca integrado com as rotas do Next.js.



