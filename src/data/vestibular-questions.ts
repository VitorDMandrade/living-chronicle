export interface VestibularOption {
  letter: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface VestibularQuestion {
  id: string;
  banca: 'ENEM' | 'FUVEST' | 'UNICAMP' | 'UNESP';
  year: string;
  topicBadge: string;
  associatedActId: 'act-1' | 'act-2' | 'act-3';
  promptQuote?: string;
  quoteAuthor?: string;
  questionText: string;
  options: VestibularOption[];
  conceptualSummary: string;
  examTrapAlert: string;
}

export const VESTIBULAR_QUESTIONS: VestibularQuestion[] = [
  {
    id: 'quest-enem-1',
    banca: 'ENEM',
    year: 'Edição Recorrente',
    topicBadge: 'Ideologia & Darwinismo Social',
    associatedActId: 'act-2',
    promptQuote:
      '“Tomai o fardo do Homem Branco / Enviai os melhores de vossos filhos / Condenai vossos filhos ao exílio / Para servirem aos vossos cativos; / Para esperar, com arreios pesados, / De gente agitada e selvagem — / Povos metade crianças, metade demônios.”',
    quoteAuthor: 'Rudyard Kipling, O Fardo do Homem Branco, 1899.',
    questionText:
      'O poema de Rudyard Kipling sintetiza a justificativa ideológica construída pelas potências europeias para legitimar o Neocolonialismo na África e na Ásia no final do século XIX. Esse discurso fundamentava-se na:',
    options: [
      {
        letter: 'A',
        text: 'Difusão igualitária dos avanços tecnológicos e científicos alcançados na Segunda Revolução Industrial para o bem-estar universal.',
        isCorrect: false,
        explanation:
          'DISTRATOR CLÁSSICO: As potências não buscavam bem-estar universal nem divisão igualitária da tecnologia; as ferrovias e telégrafos tinham exclusiva função extrativa e militar para escoamento das matérias-primas aos portos.'
      },
      {
        letter: 'B',
        text: 'Apropriação pseudocientífica do Darwinismo Social e na defesa de uma suposta "missão civilizadora" atribuída à "raça branca".',
        isCorrect: true,
        explanation:
          'GABARITO CORRETO: O Darwinismo Social (Spencer) transferiu a teoria da evolução de Darwin para as sociedades humanas, criando uma hierarquia racista em que o homem branco europeu seria o ápice evolutivo, tendo o "dever moral" ("fardo") de civilizar os povos não europeus enquanto saqueava suas riquezas.'
      },
      {
        letter: 'C',
        text: 'Tentativa de conter a expansão militar russa e restabelecer o equilíbrio geopolítico acordado no Congresso de Viena.',
        isCorrect: false,
        explanation:
          'INCORRETA: O Neocolonialismo foi impulsionado pela necessidade de matérias-primas e mercados para a 2ª Revolução Industrial, e não pelas diretrizes do Congresso de Viena (1815), que já estavam superadas.'
      },
      {
        letter: 'D',
        text: 'Doutrina da Contrarreforma católica, que visava a converter nativos e expandir as ordens religiosas jesuíticas no além-mar.',
        isCorrect: false,
        explanation:
          'PEGADINHA TEMPORAL: A Contrarreforma e catequese jesuítica são características do Colonialismo Mercantilista do século XVI (América), e NÃO do Neocolonialismo do século XIX.'
      },
      {
        letter: 'E',
        text: 'Proposta humanitária de combater o tráfico transatlântico de escravizados por meio do desenvolvimento autônomo dos reinos africanos.',
        isCorrect: false,
        explanation:
          'DISTRATOR RETÓRICO: Embora os europeus usassem o fim da escravidão como retórica benevolente, na prática substituíram o tráfico pelo trabalho compulsório e semiescravo dentro do próprio continente africano (ex: Congo Belga).'
      }
    ],
    conceptualSummary:
      'O Darwinismo Social e a "Missão Civilizadora" foram os álibis morais que mascararam a espoliação econômica do Neocolonialismo.',
    examTrapAlert:
      'Cuidado para não marcar alternativas que elogiam a infraestrutura ou atribuem motivações religiosas do século XVI ao Neocolonialismo do século XIX.'
  },
  {
    id: 'quest-fuvest-1',
    banca: 'FUVEST',
    year: 'Primeira Fase',
    topicBadge: 'Conferência de Berlim & Geopolítica',
    associatedActId: 'act-2',
    promptQuote:
      '“A partilha da África consumou-se no gabinete dos diplomatas em Berlim (1884-1885). Com réguas e transferidores sobre mapas imperfeitos, traçaram-se linhas retas dividindo reinos milenares e juntando grupos inimigos sob a mesma bandeira colonial.”',
    quoteAuthor: 'Apontamentos Históricos sobre a Partilha Colonial.',
    questionText:
      'A Conferência de Berlim (1884–1885) estabeleceu novas regras para o domínio europeu sobre a África. Dentre as consequências geopolíticas desse encontro histórico, destaca-se:',
    options: [
      {
        letter: 'A',
        text: 'A instituição do princípio do "direito histórico de descoberta", que garantiu a hegemonia marítima de Portugal e Espanha no interior africano.',
        isCorrect: false,
        explanation:
          'DISTRATOR: Foi exatamente o oposto! Berlim enterrou o "direito de descoberta" e instituiu a "Ocupação Efetiva", prejudicando Portugal e favorecendo quem tinha poderio militar e industrial (Inglaterra, Alemanha e França).'
      },
      {
        letter: 'B',
        text: 'A delimitação de fronteiras artificiais que desconsiderou a diversidade étnica e cultural africana, gerando tensões e guerras civis contemporâneas.',
        isCorrect: true,
        explanation:
          'GABARITO CORRETO: As fronteiras arbitrárias traçadas em Berlim uniram à força etnias rivais e separaram povos irmãos. Após a descolonização no século XX, essas fronteiras mantiveram-se como Estados Nacionais, gerando conflitos crônicos (ex: genocídio de Ruanda em 1994 e conflitos no Sudão e Nigéria).'
      },
      {
        letter: 'C',
        text: 'O incentivo à autonomia comercial dos reinos nativos por meio de acordos bilaterais de livre-comércio com a Alemanha de Bismarck.',
        isCorrect: false,
        explanation:
          'INCORRETA: Nenhuma liderança africana participou da Conferência de Berlim e não houve livre-comércio nativo; os territórios foram submetidos a monopólios das metrópoles.'
      },
      {
        letter: 'D',
        text: 'A proibição do emprego de armamento de repetição nos confrontos coloniais, visando à proteção das populações autóctones.',
        isCorrect: false,
        explanation:
          'ABSURDA: A metralhadora Maxim foi intensamente empregada pelas tropas coloniais para massacrar resistências nativas que possuíam armamento arcaico.'
      },
      {
        letter: 'E',
        text: 'A cessão pacífica e compartilhada de toda a bacia do Rio Congo à Liga das Nações para preservação ambiental e científica.',
        isCorrect: false,
        explanation:
          'ERRO CRONOLÓGICO E FÁTICO: A Liga das Nações só surgiu em 1919 (após a 1ª Guerra). O Congo foi entregue como feudo particular a Leopoldo II da Bélgica, resultando em exploração sanguinária.'
      }
    ],
    conceptualSummary:
      'A regra da Ocupação Efetiva e o traçado arbitrário de fronteiras em Berlim são as raízes diretas dos conflitos étnicos modernos na África.',
    examTrapAlert:
      'Lembre-se: Berlim trocou o direito de descoberta pela Ocupação Efetiva e traçou fronteiras artificiais sem qualquer africano presente.'
  },
  {
    id: 'quest-unicamp-1',
    banca: 'UNICAMP',
    year: 'História & Atualidades',
    topicBadge: 'Resistências Anticoloniais',
    associatedActId: 'act-3',
    promptQuote:
      '“Na Batalha de Adwa (1896), o exército do imperador etíope Menelik II, composto por mais de 100 mil combatentes munidos de táticas adaptadas e armas de fogo, infligiu uma derrota humilhante às forças imperialistas italianas, assegurando a independência do país.”',
    quoteAuthor: 'História Geral da África, UNESCO.',
    questionText:
      'A resistência na Batalha de Adwa, bem como a Revolta dos Cipaios (Índia) e a Guerra dos Boxers (China), demonstram que o avanço imperialista no século XIX:',
    options: [
      {
        letter: 'A',
        text: 'Ocorreu de forma homogênea e rápida devido à passividade e aceitação unânime da suposta superioridade civilizatória europeia.',
        isCorrect: false,
        explanation:
          'DISTRATOR FAVORITO DO ENEM/UNICAMP: Jamais marque passividade! As populações nativas lutaram bravamente e organizaram resistências com diferentes estratégias.'
      },
      {
        letter: 'B',
        text: 'Enfrentou intensas e multifacetadas resistências armadas, políticas e culturais por parte das populações autóctones contra a espoliação estrangeira.',
        isCorrect: true,
        explanation:
          'GABARITO CORRETO: Tanto na África (Etiópia, Guerras Zulus, Ashanti) quanto na Ásia (Cipaios na Índia, Boxers na China), as populações locais organizaram forte resistência militar e cultural, desmistificando qualquer ideia de submissão pacífica.'
      },
      {
        letter: 'C',
        text: 'Limitou-se a operações comerciais pontuais que contaram com a aprovação formal de parlamentos democráticos em todas as nações asiáticas.',
        isCorrect: false,
        explanation:
          'INCORRETA: A penetração imperialista na Ásia envolveu imposições militares violentas (como as Guerras do Ópio na China e a subordinação pela força na Índia britânica).'
      },
      {
        letter: 'D',
        text: 'Foi facilitado pela aliança militar e diplomática estabelecida entre o Império Etíope e o Reino Unido para expulsar os franceses da bacia do Nilo.',
        isCorrect: false,
        explanation:
          'INCORRETA: A Etiópia derrotou a Itália em Adwa sob liderança própria de Menelik II, sem tutela britânica.'
      }
    ],
    conceptualSummary:
      'O mito da "passividade africana e asiática" é combatido vigorosamente pelas bancas atuais; a historiografia enfatiza as resistências ativas.',
    examTrapAlert:
      'Alternativas com termos como "aceitação pacífica", "submissão voluntária" ou "ausência de resistências" são falsas em 100% das provas modernas.'
  },
  {
    id: 'quest-unesp-1',
    banca: 'UNESP',
    year: 'Segunda Fase / Geral',
    topicBadge: '2ª Revolução Industrial & 1ª Guerra',
    associatedActId: 'act-1',
    promptQuote:
      '“A corrida imperialista do final do século XIX transformou o globo em um tabuleiro tenso de rivalidades. Mercados disputados palmo a palmo e colônias cobiçadas geraram a Paz Armada: fábricas produzindo armamentos enquanto diplomatas teciam alianças secretas.”',
    quoteAuthor: 'Eric Hobsbawm, A Era dos Impérios (1875–1914).',
    questionText:
      'A expansão imperialista do século XIX relaciona-se com a eclosão da Primeira Guerra Mundial (1914–1918) porque:',
    options: [
      {
        letter: 'A',
        text: 'Provocou a unificação aduaneira da Europa sob a liderança pacifista do Império Austro-Húngaro, desestimulando a produção militar.',
        isCorrect: false,
        explanation:
          'INCORRETA: A Europa estava dominada pelo protecionismo e pela rivalidade belicista, e não pela unificação pacífica.'
      },
      {
        letter: 'B',
        text: 'O acirramento das disputas coloniais e a disputa por mercados e matérias-primas acentuaram as rivalidades interimperialistas e impulsionaram a corrida armamentista.',
        isCorrect: true,
        explanation:
          'GABARITO CORRETO: As potências industriais (principalmente Alemanha recém-unificada vs Inglaterra e França) chocaram-se por colônias e rotas comerciais (ex: Crises no Marrocos e Bálcãs), gerando a Paz Armada e alianças militares antagônicas que detonaram em 1914.'
      },
      {
        letter: 'C',
        text: 'Resultou na descolonização imediata e pacífica de todos os domínios britânicos na Ásia, gerando um vácuo de poder preenchido pela Rússia czarista.',
        isCorrect: false,
        explanation:
          'ERRO HISTÓRICO: A descolonização afro-asiática só ocorreu após a 2ª Guerra Mundial (a partir de 1945), e não antes de 1914.'
      },
      {
        letter: 'D',
        text: 'Eliminou as disputas navais entre Alemanha e Inglaterra por meio da divisão equitativa de todos os poços de petróleo do Oriente Médio.',
        isCorrect: false,
        explanation:
          'INCORRETA: A disputa naval entre a marinha alemã e a britânica foi um dos eixos mais virulentos de tensão antes da Primeira Guerra.'
      },
      {
        letter: 'E',
        text: 'Subordinou a economia dos países industriais europeus aos decretos agrícolas da Liga das Nações e do Tratado de Versalhes.',
        isCorrect: false,
        explanation:
          'ANACRONISMO GRAVE: O Tratado de Versalhes e a Liga das Nações foram criados em 1919, no FIM da 1ª Guerra Mundial, e não em suas origens.'
      }
    ],
    conceptualSummary:
      'O Imperialismo é a causa estrutural número 1 da Primeira Guerra Mundial. O assassinato de Sarajevo em 1914 foi apenas o estopim conjuntural.',
    examTrapAlert:
      'Diferencie "causa estrutural" (disputa imperialista por colônias e mercados) do "estopim" (atentado ao arquiduque Francisco Ferdinando em Sarajevo).'
  }
];
