# Entre Nós

Um jogo de cartas para duas pessoas se conhecerem melhor. É só abrir no navegador (no computador ou no celular), escolher a vibe da noite e ir virando as cartas.

**Jogar online:** https://peluca2007.github.io/Entre-N-s/

## Como jogar

1. Coloquem os nomes, escolham uma vibe e marquem os baralhos que querem usar.
2. Toquem na carta para virar. A carta mostra quem responde primeiro, e depois a outra pessoa responde também.
3. Gostou de uma pergunta? Toca na estrelinha e ela aparece no final do jogo.
4. Dá pra encerrar quando quiser. No computador, espaço, Enter ou a seta para a direita passam as cartas.

## Vibes

Cada vibe muda o visual, o fundo animado e as perguntas.

| Vibe | Clima | Baralhos |
|---|---|---|
| **De boa** | leve e divertido | Quebra-gelo, Isso ou aquilo, Vida real, E se...? |
| **Papo de madrugada** | pra se conhecer de verdade | Quem é você, Memórias, Sonhos & planos, Visão de vida |
| **Resenha** | caos e risada | Mais provável, Micos & causos, Perguntas absurdas, Desafios bobos |
| **Clima de romance** | um pouco mais perto | Flerte leve, A gente, Date ideal, Ousadia |
| **Brisa** | gole, trago e papo doido | Eu nunca, Papo de brisa, Larica, Vai ou bebe |

São 20 cartas por baralho, ou seja, 400 perguntas e desafios no total.

## Extras (ligam e desligam na tela inicial)

- **Cartas surpresa:** mini-desafios e regras malucas que aparecem no meio do jogo ("até a próxima surpresa, quem falar 'tipo' paga um elogio").
- **Gole ou trago:** cartas de brinde, a regra "fugiu da pergunta? gole ou trago" e a vibe Brisa. Com essa chave desligada, tudo que tem bebida ou fumo some do jogo. É só pra maiores de 18, e água também conta.
- **Mini-jogos no meio:** de vez em quando aparece uma carta de mini-jogo. Dá pra abrir os mini-jogos a qualquer hora pelo botão no topo.

## Mini-jogos

- **Adivinha a cor:** uma pessoa vê uma cor e dá uma dica de até 3 palavras ("chiclete Babalu"). A outra tenta achar a cor no quadro, e o jogo dá uma nota de 0 a 100.
- **Roleta do encontro:** vocês escolhem uma régua (melhor encontro ↔ pior encontro, comida boa ↔ comida ruim, green flag ↔ red flag... ou uma inventada). A roleta gira e só uma pessoa vê onde ela parou. Essa pessoa conta uma história que caia naquele ponto, e a outra tenta colocar o ponteiro no lugar certo. Acertar vale de 2 a 4 pontos.

## Rodar no computador

Não precisa instalar nada: é só abrir o `index.html` no navegador. As fontes vêm do Google Fonts, então com internet fica mais bonito.

## Mudar as perguntas

Todas as perguntas ficam em [`js/questions.js`](js/questions.js), separadas por vibe e por baralho. Para trocar uma pergunta, edite o texto entre aspas. Para criar um baralho novo, copie um bloco `{ id, icon, name, desc, cards }` e troque o conteúdo. Os ícones disponíveis ficam em [`js/icons.js`](js/icons.js).

## Estrutura

```
index.html          telas do jogo
css/style.css       visual e as 5 vibes
js/questions.js     todas as perguntas, cartas surpresa e de gole ou trago
js/icons.js         ícones desenhados em SVG
js/app.js           lógica do jogo e fundo animado
js/minigames.js     adivinha a cor e roleta do encontro
```

Feito com HTML, CSS e JavaScript puros, sem nenhuma biblioteca.
