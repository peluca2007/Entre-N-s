'use strict';
// Vibe "Clima de romance". 12 cartas por baralho, das melhores pras menos boas:
// as primeiras entram no modo "Baralho todo".
window.DECKS = window.DECKS || {};
DECKS.romance = [
  {
    id: 'flerte', icon: 'wink', name: 'Flerte leve', desc: 'um pouquinho de charme',
    cards: [
      'Qual é o seu jeito de flertar? Pode fazer uma demonstração discreta.',
      'Você disfarça bem quando tá gostando de alguém ou todo mundo percebe na hora?',
      'Numa festa lotada, como você chamaria a minha atenção sem falar nada?',
      'Você sustenta o olhar por mais de cinco segundos ou desvia na hora? Vale testar agora.',
      'Qual cantada boba você acha que funcionaria só pelo humor? Pode inventar uma agora.',
      'Qual característica sua você acha irresistível? Zero falsa modéstia.',
      'Que música você escolheria pra me conquistar? E qual acha que eu escolheria pra você?',
      'Qual apelido carinhoso você curtiria receber? E qual jamais?',
      'O que mais te derrete: voz, risada, mãos ou jeito de falar?',
      'Qual detalhe pequeno faz você olhar duas vezes pra alguém?',
      'Se o seu jeito de flertar fosse um personagem de comédia romântica, quem seria?',
      'O que você nota primeiro numa pessoa quando conhece?'
    ]
  },
  {
    id: 'a-gente', icon: 'chat', name: 'A gente', desc: 'o começo dessa história',
    cards: [
      'Qual mensagem minha você releu mais de uma vez? Pode confessar.',
      'Qual foi o momento em que você pensou "opa, gostei"?',
      'Que apelido você já me deu só na sua cabeça?',
      'Qual foi a sua primeira impressão de mim? Vale contar o que você errou.',
      'Qual seria o motivo da nossa primeira briga boba? Chuta sem dó.',
      'O que mais te surpreendeu em mim até agora?',
      'Qual seria o título do episódio 1 da nossa história?',
      'Qual é a maior diferença entre a gente até agora: problema ou charme?',
      'O que você acha que eu penso sobre você agora? Chuta, eu confirmo ou desminto.',
      'Qual pergunta você ainda tá guardando pra me fazer hoje?',
      'Se tivesse que me apresentar pra um amigo em uma frase, qual seria?',
      'O que passou pela sua cabeça antes de vir pra cá hoje?'
    ]
  },
  {
    id: 'date-ideal', icon: 'cheers', name: 'Date ideal', desc: 'o encontro dos sonhos',
    cards: [
      'Date no sofá com série e pipoca: vale como date ou é só preguiça com companhia?',
      'Qual seria o nosso date ideal gastando no máximo 50 reais? Monta o roteiro.',
      'Qual seria o date perfeito pra um domingo de chuva?',
      'Qual seria o pior date possível que ainda renderia uma ótima história pra contar depois?',
      'Se o nosso próximo date tivesse dress code obrigatório, tipo anos 2000, qual você escolheria?',
      'Qual filme ruim você assistiria comigo só pra rir dele a noite toda?',
      'Entre nós dois, quem enrola mais pra decidir onde comer? Pode apontar.',
      'Date perfeito: jantar chique, rolê no parque ou noite de filme no sofá? Escolhe uma e defende.',
      'Qual gesto simples te conquista mais que um presente caro?',
      'Qual comida seria ideal pra dividir num date? E quem paga a sobremesa?',
      'Qual atividade você gostaria de fazer num date e nunca fez?',
      'Mensagem de boa noite: você ama ou acha meio demais?'
    ]
  },
  {
    id: 'ousadia', icon: 'flame', name: 'Ousadia', desc: 'pequenas coragens a dois', mode: 'challenge',
    cards: [
      'Disputa de olhar: quem piscar primeiro perde e deve um elogio ao vencedor.',
      'Se a outra pessoa topar, sente do lado dela pelas próximas três cartas.',
      'Façam uma pose de capa de filme romântico, segurem por 5 segundos e vejam quem ri primeiro.',
      'Diga a frase de filme romântico mais dramática que lembrar, olhando nos olhos da outra pessoa.',
      'Chute três coisas sobre a outra pessoa, tipo comida favorita e mania. Ela diz quantas acertou.',
      'Finja ler a mão da outra pessoa e invente o futuro romântico dela.',
      'Invente um apelido carinhoso pra outra pessoa. Ela pode vetar.',
      'Faça um elogio sincero que a outra pessoa ainda não ouviu hoje.',
      'Faça um discurso de 30 segundos sobre a noite de hoje, como se fosse padrinho de casamento.',
      'Se a outra pessoa topar, massageie os ombros dela por 30 segundos.',
      'Se a outra pessoa topar, segure a mão dela por 30 segundos e conte o seu melhor momento da semana.',
      'Se a outra pessoa topar, dê um abraço de 10 segundos.'
    ]
  }
];
