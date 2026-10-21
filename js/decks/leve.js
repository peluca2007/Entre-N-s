'use strict';
// Vibe "De boa". 12 cartas por baralho, das melhores pras menos boas:
// as primeiras entram no modo "Baralho todo".
window.DECKS = window.DECKS || {};
DECKS.leve = [
  {
    id: 'gelo', icon: 'cube', name: 'Quebra-gelo', desc: 'pra começar sem pressão',
    cards: [
      'Qual opinião impopular você defende até o fim? Pode ser sobre pão, bolacha, qualquer coisa.',
      'Qual foi a maior mentira que você acreditou na infância? Tipo "manga com leite faz mal".',
      'Qual música você canta a plenos pulmões no banho achando que ninguém tá ouvindo?',
      'Qual frase dos seus pais você já se pegou repetindo, jurando que nunca ia falar?',
      'Qual assunto, se alguém puxar, faz você falar por 40 minutos sem respirar?',
      'Qual é a coisa mais inútil que você sabe fazer muito bem?',
      'Qual medo bobo você tem e nunca superou? Tipo barata voadora ou elevador com estranho.',
      'Qual foi a melhor comida que você já comeu sem esperar nada? Pastel de feira, boteco, casa de parente.',
      'Qual palavra ou expressão você fala tanto que já virou marca registrada?',
      'Qual foi a última compra que fez você pensar "por que eu fiz isso?"',
      'Qual é a sua mania de rolê que todo mundo já conhece? Tipo ser a última pessoa a ir embora.',
      'Se o seu dia de hoje fosse um episódio de série, qual seria o título?'
    ]
  },
  {
    id: 'isso-ou-aquilo', icon: 'split', name: 'Isso ou aquilo', desc: 'escolha e defenda sua tese',
    cards: [
      'Áudio de 4 minutos ou ligação surpresa? Qual é o menor dos males?',
      'Pão de queijo ou coxinha pro resto da vida? É pergunta de caráter.',
      'Fone de ouvido sempre embolado ou carregador sempre curto demais pra alcançar a tomada?',
      'Viralizar por algo vergonhoso ou ficar anônimo na internet pra sempre?',
      'Nunca mais comer doce ou nunca mais comer salgado? Pensa bem antes de responder.',
      'Deixar alguém no vácuo por três dias ou responder em três segundos, todo dia?',
      'Show lotado, colado na grade, ou em casa no sofá com som perfeito e lanche?',
      'Cozinhar ou lavar a louça? E sim, existe resposta errada.',
      'Roupa linda e desconfortável ou moletom velho que todo mundo vai julgar?',
      'Passar um dia inteiro cantando tudo o que quiser falar ou só se comunicando por mímica?',
      'Praia lotada com o melhor açaí ou praia vazia sem nada pra comer?',
      'Chegar sempre 20 minutos depois da hora ou sempre 40 minutos antes?'
    ]
  },
  {
    id: 'vida-real', icon: 'home', name: 'Vida real', desc: 'seu dia a dia sem filtro',
    cards: [
      'Qual hábito seu é meio estranho, você sabe e não pretende mudar de jeito nenhum?',
      'O que tem na sua geladeira agora? Vale confessar o pote de molho e os dois ovos.',
      'O que cairia se você virasse a sua mochila de cabeça pra baixo? Qual item é o mais misterioso?',
      'Como você dorme: coberta até no calor, pé pra fora, ventilador na cara? Descreve o ritual.',
      'Quantos alarmes você coloca de manhã e quantas vezes aperta o soneca?',
      'Seu guarda-roupa é organizado ou é "tá tudo no chão, mas eu sei onde cada coisa tá"?',
      'Qual objeto ou canto da sua casa é território seu? Mexeu, a guerra começa.',
      'Você faz lista de mercado ou compra no improviso e volta com cinco coisas que não precisava?',
      'Qual tarefa de casa você empurra com a barriga até não dar mais?',
      'Qual é o seu nível na cozinha: chef, "me viro" ou "o micro-ondas é meu melhor amigo"?',
      'Qual é a sua comida de conforto quando o dia foi péssimo?',
      'Dinheiro no fim do mês: você é formiguinha que guarda ou "dia 20 já acabou tudo"?'
    ]
  },
  {
    id: 'e-se', icon: 'question', name: 'E se...?', desc: 'hipóteses sem consequência',
    cards: [
      'E se os animais falassem: qual seria o mais insuportável de conversar?',
      'E se existisse um botão que pausa o tempo por 5 minutos: quando você usaria?',
      'E se você só pudesse comer um prato por 30 dias: qual aguenta até o fim e em que dia desiste?',
      'E se você voltasse a ter 10 anos por um dia, com a cabeça de hoje: o que faria?',
      'E se você tivesse 10 minutos pra fazer a mala de uma viagem surpresa: o que não pode faltar?',
      'E se o elevador travasse com a gente dentro por duas horas: qual seria o seu plano?',
      'E se você virasse streamer amanhã: qual seria o seu conteúdo e o nome do seu canal?',
      'E se o wi-fi caísse por uma semana inteira: em que dia você começa a surtar?',
      'E se você ganhasse na loteria hoje: qual seria a primeira compra besta?',
      'E se a sua vida tivesse trilha sonora tocando sozinha: qual música toca quando você entra num lugar?',
      'E se você acordasse amanhã só falando em rima? Como seria o seu dia?',
      'E se você pudesse ter qualquer bicho de estimação, até um impossível: qual seria e que nome daria?'
    ]
  }
];
