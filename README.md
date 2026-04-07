
# Pokédex - PokéAPI 🔴

Uma Pokédex moderna e responsiva construída com Next.js e Tailwind CSS, consumindo os dados oficiais da [PokéAPI](https://pokeapi.co/). O projeto apresenta um visual "Classic Dark", trazendo a nostalgia da Pokédex com um toque minimalista e atual.

## 🚀 Funcionalidades

* **Listagem com Scroll Infinito:** Navegue por todos os Pokémons sem precisar clicar em botões de paginação. Novos monstrinhos são carregados automaticamente ao chegar no final da página.
* **Busca Específica:** Pesquise rapidamente por qualquer Pokémon usando seu nome ou número da Pokédex (ID).
* **Página de Detalhes:** Informações completas de cada Pokémon, incluindo:
    * Imagem oficial em alta resolução (Official Artwork).
    * Tipos, Peso e Altura.
    * Barras de progresso dinâmicas e coloridas para os Status Base (HP, Attack, Defense, etc.).
* **Design Responsivo:** Layout fluido que se adapta perfeitamente a celulares, tablets e monitores ultrawide.
* **Tema Dark Clássico:** Interface focada no conforto visual (Dark Mode) com os clássicos detalhes em vermelho da franquia.

## 💻 Tecnologias Utilizadas

* **[Next.js 15+](https://nextjs.org/):** Framework React utilizando o App Router para renderização híbrida (Server e Client Components).
* **[React](https://reactjs.org/):** Biblioteca para a construção das interfaces.
* **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para garantir um código mais seguro e sem erros de "any".
* **[Tailwind CSS](https://tailwindcss.com/):** Framework de utilitários CSS para estilização rápida e responsiva diretamente no código.
* **[PokéAPI](https://pokeapi.co/):** API RESTful pública utilizada para fornecer todos os dados e imagens da aplicação.

## 🛠️ Como rodar o projeto localmente

Siga os passos abaixo para testar o projeto na sua máquina:

1. **Clone o repositório:**
   
   git clone [https://github.com/LucasRyuMuraoka/Pokedex](https://github.com/LucasRyuMuraoka/Pokedex.git)


2.  **Acesse a pasta do projeto:**

    ```bash
    cd Pokedex
    ```

3.  **Instale as dependências:**
    Você pode usar `npm`, `yarn`, `pnpm` ou `bun`.

    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

5.  **Abra no navegador:**
    Acesse [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) para ver a Pokédex em ação.

## 📁 Estrutura Principal

  * `app/page.tsx`: Página inicial contendo a busca e listagem principal de Pokémons.
  * `app/pokemon/[id]/page.tsx`: Página dinâmica responsável por exibir os detalhes de um Pokémon específico.
  * `components/InfiniteScrollList.tsx`: Componente Client-Side que gerencia a grade de Pokémons e a lógica do scroll infinito usando `IntersectionObserver`.
  * `components/SearchBar.tsx`: Componente de campo de busca integrado com as rotas do Next.js.

<!-- end list -->
