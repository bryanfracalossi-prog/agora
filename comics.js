/* Ágora — as tirinhas
   Histórias antigas contadas em painéis curtos.
   Cada painel: cena (comicart.js), tempo, zoom, foco, narração e falas. */

const COMICS = [
  {
    id: 'sisifo',
    title: 'Sísifo e a pedra',
    subtitle: 'Quando o trabalho perde o sentido',
    source: 'Mitologia grega · Albert Camus',
    themes: ['trabalho', 'descanso'],
    minutes: 3,
    cover: { scene: 'mountain', time: 'dusk', zoom: 1.15 },
    intro: 'Os deuses inventaram um castigo perfeito: um esforço que nunca termina. Camus olhou para ele e fez uma pergunta incômoda.',
    panels: [
      {
        scene: 'mountain', time: 'day', zoom: 1.05, focus: [230, 190],
        narration: 'Os deuses condenaram Sísifo a empurrar uma pedra até o topo da montanha. Toda vez que ele chegava perto, a pedra rolava de volta.',
        bubbles: []
      },
      {
        scene: 'mountain', time: 'dusk', zoom: 1.5, focus: [185, 225],
        narration: 'E ele descia. E começava de novo.',
        bubbles: [{ who: 'Sísifo', text: 'De novo?', pos: 'left' }]
      },
      {
        scene: 'mountain', time: 'night', zoom: 1.9, focus: [190, 215],
        narration: 'Os deuses achavam que o pior castigo era o esforço inútil.',
        bubbles: [{ who: 'Sísifo', text: 'Talvez o castigo seja empurrar sem saber por quê.', pos: 'bottom' }]
      },
      {
        scene: 'mountain', time: 'dawn', zoom: 1.3, focus: [200, 200], fx: 'sparkle',
        narration: 'Camus imaginou Sísifo feliz. Não porque a pedra subisse — mas porque ele podia escolher o que fazer com o caminho.',
        bubbles: [{ who: 'Sísifo', text: 'A pedra é minha. O caminho também.', pos: 'right' }]
      }
    ],
    lesson: {
      title: 'Trabalho sem sentido pesa o dobro',
      text: [
        'Sísifo não sofria só pelo peso da pedra. Sofria por não saber para quê. Muita gente hoje empurra a mesma pedra todos os dias — e chama isso de normalidade.',
        'Sentido não precisa ser grandioso. Pode ser saber por que você faz o que faz, escolher uma parte do trabalho que realmente importa, ou lembrar que existe vida depois do expediente.'
      ],
      actions: [
        'Pergunte: por que eu faço isso? Se a resposta for só “porque preciso”, tudo bem — mas veja o que isso está custando.',
        'Escolha uma parte do seu dia de trabalho que faça sentido para você e dê mais atenção a ela.',
        'Reserve um horário hoje em que você não é produtivo para ninguém.'
      ]
    },
    quote: { text: 'É preciso imaginar Sísifo feliz.', author: 'Albert Camus', source: 'O Mito de Sísifo' }
  },

  {
    id: 'pescador',
    title: 'O pescador e o executivo',
    subtitle: 'A vida que você persegue talvez já esteja aqui',
    source: 'Parábola contemporânea · adaptação de Heinrich Böll',
    themes: ['trabalho', 'presenca', 'dinheiro'],
    minutes: 3,
    cover: { scene: 'beach', time: 'day', zoom: 1.2, focus: [250, 195] },
    intro: 'Um homem corre a vida inteira para chegar a um lugar onde já poderia estar. Essa história é antiga, mas cada época inventa um jeito novo de contá-la.',
    panels: [
      {
        scene: 'beach', time: 'day', zoom: 1.05, focus: [250, 190],
        narration: 'Um executivo cansado caminhava na praia e encontrou um pescador descansando ao lado do barco, no meio da tarde.',
        bubbles: []
      },
      {
        scene: 'beach', time: 'day', zoom: 1.55, focus: [270, 210],
        narration: '',
        bubbles: [
          { who: 'Executivo', text: 'Por que você não pesca mais?', pos: 'left' },
          { who: 'Pescador', text: 'Já pesquei o suficiente para hoje.', pos: 'right' }
        ]
      },
      {
        scene: 'beach', time: 'dusk', zoom: 1.35, focus: [255, 215],
        narration: '',
        bubbles: [
          { who: 'Executivo', text: 'Se trabalhasse mais, teria uma frota, uma empresa, uma fortuna.', pos: 'left' },
          { who: 'Pescador', text: 'E depois?', pos: 'right' }
        ]
      },
      {
        scene: 'beach', time: 'dusk', zoom: 1.0, focus: [240, 210],
        narration: 'O executivo explicou: aposentadoria, sossego, pescar na praia sem pressa.',
        bubbles: [{ who: 'Pescador', text: 'E o que você acha que eu estou fazendo agora?', pos: 'left' }]
      }
    ],
    lesson: {
      title: 'A vida que você persegue talvez já esteja aqui',
      text: [
        'A história não diz para você parar de crescer. Ela pergunta para onde você está crescendo — e se o lugar onde quer chegar não está sendo desmontado no caminho.',
        'Trabalhar é necessário. Mas trocar todos os dias por um futuro idealizado é um risco: o futuro chega, e a gente pode ter esquecido como ficar quieto.'
      ],
      actions: [
        'Nomeie uma coisa simples que te faz bem e que você anda adiando “para quando tiver tempo”.',
        'Hoje, faça essa coisa por dez minutos. Sem culpa e sem postar.',
        'Pergunte: se ninguém soubesse que eu tenho isso, eu ainda ia querer?'
      ]
    },
    quote: { text: 'Enquanto adiamos a vida, ela passa.', author: 'Sêneca', source: 'Cartas a Lucílio' }
  },

  {
    id: 'diogenes',
    title: 'Diógenes e Alexandre',
    subtitle: 'O suficiente não se compra',
    source: 'Filosofia grega · Diógenes de Sinope',
    themes: ['dinheiro', 'simplicidade', 'liberdade'],
    minutes: 3,
    cover: { scene: 'square', time: 'day', zoom: 1.25, focus: [210, 210] },
    intro: 'O homem mais poderoso do mundo foi até um filósofo que vivia num barril. Saiu de lá com uma lição sobre luz.',
    panels: [
      {
        scene: 'square', time: 'day', zoom: 1.0,
        narration: 'Alexandre, o Grande, ouviu falar de um filósofo que vivia dentro de um barril. Foi conhecê-lo, com toda a sua comitiva.',
        bubbles: []
      },
      {
        scene: 'square', time: 'day', zoom: 1.5, focus: [280, 210],
        narration: '',
        bubbles: [{ who: 'Alexandre', text: 'Pede o que quiseres. Eu te darei.', pos: 'right' }]
      },
      {
        scene: 'square', time: 'day', zoom: 1.8, focus: [135, 210],
        narration: '',
        bubbles: [{ who: 'Diógenes', text: 'Sai da frente. Estás tapando o sol.', pos: 'left' }]
      },
      {
        scene: 'square', time: 'dusk', zoom: 1.0,
        narration: 'Alexandre teria dito: “Se eu não fosse Alexandre, gostaria de ser Diógenes.” Havia algo naquele homem que o poder não alcançava.',
        bubbles: []
      }
    ],
    lesson: {
      title: 'Quem não sabe o quanto basta nunca tem o bastante',
      text: [
        'Diógenes não estava desprezando o mundo. Estava mostrando que era possível ser inteiro sem possuir tudo — e que o sol não custa nada.',
        'Vivemos cercados de coisas que parecem necessárias. Mas boa parte do que compramos não resolve um problema: apenas tenta silenciar uma comparação.'
      ],
      actions: [
        'Complete: “Para mim, já é suficiente…” e leve a frase a sério.',
        'Antes de comprar algo, espere um dia. Pergunte se é necessidade ou vontade de pertencer.',
        'Hoje, passe dez minutos ao sol — ou ao ar livre — sem fazer mais nada.'
      ]
    },
    quote: { text: 'Sai da minha frente. Estás tapando o sol.', author: 'Diógenes', source: 'a Alexandre, o Grande' }
  },

  {
    id: 'damocles',
    title: 'A espada de Dâmocles',
    subtitle: 'Todo sucesso tem um fio',
    source: 'Cícero · lendas da corte de Dionísio',
    themes: ['medo', 'trabalho', 'dinheiro'],
    minutes: 3,
    cover: { scene: 'palace', time: 'night', zoom: 1.4, focus: [280, 160] },
    intro: 'Dâmocles achava que a vida do rei era só banquete e admiração. O rei ofereceu o próprio lugar para ele experimentar.',
    panels: [
      {
        scene: 'palace', time: 'day', zoom: 1.05,
        narration: 'Dâmocles vivia na corte e invejava o rei. Para ele, o trono era só poder, festa e gente bajulando.',
        bubbles: []
      },
      {
        scene: 'palace', time: 'day', zoom: 1.45, focus: [240, 210],
        narration: '',
        bubbles: [{ who: 'Rei Dionísio', text: 'Queres sentar no meu lugar?', pos: 'left' }]
      },
      {
        scene: 'palace', time: 'night', zoom: 1.75, focus: [300, 130],
        narration: 'Ele sentou. E, ao olhar para cima, viu uma espada pendurada por um fio de crina de cavalo.',
        bubbles: [{ who: 'Dâmocles', text: 'O que é isso?', pos: 'left' }],
        sfx: { text: 'SHHH', x: '76%', y: '18%', rot: 8 }
      },
      {
        scene: 'palace', time: 'night', zoom: 1.1,
        narration: '',
        bubbles: [
          { who: 'Rei Dionísio', text: 'É assim que eu janto todos os dias.', pos: 'left' },
          { who: 'Dâmocles', text: 'Prefiro o meu lugar.', pos: 'right' }
        ]
      }
    ],
    lesson: {
      title: 'Antes de querer o trono, veja a espada',
      text: [
        'Todo sucesso tem um preço — e ele quase nunca aparece na foto. Cargos altos costumam vir com noites curtas, decisões pesadas e medo constante de perder o que se conquistou.',
        'Isso não significa fugir da ambição. Significa escolher com os olhos abertos: saber o que você está disposto a pagar e o que não está à venda.'
      ],
      actions: [
        'Liste o que ganhou e o que perdeu no último grande passo da sua vida profissional.',
        'Identifique um medo que está decidindo por você.',
        'Escolha um limite para proteger algo que você não quer perder.'
      ]
    },
    quote: { text: 'A espada pairava sobre a cabeça do homem feliz.', author: 'Cícero', source: 'Tusculanas, V' }
  },

  {
    id: 'giges',
    title: 'O anel de Giges',
    subtitle: 'Quem você é quando ninguém vê',
    source: 'Platão · A República',
    themes: ['etica', 'autoconhecimento'],
    minutes: 3,
    cover: { scene: 'road', time: 'night', zoom: 1.5, focus: [200, 225] },
    intro: 'Um pastor encontra um anel que o torna invisível. A pergunta que Platão faz há mais de dois mil anos continua desconfortável.',
    panels: [
      {
        scene: 'road', time: 'day', zoom: 1.2,
        narration: 'Giges era um pastor. Depois de uma tempestade, encontrou um anel numa caverna e descobriu que ele o tornava invisível.',
        bubbles: []
      },
      {
        scene: 'palace', time: 'night', zoom: 1.0,
        narration: 'Com o anel, entrou no palácio sem ser visto, enganou o rei e tomou o trono. Ninguém pôde acusá-lo.',
        bubbles: []
      },
      {
        scene: 'palace', time: 'night', zoom: 1.6, focus: [200, 200],
        narration: 'Platão pergunta: se ninguém pudesse te ver, você continuaria sendo honesto?',
        bubbles: [{ who: 'Sócrates', text: 'A questão não é o anel. É quem você é sem testemunhas.', pos: 'left' }]
      },
      {
        scene: 'road', time: 'dawn', zoom: 1.0,
        narration: 'A resposta não está no anel. Está no que sustenta as suas escolhas quando o medo de ser pego desaparece.',
        bubbles: []
      }
    ],
    lesson: {
      title: 'Integridade é não precisar esconder',
      text: [
        'A gente costuma pensar em ética como algo grande: leis, escândalos, tribunais. Mas ela começa pequena, no que você faz quando ninguém está olhando.',
        'Não se trata de ser perfeito. Trata-se de agir de um jeito que você não precise esconder — e de reconhecer o erro antes que alguém aponte.'
      ],
      actions: [
        'Pense em uma pequena atitude que você faria diferente se ninguém soubesse. Faça a versão honesta.',
        'Reconheça hoje um erro antes que alguém precise apontar.',
        'Pergunte: minhas atitudes no escuro teriam vergonha da luz?'
      ]
    },
    quote: { text: 'A questão não é sobre o anel, mas sobre quem somos quando ninguém nos vê.', author: 'Platão', source: 'a partir de A República, II' }
  },

  {
    id: 'caverna',
    title: 'A caverna',
    subtitle: 'As sombras parecem o mundo inteiro',
    source: 'Platão · A República, livro VII',
    themes: ['comparacao', 'autoconhecimento', 'liberdade'],
    minutes: 3,
    cover: { scene: 'cave', time: 'dark', zoom: 1.15, focus: [290, 150], variant: 'exit' },
    intro: 'Pessoas acorrentadas desde crianças olhavam para uma parede. Para elas, as sombras eram a realidade. Sair doeu.',
    panels: [
      {
        scene: 'cave', time: 'dark', zoom: 1.0,
        narration: 'Prisioneiros acorrentados desde crianças olhavam para uma parede. Atrás deles, uma fogueira projetava sombras.',
        bubbles: []
      },
      {
        scene: 'cave', time: 'dark', zoom: 1.45, focus: [250, 170],
        narration: 'Eles acreditavam que as sombras eram o mundo inteiro. Era tudo o que conheciam.',
        bubbles: [{ who: 'Prisioneiro', text: 'Olha! O mundo está passando.', pos: 'left' }]
      },
      {
        scene: 'cave', time: 'dark', zoom: 1.0, variant: 'exit', fx: 'speed',
        narration: 'Um deles se soltou e subiu. A luz doía. Lá fora, tudo era maior do que as sombras.',
        bubbles: [],
        sfx: { text: 'FWOOOSH', x: '68%', y: '22%', rot: -5 }
      },
      {
        scene: 'cave', time: 'dark', zoom: 1.25, focus: [250, 200], variant: 'exit',
        narration: 'Voltou para contar. E os que ficaram riram dele: “está cego”. Às vezes, quem vê demais incomoda.',
        bubbles: [{ who: 'Prisioneiro', text: 'Não é o mundo. São sombras.', pos: 'left' }]
      }
    ],
    lesson: {
      title: 'A história que repetimos não é o mundo',
      text: [
        'Hoje as sombras são mais sofisticadas: têm filtro, legenda e muitos likes. Vemos recortes e chamamos de realidade — a dos outros e a nossa.',
        'Sair da caverna não é desprezar quem ficou. É desconfiar das certezas confortáveis e olhar para o que está além da parede.'
      ],
      actions: [
        'Perceba uma comparação hoje: “estou olhando um recorte, não uma vida inteira”.',
        'Fique uma hora sem rolagem e use esse tempo para algo que não precisa de plateia.',
        'Pergunte: isso que eu acredito sobre mim foi examinado ou só repetido?'
      ]
    },
    quote: { text: 'A educação é voltar olhos que já podem ver para a direção certa.', author: 'Platão', source: 'A República, VII' }
  },

  {
    id: 'cavalo',
    title: 'O velho e o cavalo',
    subtitle: 'Não chame o dia de bom ou ruim cedo demais',
    source: 'Parábola taoista · “Sai Weng Shi Ma”',
    themes: ['medo', 'mudanca', 'presenca'],
    minutes: 3,
    cover: { scene: 'farm', time: 'dusk', zoom: 1.25, focus: [235, 205] },
    intro: 'Uma história chinesa sobre a pressa de chamar cada acontecimento de sorte ou desgraça. O tempo costuma ter a última palavra.',
    panels: [
      {
        scene: 'farm', time: 'day', zoom: 1.0,
        narration: 'O cavalo de um velho fazendeiro fugiu. Os vizinhos correram para consolar: “Que azar!”. O velho apenas disse: “Quem sabe?”.',
        bubbles: []
      },
      {
        scene: 'farm', time: 'day', zoom: 1.35, focus: [280, 200],
        narration: 'Dias depois, o cavalo voltou trazendo sete cavalos selvagens. “Que sorte!”, disseram. “Quem sabe?”, respondeu o velho.',
        bubbles: []
      },
      {
        scene: 'farm', time: 'dusk', zoom: 1.5, focus: [200, 210],
        narration: 'O filho tentou montar num deles, caiu e quebrou a perna. “Que azar!”. “Quem sabe?”.',
        bubbles: [{ who: 'Vizinho', text: 'Você não se abala com nada?', pos: 'left' }]
      },
      {
        scene: 'farm', time: 'night', zoom: 1.0,
        narration: 'Veio a guerra. Os jovens do vilarejo foram convocados. O filho do velho, com a perna quebrada, ficou.',
        bubbles: []
      }
    ],
    lesson: {
      title: 'A vida raramente cabe num único adjetivo',
      text: [
        'A gente sofre por antecipação: chamamos algo de desastre antes de saber no que vai dar. E depois de uma perda, às vezes é o tempo que mostra o que aquilo abriu.',
        'Isso não torna a dor boa nem pede que você agradeça pela tragédia. Só sugere um pouco menos de pressa para sentenciar o próprio futuro.'
      ],
      actions: [
        'Pense em algo que você chamou de “o fim do mundo” e que, depois, mudou o seu caminho.',
        'Quando algo der errado hoje, diga: “ainda não sei o que isso vai ser”.',
        'Escreva o que você está temendo agora — e o que ainda é só possibilidade.'
      ]
    },
    quote: { text: 'Quem sabe o que é sorte ou desgraça?', author: 'Provérbio chinês', source: 'Sai Weng Shi Ma' }
  },

  {
    id: 'vaso',
    title: 'O vaso rachado',
    subtitle: 'A imperfeição também faz florescer',
    source: 'Parábola tradicional',
    themes: ['autoconhecimento', 'coragem'],
    minutes: 3,
    cover: { scene: 'pottery', time: 'day', zoom: 1.3, focus: [200, 205] },
    intro: 'Um carregador de água tinha dois vasos. Um era perfeito. O outro perdia metade do caminho. Ele achava que era um fracasso.',
    panels: [
      {
        scene: 'pottery', time: 'day', zoom: 1.0,
        narration: 'Um homem carregava água todos os dias com dois vasos pendurados numa vara. Um deles tinha uma rachadura.',
        bubbles: []
      },
      {
        scene: 'road', time: 'day', zoom: 1.3,
        narration: 'No caminho, o vaso rachado deixava metade da água cair. Ele se sentia uma vergonha para o seu dono.',
        bubbles: [{ who: 'Vaso', text: 'Eu falho todos os dias.', pos: 'right' }]
      },
      {
        scene: 'road', time: 'dusk', zoom: 1.55, focus: [210, 220],
        narration: 'Um dia ele perguntou: “Por que me carregas, se eu perco tanto?”. O homem sorriu: “Olha o caminho”.',
        bubbles: []
      },
      {
        scene: 'road', time: 'dusk', zoom: 1.0, fx: 'petals',
        narration: 'Flores nasciam só do lado onde ele vazava. “Foi a tua rachadura que regou estas flores.”',
        bubbles: [{ who: 'Carregador', text: 'Eu sabia do teu defeito. E plantei nele.', pos: 'left' }]
      }
    ],
    lesson: {
      title: 'Você não é o seu pior ângulo',
      text: [
        'A parábola não celebra o descuido nem diz que todo sofrimento tem utilidade. Ela lembra que a perfeição não é a única forma de servir ao mundo.',
        'Aquilo que você considera defeito pode ser exatamente o lugar por onde você oferece algo que ninguém mais oferece. Desde que você não passe a vida inteira olhando só para a rachadura.'
      ],
      actions: [
        'Reescreva uma crítica dura: troque “eu sou…” por “eu fiz…” ou “ainda estou aprendendo…”.',
        'Liste uma coisa que você aprendeu errando.',
        'Pergunte a alguém de confiança uma qualidade sua que não tem a ver com desempenho.'
      ]
    },
    quote: { text: 'Há uma fenda em tudo. É por ela que a luz entra.', author: 'Leonard Cohen', source: 'Anthem' }
  },

  {
    id: 'barco',
    title: 'O barco vazio',
    subtitle: 'Muita raiva não tem ninguém dentro',
    source: 'Zhuangzi · conto taoista',
    themes: ['relacoes', 'medo'],
    minutes: 3,
    cover: { scene: 'river', time: 'night', zoom: 1.25, focus: [250, 195] },
    intro: 'Um homem atravessa o rio e vê um barco vindo na direção dele. Ele grita. Ninguém responde. A raiva cresce. Então ele percebe.',
    panels: [
      {
        scene: 'river', time: 'night', zoom: 1.0,
        narration: 'Um homem remava sozinho, à noite. Um barco apareceu rio abaixo, direto na direção dele.',
        bubbles: []
      },
      {
        scene: 'river', time: 'night', zoom: 1.45, focus: [230, 200],
        narration: 'Ele gritou para desviarem. Ninguém respondeu. Gritou mais alto, furioso.',
        bubbles: [{ who: 'Remador', text: 'Desvia! Você está louco?', pos: 'left' }]
      },
      {
        scene: 'river', time: 'night', zoom: 1.75, focus: [270, 205],
        narration: 'Quando o barco chegou perto, estava vazio. A raiva não tinha onde pousar.',
        bubbles: []
      },
      {
        scene: 'river', time: 'dawn', zoom: 1.0,
        narration: 'Se houvesse alguém ali, a briga continuaria. Vazio, ele apenas desviou — e seguiu.',
        bubbles: [{ who: 'Zhuangzi', text: 'Se o barco está vazio, você não grita.', pos: 'right' }]
      }
    ],
    lesson: {
      title: 'Às vezes a raiva fala com um barco vazio',
      text: [
        'Muita da nossa irritação não é sobre o que aconteceu, mas sobre a intenção que atribuímos. “Ele fez de propósito”, “ela sabe que isso me machuca” — e a raiva cresce em cima de uma suposição.',
        'Não se trata de engolir tudo. Trata-se de, antes de reagir, perguntar: o barco está realmente ocupado? Eu sei o que a outra pessoa quis dizer?'
      ],
      actions: [
        'Pense na última vez que você se irritou. O que você assumiu sobre a intenção do outro?',
        'Antes de responder a uma mensagem que te incomodou, espere dez minutos.',
        'Se o barco estiver ocupado, fale. Mas fale do fato, não da intenção que você inventou.'
      ]
    },
    quote: { text: 'Se um barco vazio bate na sua barca, você não fica com raiva.', author: 'Zhuangzi', source: 'conto taoista' }
  },

  {
    id: 'rei-camisa',
    title: 'O rei e a camisa',
    subtitle: 'A felicidade não está no excesso',
    source: 'Conto adaptado de Tolstói',
    themes: ['felicidade', 'dinheiro', 'simplicidade'],
    minutes: 3,
    cover: { scene: 'kingdom', time: 'day', zoom: 1.25, focus: [235, 190] },
    intro: 'Um rei doente manda procurar o homem mais feliz do reino. A cura, disseram, era vestir a camisa dele. O final não é o que se espera.',
    panels: [
      {
        scene: 'kingdom', time: 'day', zoom: 1.0,
        narration: 'Um rei adoeceu e nenhum remédio ajudava. Disseram que ele ficaria bom se vestisse a camisa do homem mais feliz do reino.',
        bubbles: []
      },
      {
        scene: 'kingdom', time: 'day', zoom: 1.3, focus: [210, 200],
        narration: 'Os mensageiros procuraram por toda parte. Encontraram um homem simples, que vivia com pouco e ria com facilidade.',
        bubbles: []
      },
      {
        scene: 'kingdom', time: 'dusk', zoom: 1.6, focus: [230, 220],
        narration: 'Mas quando pediram a camisa dele, descobriram: o homem era tão feliz que não tinha camisa para dar.',
        bubbles: [{ who: 'Mensageiro', text: 'Ele não tem camisa…', pos: 'left' }]
      },
      {
        scene: 'kingdom', time: 'night', zoom: 1.0,
        narration: 'O rei entendeu. A felicidade que ele procurava não estava em ter mais. Estava em precisar de menos para se sentir inteiro.',
        bubbles: []
      }
    ],
    lesson: {
      title: 'A felicidade não veste a camisa do poder',
      text: [
        'Dinheiro é necessário e negar isso é romantizar a falta. Mas quando o básico está resolvido, o excesso raramente entrega o que promete — e ainda cobra manutenção, medo e tempo.',
        'O homem mais feliz do reino não tinha camisa. Tinha o suficiente, um teto e companhia. Às vezes é isso que a gente está correndo para conseguir, sem perceber que já chegou.'
      ],
      actions: [
        'Faça uma lista de três coisas boas que não custam nada e cabem nesta semana.',
        'Antes de comprar algo, pergunte: isso resolve um problema ou só uma comparação?',
        'Hoje, use algo que você já tem e nunca usa. Sem comprar nada novo.'
      ]
    },
    quote: { text: 'Não é o homem que tem pouco, mas o que deseja mais, que é pobre.', author: 'Sêneca', source: 'Cartas a Lucílio' }
  },

  {
    id: 'metamorfoses',
    title: 'As três metamorfoses',
    subtitle: 'Do peso à criação de si',
    source: 'Friedrich Nietzsche · Assim Falou Zaratustra',
    themes: ['identidade', 'liberdade', 'coragem'],
    minutes: 3,
    cover: { scene: 'desert', time: 'dawn', variant: 'child', zoom: 1.2, focus: [210, 195] },
    intro: 'Nietzsche descreveu três formas de existir: o camelo que carrega, o leão que diz não e a criança que cria. Nenhuma é o fim da linha.',
    panels: [
      {
        scene: 'desert', time: 'day', variant: 'camel', zoom: 1.0,
        narration: 'Primeiro, o espírito vira camelo: aprende a carregar. O peso dos outros, as expectativas, o que dizem que é certo.',
        bubbles: []
      },
      {
        scene: 'desert', time: 'dusk', variant: 'lion', zoom: 1.15, focus: [210, 205], fx: 'speed',
        narration: 'Depois, vira leão: aprende a dizer não. Não ao que te diminui, não ao que você não escolheu.',
        bubbles: [{ who: 'Leão', text: 'Não.', pos: 'left' }],
        sfx: { text: 'RAAAR', x: '72%', y: '18%', rot: -7 }
      },
      {
        scene: 'desert', time: 'night', variant: 'child', zoom: 1.3, focus: [210, 210], fx: 'sparkle',
        narration: 'Por fim, vira criança: não para ser pequena, mas para brincar de criar. Um novo jeito de viver, que não pede licença.',
        bubbles: [{ who: 'Criança', text: 'E se eu inventar outro caminho?', pos: 'bottom' }]
      },
      {
        scene: 'desert', time: 'dawn', variant: 'child', zoom: 1.0,
        narration: 'As três moram em você. Carregar tem hora. Rugir tem hora. Criar, também.',
        bubbles: []
      }
    ],
    lesson: {
      title: 'Não se encaixar é matéria-prima',
      text: [
        'Nietzsche não estava dizendo para você virar uma pessoa dura ou uma criança mimada. Ele falava de etapas: suportar, recusar e, por fim, criar um jeito de viver que seja seu.',
        'Quem nunca se encaixou aprende cedo demais a carregar o peso dos outros. O leão é o dia em que você para de pedir licença. A criança é o depois: quando sobra espaço para inventar, em vez de só resistir.'
      ],
      actions: [
        'Nomeie um peso que você carrega só porque esperam que carregue.',
        'Ensaie um não pequeno hoje — para algo que não é seu.',
        'Escolha uma coisa que você faria do seu jeito, mesmo que o jeito dos outros seja mais aceito.'
      ]
    },
    quote: { text: 'É preciso ter ainda caos dentro de si para dar à luz uma estrela que dança.', author: 'Friedrich Nietzsche', source: 'Assim Falou Zaratustra' }
  },

  {
    id: 'antigona',
    title: 'Antígona',
    subtitle: 'Quando a lei da cidade fere a lei do coração',
    source: 'Sófocles · tragédia grega',
    themes: ['identidade', 'etica', 'coragem', 'pertencimento'],
    minutes: 3,
    cover: { scene: 'gate', time: 'night', zoom: 1.15, focus: [220, 190] },
    intro: 'Antígona enterrou o irmão contra a ordem do rei. Para a cidade, era crime. Para ela, era o mínimo que o amor exigia.',
    panels: [
      {
        scene: 'gate', time: 'night', zoom: 1.0,
        narration: 'O rei Creonte proibiu que o corpo de Polinices fosse enterrado. Quem desobedecesse morreria.',
        bubbles: []
      },
      {
        scene: 'gate', time: 'night', zoom: 1.4, focus: [175, 210],
        narration: 'Antígona foi assim mesmo. Cobriu o irmão de terra, sozinha, sabendo o preço.',
        bubbles: [{ who: 'Antígona', text: 'Ele é meu irmão.', pos: 'left' }]
      },
      {
        scene: 'gate', time: 'night', zoom: 1.5, focus: [210, 200], fx: 'gloom',
        narration: 'Levada ao rei, não pediu perdão.',
        bubbles: [
          { who: 'Creonte', text: 'A lei é a lei.', pos: 'right' },
          { who: 'Antígona', text: 'Há leis que não cabem no papel.', pos: 'left' }
        ]
      },
      {
        scene: 'gate', time: 'dawn', zoom: 1.0,
        narration: 'A cidade tinha razão nos seus papéis. Ela tinha razão no seu coração. Nem sempre dá para caber nas duas.',
        bubbles: []
      }
    ],
    lesson: {
      title: 'Há leis que não cabem no papel',
      text: [
        'Antígona não desobedeceu por gosto de romper regras. Ela desobedeceu porque a regra pedia que ela abandonasse algo essencial: o direito de enterrar quem amava.',
        'Não é sobre achar que toda norma é inimiga. É sobre conhecer o que em você não pode ser negociado — e assumir o custo de proteger isso, com o máximo de cuidado possível.'
      ],
      actions: [
        'Escreva um valor que você não quer trocar por aprovação.',
        'Pense em um limite seguro para defender esse valor sem se colocar em risco.',
        'Procure uma pessoa ou grupo que compartilhe desse valor. Ninguém deveria ter que ser corajoso sozinho.'
      ]
    },
    quote: { text: 'Não nasci para compartilhar o ódio, mas o amor.', author: 'Antígona', source: 'Sófocles' }
  },

  {
    id: 'borboleta',
    title: 'Zhuangzi e a borboleta',
    subtitle: 'Quem sonha com quem?',
    source: 'Zhuangzi · taoismo',
    themes: ['identidade', 'autoconhecimento', 'liberdade'],
    minutes: 3,
    cover: { scene: 'meadow', time: 'night', variant: 'butterfly', zoom: 1.15, focus: [220, 180] },
    intro: 'Zhuangzi sonhou que era uma borboleta. Ao acordar, não sabia se era um homem que sonhara ser borboleta — ou uma borboleta sonhando ser homem.',
    panels: [
      {
        scene: 'meadow', time: 'day', zoom: 1.0,
        narration: 'Zhuangzi adormeceu à beira do rio. No sonho, era uma borboleta, voando sem peso.',
        bubbles: []
      },
      {
        scene: 'meadow', time: 'day', variant: 'butterfly', zoom: 1.35, focus: [240, 165],
        narration: 'Livre, esquecida de si, não precisava saber quem era.',
        bubbles: [{ who: 'Borboleta', text: 'Eu não preciso de nome.', pos: 'right' }]
      },
      {
        scene: 'meadow', time: 'dusk', zoom: 1.4, focus: [200, 200], fx: 'sparkle',
        narration: 'Ao acordar, veio a dúvida: era um homem que sonhou ser borboleta? Ou uma borboleta sonhando ser homem?',
        bubbles: [{ who: 'Zhuangzi', text: 'Quem sonha com quem?', pos: 'left' }]
      },
      {
        scene: 'meadow', time: 'night', variant: 'butterfly', zoom: 1.0, fx: 'petals',
        narration: 'Talvez a pergunta não tenha resposta. E talvez isso seja liberdade: você não precisa ser só uma coisa.',
        bubbles: []
      }
    ],
    lesson: {
      title: 'Você não precisa caber numa única definição',
      text: [
        'A gente costuma se apresentar por rótulos: o trabalho, a idade, a orientação, o jeito de vestir. Eles ajudam a dizer quem somos, mas não dão conta do pacote inteiro.',
        'Zhuangzi não estava defendendo que nada é real. Estava brincando com a ideia de que a identidade também se move. Você pode mudar de sonho, de estilo, de nome, de caminho — e ainda ser alguém inteiro.'
      ],
      actions: [
        'Pense em três rótulos que você usa para se descrever. O que cada um deixa de fora?',
        'Faça hoje uma coisa que não combina com a imagem que os outros têm de você.',
        'Escreva: “eu também sou…” e complete com algo que ninguém esperaria.'
      ]
    },
    quote: { text: 'Sou eu um homem que sonhou ser borboleta, ou uma borboleta sonhando ser homem?', author: 'Zhuangzi', source: 'conto taoista' }
  },

  {
    id: 'metamorfose',
    title: 'A metamorfose',
    subtitle: 'O dia em que o corpo disse basta',
    source: 'Franz Kafka — A Metamorfose',
    themes: ['trabalho', 'identidade', 'saude'],
    minutes: 4,
    cover: { scene: 'room', time: 'dawn', variant: 'bed', zoom: 1.12, focus: [240, 190] },
    intro: 'O horror da história de Kafka não é acordar inseto. É que a primeira pergunta da casa não foi “como você está?”, e sim “você vai perder o trem?”.',
    panels: [
      {
        scene: 'room', time: 'dawn', variant: 'bed', zoom: 1.15, focus: [250, 195],
        narration: 'Certa manhã, Gregor Samsa acordou num corpo que não era o seu. Pesado, estranho, impossível.',
        bubbles: []
      },
      {
        scene: 'room', time: 'day', variant: 'bed', zoom: 1.55, focus: [300, 165],
        narration: 'Antes de tentar entender o que tinha acontecido, ele olhou o relógio. Perdera o trem. O chefe esperava.',
        bubbles: [{ who: 'Gregor', text: 'Vou me atrasar.', pos: 'left' }]
      },
      {
        scene: 'room', time: 'dusk', variant: 'door', zoom: 1.25, focus: [250, 180],
        narration: 'Do outro lado da porta, a família batia. Preocupada com o atraso — não com o que acontecia lá dentro.',
        bubbles: [
          { who: 'Mãe', text: 'Você está bem?', pos: 'right' },
          { who: 'Pai', text: 'E o trem?', pos: 'left' }
        ]
      },
      {
        scene: 'room', time: 'night', variant: 'bed', zoom: 1.0, fx: 'petals',
        narration: 'Ele passou o resto da vida tentando ser útil de algum jeito. Ninguém perguntou se ele queria voltar a ser ele mesmo.',
        bubbles: []
      }
    ],
    lesson: {
      title: 'Você não é o que você produz',
      text: [
        'Gregor não acordou monstro: acordou exausto. E a casa continuou funcionando enquanto ele tentava se levantar. A primeira pergunta foi sobre o trabalho, não sobre a dor.',
        'Quando a gente adoece, o mundo costuma perguntar quando voltamos. Vale inverter a ordem: o que em mim já não aguenta mais? Pedir ajuda não é virar inseto — é parar de fingir que está tudo bem.'
      ],
      actions: [
        'Pense em uma coisa que você faz todos os dias por obrigação. O que aconteceria se parasse por uma semana?',
        'Diga a alguém de confiança: “eu não estou bem”, sem explicação e sem currículo.',
        'Marque no celular um horário hoje em que você não vai produzir nada.'
      ]
    },
    quote: { text: 'Quando certa manhã Gregor Samsa acordou de sonhos intranquilos, encontrou-se na cama metamorfoseado num inseto monstruoso.', author: 'Franz Kafka', source: 'A Metamorfose, abertura (tradução livre)' }
  },

  {
    id: 'porta',
    title: 'Diante da lei',
    subtitle: 'A porta que esperou por você',
    source: 'Franz Kafka — Diante da Lei',
    themes: ['medo', 'tempo', 'liberdade'],
    minutes: 3,
    cover: { scene: 'gate', time: 'dusk', zoom: 1.18, focus: [200, 160] },
    intro: 'Um homem passa a vida esperando permissão para atravessar uma porta. Ela estava aberta desde o começo — e era só dele.',
    panels: [
      {
        scene: 'gate', time: 'day', zoom: 1.05, focus: [200, 180],
        narration: 'Um homem do campo chegou à porta da lei e pediu licença para entrar.',
        bubbles: [{ who: 'Homem', text: 'Posso entrar?', pos: 'left' }]
      },
      {
        scene: 'gate', time: 'day', zoom: 1.6, focus: [230, 170],
        narration: 'O guarda disse que agora não. Talvez depois. Talvez com mais um documento.',
        bubbles: [{ who: 'Guarda', text: 'Agora não.', pos: 'right' }]
      },
      {
        scene: 'gate', time: 'dusk', zoom: 1.2, focus: [190, 200],
        narration: 'Ele sentou e esperou. Anos. Perguntou de novo, muitas vezes. Sempre havia um motivo para esperar mais um pouco.',
        bubbles: [{ who: 'Homem', text: 'E agora?', pos: 'left' }]
      },
      {
        scene: 'gate', time: 'night', zoom: 1.45, focus: [210, 185], fx: 'speed',
        narration: 'No fim, o guarda disse: esta porta nunca foi para ninguém além de você. E agora vou fechá-la.',
        bubbles: [{ who: 'Guarda', text: 'Esta porta era só sua.', pos: 'right' }]
      }
    ],
    lesson: {
      title: 'O medo inventa um guarda na porta',
      text: [
        'A gente adia a vida esperando se sentir pronto: o curso certo, o dinheiro certo, a coragem certa. Kafka transformou essa espera em parábola — e ela continua acontecendo.',
        'O guarda da história não é uma pessoa má. É o medo de uniforme. Ele pede documentos que ninguém emite, e a porta segue ali, aberta.'
      ],
      actions: [
        'Qual porta você está esperando permissão para atravessar? Escreva o nome dela.',
        'Faça hoje a menor versão possível dessa coisa, sem aviso e sem plateia.',
        'Pergunte: quem me disse que eu não posso? Essa pessoa ainda manda em mim?'
      ]
    },
    quote: { text: 'Diante da lei está um guarda. Um homem do campo chega e pede para entrar.', author: 'Franz Kafka', source: 'O Processo (tradução livre)' }
  },

  {
    id: 'clovis',
    title: 'A aula sobre felicidade',
    subtitle: 'Ninguém sabe direito — e é por isso que vale conversar',
    source: 'inspirado nas aulas de Clóvis de Barros Filho',
    themes: ['felicidade', 'etica', 'presenca'],
    minutes: 4,
    cover: { scene: 'classroom', time: 'day', zoom: 1.08, focus: [210, 150] },
    intro: 'Clóvis de Barros Filho costuma começar pelo incômodo: todo mundo quer ser feliz, quase ninguém sabe dizer o que é. Em vez de uma resposta, ele propõe uma conversa.',
    panels: [
      {
        scene: 'classroom', time: 'day', zoom: 1.0, focus: [200, 170],
        narration: 'O professor entrou, escreveu uma palavra no quadro e esperou.',
        bubbles: [{ who: 'Clóvis', text: 'O que é felicidade?', pos: 'right' }]
      },
      {
        scene: 'classroom', time: 'day', zoom: 1.45, focus: [250, 120],
        narration: 'A turma respondeu com viagens, dinheiro, casas, um amor. Ele ouviu tudo e não corrigiu ninguém.',
        bubbles: [
          { who: 'Aluna', text: 'Ter tempo?', pos: 'left' },
          { who: 'Aluno', text: 'Não ter medo?', pos: 'right' }
        ]
      },
      {
        scene: 'classroom', time: 'dusk', zoom: 1.3, focus: [220, 160],
        narration: 'Depois ele disse que talvez a felicidade não seja um lugar a chegar, mas um jeito de andar — e que esse jeito se aprende com os outros.',
        bubbles: [{ who: 'Clóvis', text: 'A felicidade não se compra: se pratica.', pos: 'right' }]
      },
      {
        scene: 'classroom', time: 'night', zoom: 1.0, fx: 'sparkle',
        narration: 'A aula acabou sem resposta. Alguém saiu pensando — e, para ele, isso já era um começo.',
        bubbles: []
      }
    ],
    lesson: {
      title: 'Felicidade é pergunta, não vitrine',
      text: [
        'Clóvis não vende fórmula. Ele desconfia de quem promete felicidade em três passos, porque vida boa não é produto: é prática, feita de escolhas pequenas e repetidas.',
        'A pergunta “o que é felicidade para mim?” incomoda porque não tem resposta pronta. Talvez o incômodo seja o ponto: ele obriga a olhar para o que a gente realmente valoriza.'
      ],
      actions: [
        'Escreva três coisas que te fazem bem e veja quantas delas custam dinheiro.',
        'Pergunte a alguém o que é felicidade para essa pessoa. Só escute, sem discordar.',
        'Faça hoje uma escolha pequena que combine com o que você acabou de responder.'
      ]
    },
    quote: { text: 'A felicidade não é um lugar onde se chega; é um modo de caminhar.', author: 'Clóvis de Barros Filho', source: 'ideia recorrente em suas aulas (paráfrase nossa)' }
  },

  {
    id: 'krenak',
    title: 'Adiar o fim do mundo',
    subtitle: 'Nem todo dia precisa ser o último',
    source: 'inspirado em Ailton Krenak',
    themes: ['medo', 'pertencimento', 'tempo'],
    minutes: 4,
    cover: { scene: 'river', time: 'dusk', zoom: 1.1, focus: [230, 180] },
    intro: 'Krenak conta que ouviu, à beira de um rio, a pergunta que não sai da cabeça: e se o mundo não acabar hoje? E se der para adiar?',
    panels: [
      {
        scene: 'river', time: 'day', zoom: 1.05, focus: [220, 180],
        narration: 'O rio passava devagar. Do outro lado, gente corria como se o mundo fosse terminar à meia-noite.',
        bubbles: []
      },
      {
        scene: 'river', time: 'day', zoom: 1.35, focus: [205, 200],
        narration: 'Ele diz que a humanidade é uma ideia bonita — mas ideia não planta, não canta, não cuida de rio. Precisa de gente.',
        bubbles: [{ who: 'Krenak', text: 'A ideia precisa de gente.', pos: 'left' }]
      },
      {
        scene: 'river', time: 'dusk', zoom: 1.35, focus: [210, 190],
        narration: 'Adiar o fim do mundo não é fingir que está tudo bem. É recusar a pressa de quem lucra com o medo.',
        bubbles: [{ who: 'Krenak', text: 'Vamos adiar o fim do mundo.', pos: 'right' }]
      },
      {
        scene: 'river', time: 'night', zoom: 1.0, fx: 'sparkle',
        narration: 'É acordar, comer, conversar, sentir o chão. É fazer hoje alguma coisa que valha a pena repetir amanhã.',
        bubbles: []
      }
    ],
    lesson: {
      title: 'O futuro não precisa ser um alarme',
      text: [
        'Vivemos com o futuro tocando como despertador: catástrofe, crise, demissão, fim. O medo é real — mas não é o único lugar de onde dá para olhar.',
        'Adiar o fim do mundo é uma ideia prática: cuidar do que está perto, do rio, da rua, do vizinho, do próprio corpo. Quem cuida de algo pequeno todos os dias não está esperando o fim — está fazendo outro começo.'
      ],
      actions: [
        'Olhe pela janela por dois minutos e nomeie três coisas que continuam acontecendo sem pressa.',
        'Faça uma coisa pequena por um espaço que você usa: uma praça, uma calçada, uma planta.',
        'Escreva: “o que eu quero que continue existindo amanhã?”'
      ]
    },
    quote: { text: 'Adiar o fim do mundo é uma proposta de vida, não de catástrofe.', author: 'Ailton Krenak', source: 'paráfrase de Ideias para Adiar o Fim do Mundo' }
  },

  {
    id: 'cansaco',
    title: 'A sociedade do cansaço',
    subtitle: 'Quando descansar parece uma falha',
    source: 'inspirado em Byung-Chul Han',
    themes: ['trabalho', 'descanso', 'saude'],
    minutes: 4,
    cover: { scene: 'room', time: 'night', variant: 'desk', zoom: 1.1, focus: [230, 170] },
    intro: 'Han diz que trocamos o chefe por nós mesmos. Agora ninguém precisa mandar: a gente se cobra sozinho, de casa, de madrugada, no domingo.',
    panels: [
      {
        scene: 'room', time: 'night', variant: 'desk', zoom: 1.15, focus: [240, 175],
        narration: 'Duas da manhã. Ele terminou o trabalho e abriu outra aba: “como ser mais produtivo”.',
        bubbles: [{ who: 'Ele', text: 'Só mais uma coisa.', pos: 'left' }]
      },
      {
        scene: 'room', time: 'night', variant: 'desk', zoom: 1.6, focus: [300, 130],
        narration: 'Nenhum chefe tinha pedido aquilo. A cobrança era dele — e falava com a voz de quem quer o melhor para si.',
        bubbles: []
      },
      {
        scene: 'room', time: 'dawn', variant: 'desk', zoom: 1.3, focus: [210, 190],
        narration: 'O corpo pediu pausa. Ele chamou de preguiça e prometeu compensar no fim de semana.',
        bubbles: [{ who: 'Ele', text: 'Depois eu descanso.', pos: 'right' }]
      },
      {
        scene: 'room', time: 'day', variant: 'bed', zoom: 1.0, fx: 'sparkle',
        narration: 'Descanso não é o que sobra do trabalho. É parte do trabalho de continuar vivo.',
        bubbles: []
      }
    ],
    lesson: {
      title: 'Descansar não é recompensa, é manutenção',
      text: [
        'A sociedade do cansaço não proíbe o descanso: ela o transforma em culpa. Você pode parar, desde que produza algo para mostrar depois.',
        'Han não está dizendo para largar tudo. Está apontando que a autoexploração é mais eficiente que qualquer chefe — e mais difícil de perceber, porque vem com a nossa própria voz.'
      ],
      actions: [
        'Anote quantas vezes hoje você disse “só mais uma coisa”.',
        'Faça uma pausa de quinze minutos sem tela — e não transforme isso em produtividade.',
        'Pergunte: estou cansado do trabalho ou cansado de me cobrar?'
      ]
    },
    quote: { text: 'A sociedade do cansaço é uma sociedade do desempenho: cada um é senhor e escravo de si mesmo.', author: 'Byung-Chul Han', source: 'Sociedade do Cansaço (paráfrase)' }
  },

  {
    id: 'bambu',
    title: 'O bambu que esperou',
    subtitle: 'Crescer embaixo da terra também é crescer',
    source: 'conto popular chinês (adaptação livre)',
    themes: ['tempo', 'coragem', 'descanso'],
    minutes: 3,
    cover: { scene: 'meadow', time: 'dawn', variant: 'bamboo', zoom: 1.2, focus: [250, 235] },
    intro: 'Um mestre plantou uma semente e regou todos os dias. Por sete anos, nada apareceu. No oitavo, em seis semanas, o bambu passou de tudo o que havia ao redor.',
    panels: [
      {
        scene: 'meadow', time: 'day', variant: 'bamboo', zoom: 1.2, focus: [250, 240],
        narration: 'O jovem olhava o vaso vazio e perguntava por que continuar regando o nada.',
        bubbles: [{ who: 'Jovem', text: 'Não vai nascer?', pos: 'left' }]
      },
      {
        scene: 'meadow', time: 'day', variant: 'bamboo', zoom: 1.45, focus: [290, 250],
        narration: 'O mestre respondeu que, embaixo da terra, as raízes já estavam trabalhando. Ninguém vê o trabalho, mas ele existe.',
        bubbles: [{ who: 'Mestre', text: 'As raízes estão crescendo.', pos: 'right' }]
      },
      {
        scene: 'meadow', time: 'dusk', variant: 'bamboo-tall', zoom: 1.05, focus: [250, 210],
        narration: 'Sete anos depois, o bambu subiu metros em poucas semanas. Ninguém viu o esforço — só o resultado.',
        bubbles: []
      },
      {
        scene: 'meadow', time: 'night', variant: 'bamboo-tall', zoom: 1.0, fx: 'petals',
        narration: 'Quem desiste no terceiro ano nunca descobre o que o oitavo guardava.',
        bubbles: []
      }
    ],
    lesson: {
      title: 'Nem todo progresso aparece na superfície',
      text: [
        'A comparação mente: mostra o bambu de seis semanas e esconde os sete anos de raiz. A gente olha a vida dos outros no ponto de virada e conclui que está atrasada.',
        'Seu crescimento pode estar acontecendo num lugar que ninguém vê — inclusive você. Isso não é desculpa para não agir: é motivo para não se abandonar no meio.'
      ],
      actions: [
        'Liste três coisas que você aprendeu no último ano e que ninguém vê.',
        'Escolha um hábito pequeno e faça por sete dias, sem contar a ninguém.',
        'Troque “estou atrasado” por “estou construindo raiz”.'
      ]
    },
    quote: { text: 'O bambu leva sete anos para criar raiz e seis semanas para alcançar o céu.', author: 'provérbio chinês', source: 'tradição oral' }
  }
];
