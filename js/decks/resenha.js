'use strict';
// Vibe "Resenha". 12 cartas por baralho, das melhores pras menos boas:
// as primeiras entram no modo "Baralho todo".
window.DECKS = window.DECKS || {};
DECKS.resenha = [
  {
    id: 'mais-provavel', icon: 'target', name: 'Mais provável', desc: 'apontem sem dó', mode: 'both', hint: 'no três, apontem pra quem acham',
    cards: [
      'Quem é mais provável de abrir a geladeira três vezes seguidas esperando que apareça algo novo?',
      'Quem é mais provável de sair pra comprar pão e voltar duas horas depois sem o pão?',
      'Quem é mais provável de dormir no meio do filme e jurar que só tava de olho fechado?',
      'Quem é mais provável de mandar um áudio de seis minutos pra explicar o que cabia numa frase?',
      'Quem é mais provável de discutir com o GPS e ainda perder a discussão?',
      'Quem é mais provável de virar amigo do garçom em dez minutos?',
      'Quem é mais provável de ganhar uma discussão só no cansaço?',
      'Quem é mais provável de se perder na ida ao banheiro do bar?',
      'Quem é mais provável de conversar com cachorro como se fosse gente?',
      'Quem é mais provável de pedir a mesma coisa em todo restaurante?',
      'Quem é mais provável de cantar alto sem saber a letra?',
      'Quem é mais provável de levar jogo de tabuleiro a sério demais e inventar regra na hora?'
    ]
  },
  {
    id: 'micos', icon: 'oops', name: 'Micos & causos', desc: 'vergonha alheia liberada',
    cards: [
      'Qual foi o maior mico da sua vida? Conta com todos os detalhes e sem pular o arrependimento.',
      'Quando a sua barriga roncou no pior momento possível? O que você fez pra disfarçar?',
      'Já chamou professor ou chefe de "mãe" ou "pai" sem querer, na frente de todo mundo?',
      'Já respondeu "igualmente" quando alguém disse "bom filme"? Conta.',
      'Quando você cumprimentou a pessoa errada com muita confiança?',
      'Qual foi o tombo mais público que você já levou?',
      'Já entrou no carro, ônibus ou sala errada com a maior confiança? Como saiu de lá?',
      'Quando foi que você riu num momento totalmente inapropriado?',
      'Já esqueceu o nome de alguém bem na hora de apresentar? Como saiu dessa?',
      'Qual música você cantou com a letra errada por anos?',
      'Já empurrou porta que era de puxar na frente de todo mundo? E o que fez depois?',
      'Já falou algo em voz alta achando que ninguém tava ouvindo? Qual foi o estrago?'
    ]
  },
  {
    id: 'absurdas', icon: 'spiral', name: 'Perguntas absurdas', desc: 'zero lógica, 100% resenha',
    cards: [
      'Prefere lutar contra um cavalo do tamanho de um pato ou cem patos do tamanho de um cavalo?',
      'Se existisse um Procon da vida, qual seria a sua primeira reclamação formal?',
      'Se você fosse um móvel da casa, qual seria e que defeito ele teria?',
      'Se a sua vida virasse filme, quem faria o seu papel e por que seria um erro de elenco?',
      'Se você abrisse uma loja de uma coisa só, o que venderia e qual seria o slogan?',
      'Se você tivesse que mudar de nome amanhã, qual escolheria? Vale nome ridículo.',
      'Qual objeto aqui perto você acha que tá julgando a gente em silêncio?',
      'Se você lançasse um perfume, qual seria o nome? Tipo "Eau de Segunda-feira".',
      'Qual seria o aviso de "bateria social fraca" que aparece na sua cara?',
      'Qual seria o nome da sua banda de garagem e o primeiro hit?',
      'Se pudesse inventar um feriado, qual seria o nome e como se comemoraria?',
      'Se existisse modalidade olímpica pra algo que você faz muito bem, qual seria?'
    ]
  },
  {
    id: 'desafios-bobos', icon: 'mic', name: 'Desafios bobos', desc: 'pague mico por diversão', mode: 'challenge',
    cards: [
      'Chore de mentira por 10 segundos, estilo novela das nove, e termine com uma frase de efeito.',
      'Faça a outra pessoa rir em 20 segundos, sem tocar nela e sem falar.',
      'Peça desculpas pra outra pessoa, bem dramático, por algo completamente inventado e ridículo.',
      'Imite a outra pessoa por 15 segundos. Ela julga se ficou parecido.',
      'Faça uma careta pra cada emoção que a outra pessoa pedir. Cinco no total, sem rir.',
      'Conte o enredo de um filme famoso como fofoca de vizinha. A outra pessoa adivinha qual é.',
      'Invente o nome de uma pizza e conte a história dela em 20 segundos.',
      'Cante o refrão de uma música como se fosse ópera.',
      'Dê um conselho de vida de 20 segundos com cara de guru e a maior bobagem que conseguir.',
      'Digam juntos "o rato roeu a roupa do rei de Roma" três vezes seguidas. Quem tropeçar paga um elogio.',
      'Faça mímica de um filme ou série. A outra pessoa tem 30 segundos pra adivinhar.',
      'Conte o seu dia de hoje como um vlog de youtuber, com abertura e tudo.'
    ]
  }
];
