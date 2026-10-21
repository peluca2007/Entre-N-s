'use strict';
// Vibe "Brisa". 12 cartas por baralho, das melhores pras menos boas:
// as primeiras entram no modo "Baralho todo".
window.DECKS = window.DECKS || {};
DECKS.brisa = [
  {
    id: 'eu-nunca', icon: 'glass', name: 'Eu nunca', desc: 'confessa e toma', mode: 'both', hint: 'quem já fez, gole ou trago',
    cards: [
      'Eu nunca acenei de volta pra alguém que, na verdade, tava acenando pra outra pessoa.',
      'Eu nunca fingi que tinha visto uma série pra não ficar de fora da conversa.',
      'Eu nunca ensaiei no banho uma discussão que nunca aconteceu.',
      'Eu nunca usei fone de ouvido sem nada tocando só pra ninguém puxar conversa.',
      'Eu nunca respondi "kkkk" sem ter rido nem um pouquinho.',
      'Eu nunca inventei um compromisso pra não ter que sair de casa.',
      'Eu nunca comi escondido pra não ter que dividir.',
      'Eu nunca contei uma história inteira e percebi no final que ela não tinha ponto nenhum.',
      'Eu nunca dormi no meio de uma festa.',
      'Eu nunca perdi a hora por causa de "só mais um episódio".',
      'Eu nunca ouvi a mesma música 50 vezes seguidas.',
      'Eu nunca acordei de ressaca jurando que nunca mais ia beber.'
    ]
  },
  {
    id: 'papo-de-brisa', icon: 'cloud', name: 'Papo de brisa', desc: 'pensamentos de chuveiro',
    cards: [
      'Será que formiga acha que a gente é um evento climático?',
      'Quando a porta da geladeira fecha, a luz apaga mesmo ou fica lá dentro fazendo festa? Defende a sua tese.',
      'Pombo balança a cabeça o tempo todo: ele tá concordando com tudo ou discordando de tudo?',
      'A lua segue o carro a viagem inteira. Ela é nossa amiga ou nossa perseguidora?',
      'Quem foi a primeira pessoa que viu um ovo e pensou "vou comer isso aí"?',
      'Uma mesa é quase só espaço vazio. Então por que o copo não atravessa? Explica ou dá um gole.',
      'Será que cachorro acha que a gente é cachorro grande sem pelo?',
      'Repete a palavra "pneu" dez vezes seguidas. Em que momento ela deixou de ser uma palavra?',
      'Se existisse uma cor nova, que ninguém nunca viu, como você imagina que ela seria?',
      'O wi-fi é invisível. O que mais tá passando pela sala agora sem a gente perceber?',
      'Peixe sente sede? Defende a sua tese ou toma um gole.',
      'A gente tá numa bolinha girando no espaço e ainda tem gente estressada com e-mail. Explica.'
    ]
  },
  {
    id: 'larica', icon: 'pizza', name: 'Larica', desc: 'a fome bateu, fala aí',
    cards: [
      'Pizza fria no café da manhã: gênio ou criminoso? Quem discordar do outro dá um trago.',
      'Qual combo maluco de comida você ama e tem vergonha de contar? Confessou, os dois tomam um gole.',
      'Leite condensado direto da lata, só de colher: genial ou crime? Quem discordar do outro dá um gole.',
      'Adivinhe o sabor de sorvete favorito da outra pessoa. Errou, toma um gole.',
      'Cereal primeiro ou leite primeiro? Quem escolher leite primeiro toma um gole, por princípio.',
      'Qual comida de padaria faz você entrar "só pra ver" e sair com um saco inteiro?',
      'Aniversário infantil: qual salgadinho você pega escondido duas vezes antes do parabéns?',
      'Miojo: com ovo, com queijo ou com tudo que achar no armário?',
      'Qual salgadinho é o rei da larica e qual é o fracasso total? Brinda ao campeão.',
      'O pedido veio errado e a fome é grande: come mesmo assim ou reclama? Quem fizer diferente do outro dá um gole.',
      'Hot dog com purê, batata palha ou os dois? Defende o seu. Perdeu o debate, dá um trago.',
      'Brigadeiro de colher, pão de queijo ou pizza? Só um pra levar pra ilha deserta.'
    ]
  },
  {
    id: 'vai-ou-bebe', icon: 'bottle', name: 'Vai ou bebe', desc: 'topa ou toma', mode: 'challenge',
    cards: [
      'Fala "três pratos de trigo pra três tigres tristes" três vezes seguidas sem errar. Errou, gole ou trago.',
      'Contem de 1 a 20 se alternando, mas todo múltiplo de 3 vira "oi". Quem errar toma um gole.',
      'Fala "quero mais pizza" sem mexer os lábios. Se a outra pessoa não entender, você toma um gole.',
      'Invente uma gíria nova e use numa frase. Se a outra pessoa não adivinhar o significado, gole ou trago.',
      'A outra pessoa escolhe uma letra. Diga uma frase de cinco palavras que comecem com ela. Não conseguiu? Gole ou trago.',
      'Faz uma declaração de amor dramática pra um alimento. Sem emoção? Gole ou trago.',
      'Escolhe uma música e canta o refrão olhando pra outra pessoa. Se negar, toma um gole.',
      'Escreve uma palavra com o dedo nas costas da outra pessoa, se ela topar. Se ela não adivinhar em duas tentativas, toma um gole.',
      'Faz uma dancinha de TikTok sem música. Se recusar, dá um gole.',
      'Fica 15 segundos em pose de estátua sem rir. Se rir, toma um gole.',
      'Imita a risada da outra pessoa. Não topa? Gole ou trago.',
      'A outra pessoa escolhe um bicho e você faz o som e o andar dele por 10 segundos. Se recusar, gole ou trago.'
    ]
  }
];
