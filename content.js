/* NEURON — conteúdo editorial
   Histórias, lições e pausas. Citações em tradução/adaptação livre.
   O objetivo é abrir conversa, não fechar respostas. */

const CONTENT = {
  version: 1,

  emotions: [
    { id: 'sereno', label: 'Sereno', emoji: '🌿', color: '#5f8f74' },
    { id: 'grato', label: 'Grato', emoji: '🌾', color: '#b08a45' },
    { id: 'esperancoso', label: 'Esperançoso', emoji: '🌅', color: '#c07a4a' },
    { id: 'cansado', label: 'Cansado', emoji: '🌫️', color: '#8b8f8c' },
    { id: 'ansioso', label: 'Ansioso', emoji: '🌪️', color: '#a06a8f' },
    { id: 'triste', label: 'Triste', emoji: '🌧️', color: '#5f7f9f' },
    { id: 'irritado', label: 'Irritado', emoji: '🔥', color: '#b5564a' },
    { id: 'confuso', label: 'Confuso', emoji: '🌀', color: '#7a7490' }
  ],

  themes: [
    { id: 'trabalho', label: 'Trabalho' },
    { id: 'dinheiro', label: 'Dinheiro' },
    { id: 'tempo', label: 'Tempo' },
    { id: 'felicidade', label: 'Felicidade' },
    { id: 'presenca', label: 'Presença' },
    { id: 'medo', label: 'Medo' },
    { id: 'etica', label: 'Ética' },
    { id: 'liberdade', label: 'Liberdade' },
    { id: 'identidade', label: 'Identidade' },
    { id: 'pertencimento', label: 'Pertencimento' },
    { id: 'comparacao', label: 'Comparação' },
    { id: 'descanso', label: 'Descanso' },
    { id: 'relacoes', label: 'Relações' },
    { id: 'autoconhecimento', label: 'Autoconhecimento' },
    { id: 'coragem', label: 'Coragem' },
    { id: 'simplicidade', label: 'Simplicidade' },
    { id: 'saude', label: 'Saúde mental' },
    { id: 'gratidao', label: 'Gratidão' }
  ],

  quotes: [
    { id: 'camus-sisifo', text: 'É preciso imaginar Sísifo feliz.', author: 'Albert Camus', source: 'O Mito de Sísifo', themes: ['trabalho', 'felicidade'] },
    { id: 'seneca-tempo', text: 'Não é que tenhamos pouco tempo: é que perdemos muito. A vida é longa o bastante para quem sabe usá-la.', author: 'Sêneca', source: 'Sobre a Brevidade da Vida', themes: ['tempo', 'presenca'] },
    { id: 'seneca-adia', text: 'Enquanto adiamos a vida, ela passa.', author: 'Sêneca', source: 'Cartas a Lucílio, I', themes: ['tempo', 'presenca'] },
    { id: 'seneca-pobre', text: 'Não é o homem que tem pouco, mas o que deseja mais, que é pobre.', author: 'Sêneca', source: 'Cartas a Lucílio', themes: ['dinheiro', 'simplicidade'] },
    { id: 'seneca-porto', text: 'Nenhum vento é favorável para quem não sabe a que porto se dirige.', author: 'Sêneca', source: 'Cartas a Lucílio', themes: ['trabalho', 'felicidade'] },
    { id: 'epicteto-opiniao', text: 'Não são as coisas que nos perturbam, mas as opiniões que temos sobre elas.', author: 'Epicteto', source: 'Enchiridion, 5', themes: ['medo', 'autoconhecimento'] },
    { id: 'epicteto-controle', text: 'Algumas coisas dependem de nós, outras não.', author: 'Epicteto', source: 'Enchiridion, 1', themes: ['medo', 'liberdade'] },
    { id: 'seneca-medo', text: 'Sofremos mais na imaginação do que na realidade.', author: 'Sêneca', source: 'Cartas a Lucílio, 13', themes: ['medo', 'presenca'] },
    { id: 'marco-amanhecer', text: 'Ao amanhecer, diga a si mesmo: vou encontrar pessoas difíceis. Nada disso me fará mal, porque sei que tudo isso é humano.', author: 'Marco Aurélio', source: 'Meditações, II', themes: ['relacoes', 'etica'] },
    { id: 'marco-tempo', text: 'Não viva como se tivesse dez mil anos pela frente. A morte paira sobre você. Enquanto viver, torne-se bom.', author: 'Marco Aurélio', source: 'Meditações, IV', themes: ['tempo', 'etica'] },
    { id: 'diogenes-sol', text: 'Sai da minha frente. Estás tapando o sol.', author: 'Diógenes', source: 'a Alexandre, o Grande', themes: ['simplicidade', 'liberdade'] },
    { id: 'platao-caverna', text: 'A educação não é colocar visão em olhos cegos, mas voltar olhos que já podem ver para a direção certa.', author: 'Platão', source: 'A República, VII', themes: ['autoconhecimento', 'liberdade'] },
    { id: 'platao-giges', text: 'A questão não é sobre o anel, mas sobre quem somos quando ninguém nos vê.', author: 'Platão', source: 'a partir de A República, II', themes: ['etica', 'autoconhecimento'] },
    { id: 'zhuzangzi-barco', text: 'Se um barco vazio bate na sua barca, você não fica com raiva. Se houver alguém nele, você grita.', author: 'Zhuangzi', source: 'conto taoista', themes: ['relacoes', 'medo'] },
    { id: 'lao-passo', text: 'Uma jornada de mil milhas começa com um único passo.', author: 'Lao-Tsé', source: 'Tao Te Ching, 64', themes: ['coragem', 'tempo'] },
    { id: 'buda-mente', text: 'A mente é tudo. Aquilo que pensamos, nos tornamos.', author: 'Buda', source: 'tradição do Dhammapada', themes: ['autoconhecimento', 'presenca'] },
    { id: 'frankl-atitude', text: 'Tudo pode ser tirado de um ser humano, menos a última das liberdades: escolher a própria atitude.', author: 'Viktor Frankl', source: 'Em Busca de Sentido', themes: ['coragem', 'liberdade'] },
    { id: 'frankl-situacao', text: 'Quando não podemos mudar uma situação, somos desafiados a mudar a nós mesmos.', author: 'Viktor Frankl', source: 'Em Busca de Sentido', themes: ['coragem', 'autoconhecimento'] },
    { id: 'jung-destino', text: 'Até que você torne o inconsciente consciente, ele dirigirá sua vida, e você o chamará de destino.', author: 'Carl Jung', source: 'atribuída', themes: ['autoconhecimento'] },
    { id: 'rilke-perguntas', text: 'Viva as perguntas agora. Talvez você viva, sem perceber, um dia distante, dentro das respostas.', author: 'Rainer Maria Rilke', source: 'Cartas a um Jovem Poeta', themes: ['tempo', 'autoconhecimento'] },
    { id: 'pessoa-alma', text: 'Tudo vale a pena se a alma não é pequena.', author: 'Fernando Pessoa', source: 'Mensagem', themes: ['felicidade', 'coragem'] },
    { id: 'rosa-coragem', text: 'O que a vida quer da gente é coragem.', author: 'Guimarães Rosa', source: 'Grande Sertão: Veredas', themes: ['coragem'] },
    { id: 'clarice-liberdade', text: 'Liberdade é pouco. O que eu desejo ainda não tem nome.', author: 'Clarice Lispector', source: 'Perto do Coração Selvagem', themes: ['liberdade', 'autoconhecimento'] },
    { id: 'oliver-vida', text: 'Diga-me, o que você planeja fazer com a sua única e preciosa vida?', author: 'Mary Oliver', source: 'The Summer Day', themes: ['tempo', 'felicidade'] },
    { id: 'cohen-fenda', text: 'Há uma fenda em tudo. É por ela que a luz entra.', author: 'Leonard Cohen', source: 'Anthem', themes: ['autoconhecimento', 'felicidade'] },
    { id: 'weil-atencao', text: 'A atenção é a forma mais rara e mais pura de generosidade.', author: 'Simone Weil', source: 'Carta a Joë Bousquet', themes: ['relacoes', 'presenca'] },
    { id: 'thoreau-viver', text: 'Fui para os bosques porque queria viver deliberadamente, enfrentar apenas os fatos essenciais da vida.', author: 'Henry David Thoreau', source: 'Walden', themes: ['simplicidade', 'presenca'] },
    { id: 'montaigne-morrer', text: 'Filosofar é aprender a morrer.', author: 'Montaigne', source: 'Ensaios, I', themes: ['tempo', 'felicidade'] },
    { id: 'aristoteles-felicidade', text: 'A felicidade depende de nós mesmos.', author: 'Aristóteles', source: 'Ética a Nicômaco', themes: ['felicidade', 'etica'] }
  ],

  lessons: [
    {
      id: 'trabalhar-para-viver',
      title: 'Trabalhar para viver, não viver para trabalhar',
      theme: 'trabalho',
      summary: 'Se o trabalho ocupa tudo, sobra pouco de você.',
      minutes: 4,
      comic: 'sisifo',
      reading: [
        'Existe uma diferença entre trabalhar com dedicação e existir apenas para produzir. A primeira dá sentido, sustento e orgulho. A segunda vai apagando o resto: o almoço sem pressa, a conversa sem assunto, o domingo que já nasce com segunda-feira dentro.',
        'Não é sobre largar tudo. É sobre lembrar que o trabalho é uma parte da vida — não a vida inteira. Quem só sabe trabalhar costuma descobrir tarde que o salário não compra de volta o tempo que passou.'
      ],
      actions: [
        'Marque hoje um horário em que você para de verdade — sem notificação, sem “só mais uma coisa”.',
        'Pergunte: isso que estou fazendo agora precisa ser feito por mim, agora?',
        'Escolha uma coisa pequena que não produz nada e faça mesmo assim: sentar no sol, ouvir uma música inteira, olhar o céu.'
      ]
    },
    {
      id: 'suficiente',
      title: 'O suficiente é uma escolha',
      theme: 'dinheiro',
      summary: 'Quem nunca decide o quanto basta nunca tem o bastante.',
      minutes: 4,
      comic: 'diogenes',
      reading: [
        'A lógica do “mais” não tem fim: sempre existe um carro melhor, uma casa maior, alguém que parece ter vencido. Quando o suficiente nunca é definido, a vida vira uma fila que não anda.',
        'Diógenes vivia num barril e disse a Alexandre que parasse de tapar o sol. Não porque pobreza seja virtude, mas porque ele sabia separar o que precisava do que apenas desejava.'
      ],
      actions: [
        'Escreva uma frase começando com “Para mim, já é suficiente…”.',
        'Antes de comprar algo hoje, espere 24 horas e pergunte se isso resolve um problema ou só uma comparação.',
        'Olhe ao redor e nomeie três coisas que você já tem e que um dia desejou muito.'
      ]
    },
    {
      id: 'pequenos-momentos',
      title: 'A vida acontece nos intervalos',
      theme: 'presenca',
      summary: 'Não é só no fim de semana que você está vivo.',
      minutes: 4,
      comic: 'pescador',
      reading: [
        'A gente costuma tratar o dia comum como sala de espera: segunda a sexta apenas para chegar ao sábado, o ano inteiro apenas para chegar às férias. Só que a maior parte da vida é feita desses dias comuns.',
        'Prestar atenção não exige uma viagem ou uma grande mudança. Exige desligar o ruído por alguns minutos e perceber o que já está aqui: o café quente, o vento na janela, uma conversa sem celular na mesa.'
      ],
      actions: [
        'Escolha uma atividade de hoje e faça sem tela por perto: comer, caminhar, tomar banho.',
        'Note cinco coisas ao seu redor agora: três que você vê, uma que ouve, uma que sente no corpo.',
        'Mande uma mensagem para alguém dizendo por que aquela pessoa importa — sem motivo especial.'
      ]
    },
    {
      id: 'descanso',
      title: 'Descansar não é recompensa',
      theme: 'descanso',
      summary: 'Você não precisa merecer o descanso. Ele é parte do trabalho de viver.',
      minutes: 4,
      comic: 'sisifo',
      reading: [
        'Muita gente só descansa quando o corpo trava. O descanso vira prêmio por produtividade — e quem não produziu o suficiente sente culpa de parar.',
        'Mas o corpo não funciona por merecimento. Ele funciona por ritmo: esforço e recuperação. Descansar não é fugir da vida; é condição para continuar nela com presença.'
      ],
      actions: [
        'Tire dez minutos hoje sem chamar de pausa produtiva. Só pare.',
        'Defina um horário de encerramento do dia e cumpra como se fosse um compromisso.',
        'Se a culpa aparecer, diga a si mesmo: “descansar também é cuidado, não recompensa”.'
      ]
    },
    {
      id: 'nao-e-seu-resultado',
      title: 'Você não é o seu resultado',
      theme: 'autoconhecimento',
      summary: 'Um erro, uma demissão, uma nota baixa: nada disso é o seu nome inteiro.',
      minutes: 4,
      comic: 'vaso',
      reading: [
        'Quando o valor pessoal fica colado no desempenho, qualquer falha vira veredito. Um projeto que não deu certo não significa “eu sou um fracasso” — significa que algo não deu certo.',
        'A parábola do vaso rachado não celebra o descuido. Ela lembra que a imperfeição também produz algo: flores onde outros só veriam vazamento.'
      ],
      actions: [
        'Reescreva uma crítica dura que você fez a si: troque “eu sou…” por “eu fiz…” ou “eu ainda estou aprendendo a…”.',
        'Liste uma coisa que você aprendeu errando nos últimos meses.',
        'Peça a alguém de confiança uma qualidade sua que não tem nada a ver com desempenho.'
      ]
    },
    {
      id: 'comparacao',
      title: 'A vitrine dos outros',
      theme: 'comparacao',
      summary: 'Você está comparando o seu dia real com o resumo editado dos outros.',
      minutes: 4,
      comic: 'caverna',
      reading: [
        'Nas redes, todo mundo parece estar viajando, produzindo e vencendo. Mas a gente vê o roteiro, não o making of. Comparar o seu cotidiano com a vitrine alheia é uma forma silenciosa de se diminuir.',
        'Platão imaginou pessoas que tomavam sombras por realidade. Hoje as sombras são mais sofisticadas: têm filtro, legenda e muitos likes.'
      ],
      actions: [
        'Perceba quando a comparação aparecer hoje. Nomeie: “estou comparando minha vida com um recorte”.',
        'Diminua por uma hora o tempo de rolagem e use esse tempo para algo com as mãos.',
        'Pergunte: o que eu quero de verdade — ou só quero que os outros vejam que eu tenho?'
      ]
    },
    {
      id: 'pedir-ajuda',
      title: 'Pedir ajuda é coragem',
      theme: 'saude',
      summary: 'Ninguém atravessa tudo sozinho. E não precisa estar no limite para falar.',
      minutes: 4,
      comic: 'barco',
      reading: [
        'A gente aprende a aguentar calado e chama isso de força. Mas segurar tudo sem apoio costuma terminar em cansaço, raiva ou vazio — e ninguém deveria chegar até lá para ter permissão de pedir ajuda.',
        'Falar com alguém não resolve tudo de imediato. Mas divide o peso o suficiente para você voltar a respirar e escolher o próximo passo.'
      ],
      actions: [
        'Escolha uma pessoa segura e mande uma mensagem hoje: “posso te contar uma coisa?”.',
        'Se o sofrimento estiver grande, ligue 188 (CVV, 24h, gratuito) ou procure um serviço de saúde.',
        'Escreva uma frase sobre o que você tem carregado sozinho — só para tirar de dentro.'
      ]
    },
    {
      id: 'dinheiro-e-vazio',
      title: 'Dinheiro resolve problemas. Não resolve vazio.',
      theme: 'felicidade',
      summary: 'Ter mais alivia a conta. Não necessariamente a sensação de que falta algo.',
      minutes: 4,
      comic: 'rei-camisa',
      reading: [
        'Dinheiro é real e necessário. Negar isso é romantizar a falta. Mas quando as necessidades básicas estão atendidas, o “mais” costuma render menos felicidade do que promete — e mais preocupação para manter o que se conquistou.',
        'A história do rei doente procurava a camisa do homem mais feliz do reino. Encontrou alguém que não tinha camisa para dar. A felicidade não estava no excesso: estava em precisar de menos para se sentir inteiro.'
      ],
      actions: [
        'Separe hoje uma quantia pequena para uma experiência, não para um objeto.',
        'Pergunte a si: quanto do meu cansaço é por falta de dinheiro — e quanto é por uma vida que não quero?',
        'Faça uma lista de três coisas boas que não custam nada e que você pode viver esta semana.'
      ]
    },
    {
      id: 'fio-da-espada',
      title: 'O fio da espada',
      theme: 'medo',
      summary: 'Todo sucesso tem um preço invisível. Vale saber qual é o seu.',
      minutes: 4,
      comic: 'damocles',
      reading: [
        'Dâmocles queria o trono até ver a espada pendurada sobre ele. O poder era real; a paz, nenhuma. Muita gente conquista posições que parecem invejáveis e vive com medo de perdê-las.',
        'Não é motivo para desistir de crescer. É motivo para perguntar: o que estou pagando por isso? Se a resposta for sono, saúde ou relações, talvez o preço esteja alto demais.'
      ],
      actions: [
        'Liste o que você ganhou e o que você perdeu com o último grande passo da sua carreira.',
        'Identifique um medo que tem tomado decisões por você.',
        'Escolha um limite para proteger algo que você não quer perder.'
      ]
    },
    {
      id: 'quem-voce-e',
      title: 'Quem você é quando ninguém vê',
      theme: 'etica',
      summary: 'A integridade é o que você faz quando o anel da invisibilidade está no dedo.',
      minutes: 4,
      comic: 'giges',
      reading: [
        'O anel de Giges é uma pergunta antiga: se ninguém pudesse te ver, você continuaria sendo honesto? A resposta importa porque revela o que sustenta o seu caráter — o medo de ser pego ou uma escolha interna.',
        'Integridade não é perfeição. É agir de um jeito que você não precise esconder. É quando as suas atitudes no escuro não teriam vergonha da luz.'
      ],
      actions: [
        'Escolha uma pequena atitude que você faria diferente se ninguém fosse saber. Faça a versão honesta.',
        'Pense em alguém que você admira pela conduta. O que essa pessoa faz quando ninguém está olhando?',
        'Reconheça hoje um erro antes que alguém precise apontar.'
      ]
    },
    {
      id: 'nao-caber',
      title: 'Não se encaixar também é um lugar',
      theme: 'identidade',
      summary: 'Você não precisa se deformar para caber.',
      minutes: 4,
      comic: 'antigona',
      reading: [
        'Tem gente que passa a vida tentando entrar num molde que nunca foi feito do seu tamanho. Corta o cabelo, esconde o gosto, aprende a rir na hora certa — e chama isso de amadurecer.',
        'Antígona escolheu desobedecer uma lei que feria o que ela era. Não é sobre romper com tudo o tempo inteiro. É sobre reconhecer o que em você não está à venda, mesmo quando o mundo pede que você se explique melhor.'
      ],
      actions: [
        'Liste três coisas que você faz diferente do que esperam de você — e que não machucam ninguém.',
        'Escolha um lugar onde você não precise se explicar. Se ele não existe, pense em como começar a criar um.',
        'Hoje, diga não a uma expectativa que não é sua.'
      ]
    },
    {
      id: 'olhar-dos-outros',
      title: 'O olhar dos outros não te define',
      theme: 'identidade',
      summary: 'Ser visto é diferente de ser aprovado.',
      minutes: 4,
      comic: 'borboleta',
      reading: [
        'A gente aprende cedo a se enxergar pelo olho dos outros: o que vestir, como falar, que versão de nós rende mais aceitação. O problema é quando esse olhar vira o único espelho disponível.',
        'Você pode ouvir, considerar e ainda assim escolher. A opinião de alguém sobre você é informação — não uma sentença. Quem você é também se move, muda de forma e não cabe num único rótulo.'
      ],
      actions: [
        'Note quando você se arruma pensando em quem vai julgar. Pergunte: eu faria isso se ninguém visse?',
        'Fique uma hora sem postar e sem comparar. Só viva o que está acontecendo.',
        'Escreva uma frase sobre quem você é que não dependa de aprovação.'
      ]
    },
    {
      id: 'futuro',
      title: 'O futuro não se resolve hoje',
      theme: 'medo',
      summary: 'Ansiedade é a cabeça tentando morar no que ainda não aconteceu.',
      minutes: 4,
      comic: 'cavalo',
      reading: [
        'Tem uma entrevista na próxima semana. Você já a viveu umas trinta vezes: a pergunta que não vai saber responder, o silêncio, o e-mail de recusa. O corpo responde como se fosse agora — e o agora vira refém de um dia que ainda nem chegou.',
        'Sêneca dizia que sofremos mais na imaginação do que na realidade. Não é para parar de se preparar. É para separar preparo de ensaio do desastre. O futuro não é um lugar onde você possa morar; ele só existe em pedaços de agora.',
        'Faça o que cabe no próximo passo: revisar uma resposta, dormir, pedir uma dica, respirar antes de entrar. O resto é o resto. E você já atravessou dias que pareciam impossíveis.'
      ],
      actions: [
        'Escreva o medo em uma frase, sem enfeitar. Depois escreva o que está sob seu controle nas próximas 24 horas.',
        'Marque 15 minutos para se preparar e 5 para parar. Quando o tempo acabar, faça outra coisa com o corpo.',
        'Se o medo estiver grande, conte para alguém ou escreva no Círculo. Medo dividido pesa menos.'
      ]
    }
  ],

  pauses: [
    {
      id: 'pausa-um-minuto',
      title: 'Pausa de um minuto',
      subtitle: 'Uma respiração antes de continuar',
      category: 'Corpo',
      icon: 'clock',
      minutes: 1,
      description: 'Um minuto para sair do piloto automático: soltar os ombros, sentir os pés e respirar devagar. Cabe em qualquer dia.',
      steps: [
        { type: 'intro', title: 'Só um minuto', text: 'Deixe o celular apoiado. Sinta os pés no chão e solte os ombros.' },
        { type: 'timer', id: 'resp', title: 'Respire', seconds: 60, mode: 'breath', pattern: { in: 4, hold: 2, out: 6 }, text: 'Inspire fundo, solte devagar. Três ou quatro respirações já bastam.' },
        { type: 'closing', title: 'De volta ao dia', text: 'Você acabou de escolher não ir no automático. Repita quantas vezes precisar.' }
      ]
    },
    {
      id: 'notar-cinco',
      title: 'Notar cinco coisas',
      subtitle: 'Um exercício para voltar ao agora',
      category: 'Atenção',
      icon: 'leaf',
      minutes: 3,
      description: 'Quando a cabeça acelera, os sentidos ainda estão aqui. Nomear o que está ao redor devolve o corpo ao presente.',
      steps: [
        { type: 'intro', title: 'Sem pressa', text: 'Você vai notar o que está ao seu redor, um sentido por vez. Se distrair faz parte; é só voltar.' },
        { type: 'prompt', id: 'ver', title: 'Três coisas que você vê', hint: 'Qualquer coisa: uma cor, uma sombra, um objeto sem importância.', placeholder: 'Vejo...', rows: 3 },
        { type: 'prompt', id: 'ouvir', title: 'Uma coisa que você ouve', hint: 'Pode ser o silêncio entre dois sons.', placeholder: 'Ouço...', rows: 2 },
        { type: 'prompt', id: 'sentir', title: 'Uma coisa que você sente no corpo', hint: 'Temperatura, tecido, o peso dos pés.', placeholder: 'Sinto...', rows: 2 },
        { type: 'closing', title: 'Aqui, agora', text: 'Você não precisa resolver a vida em três minutos. Só precisava voltar para o lugar onde a vida acontece.' }
      ]
    },
    {
      id: 'olhar-longe',
      title: 'Olhar longe',
      subtitle: 'Um descanso para os olhos e a cabeça',
      category: 'Descanso',
      icon: 'eye',
      minutes: 2,
      description: 'A vista cansada e a mente acelerada agradecem a mesma coisa: alguns minutos olhando para longe, sem tela.',
      steps: [
        { type: 'intro', title: 'Longe da tela', text: 'Se puder, vá até uma janela ou para fora. Olhe para o ponto mais distante que conseguir ver.' },
        { type: 'timer', id: 'longe', title: 'Olhe longe', seconds: 90, mode: 'calm', text: 'Deixe o olhar descansar. Se quiser, acompanhe a respiração.' },
        { type: 'closing', title: 'Um pouco mais largo', text: 'O mundo continua maior do que a tela. Lembre disso algumas vezes hoje.' }
      ]
    },
    {
      id: 'soltar-ombros',
      title: 'Soltar os ombros',
      subtitle: 'Onde o dia costuma se acumular',
      category: 'Corpo',
      icon: 'wind',
      minutes: 3,
      description: 'Sem alongamento complicado: perceber a tensão e deixar o corpo descer um pouco.',
      steps: [
        { type: 'intro', title: 'Onde está a tensão?', text: 'Sente-se. Feche os olhos se for confortável. Vamos passar por ombros, mandíbula e mãos.' },
        { type: 'prompt', id: 'ombros', title: 'Suba os ombros até as orelhas e solte', hint: 'Faça três vezes, devagar. O que você percebeu?', placeholder: 'Percebi...', rows: 2 },
        { type: 'prompt', id: 'rosto', title: 'Solte a mandíbula e a testa', hint: 'Às vezes só percebemos a pressão quando ela diminui.', placeholder: 'Notei...', rows: 2 },
        { type: 'timer', id: 'pausa', title: 'Fique um instante', seconds: 45, mode: 'calm', text: 'Sem fazer nada. Só deixar o corpo pesar.' },
        { type: 'closing', title: 'Um pouco mais leve', text: 'Você não precisa carregar o corpo como se ele fosse outra tarefa.' }
      ]
    },
    {
      id: 'uma-gratidao',
      title: 'Uma linha de gratidão',
      subtitle: 'Sem fingir que está tudo bem',
      category: 'Gratidão',
      icon: 'sun',
      minutes: 3,
      description: 'Gratidão não é apagar o que dói. É treinar o olhar para não perder de vista o que também sustenta você.',
      steps: [
        { type: 'intro', title: 'Pequeno e real', text: 'Não precisa ser grandioso. Pode ser o café, uma mensagem, o fato de você ter chegado até aqui hoje.' },
        { type: 'prompt', id: 'g1', title: 'Algo bom que existiu hoje', hint: 'Por menor que pareça.', placeholder: 'Hoje teve...', rows: 3 },
        { type: 'prompt', id: 'g2', title: 'Alguém que fez diferença', hint: 'Talvez essa pessoa nem saiba.', placeholder: 'Foi importante...', rows: 2 },
        { type: 'closing', title: 'Guardado', text: 'Se quiser, mande uma mensagem para essa pessoa. Gratidão também é uma forma de presença.' }
      ]
    },
    {
      id: 'caminhar-tres-minutos',
      title: 'Caminhar três minutos',
      subtitle: 'Sem destino, sem celular na mão',
      category: 'Descanso',
      icon: 'footsteps',
      minutes: 3,
      description: 'Levantar do lugar muda a química do corpo e o rumo dos pensamentos. Três minutos bastam para começar.',
      steps: [
        { type: 'intro', title: 'Levante', text: 'Se puder, vá para um espaço onde consiga andar. Deixe o celular no bolso ou na mesa.' },
        { type: 'timer', id: 'caminhada', title: 'Caminhe sem destino', seconds: 180, mode: 'calm', text: 'Sem velocidade. Sinta o passo, o chão, o ar.' },
        { type: 'closing', title: 'De volta', text: 'Você não estava fugindo de nada. Estava voltando para o corpo.' }
      ]
    },
    {
      id: 'futuro-espera',
      title: 'O futuro pode esperar',
      subtitle: 'Para quando a cabeça já está na entrevista',
      category: 'Ansiedade',
      icon: 'compass',
      minutes: 3,
      description: 'Um exercício para separar o medo do próximo passo. Você não precisa viver o dia de amanhã hoje.',
      steps: [
        { type: 'intro', title: 'Volte para hoje', text: 'Sente-se. Sinta os pés no chão. O que está acontecendo agora, neste minuto, além dos pensamentos?' },
        { type: 'prompt', id: 'medo', title: 'O que você está temendo?', hint: 'Escreva em uma frase, sem tentar resolver.', placeholder: 'Tenho medo de...', rows: 3 },
        { type: 'prompt', id: 'controle', title: 'O que cabe nas próximas 24 horas?', hint: 'Só o próximo passo. Não o resultado.', placeholder: 'Consigo...', rows: 3 },
        { type: 'timer', id: 'resp', title: 'Respire antes do passo', seconds: 60, mode: 'breath', pattern: { in: 4, hold: 2, out: 6 }, text: 'Inspire 4, segure 2, solte 6. O futuro pode esperar um minuto.' },
        { type: 'closing', title: 'Um passo de cada vez', text: 'Você não precisa resolver a vida inteira hoje. Só o próximo passo.' }
      ]
    }
  ]
};
