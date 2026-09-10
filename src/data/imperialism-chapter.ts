import { ChronicleChapter } from '../types/chronicle';

export const IMPERIALISM_CHAPTER: ChronicleChapter = {
  id: 'imperialismo-seculo-xix',
  discipline: 'História Geral & Geopolítica para Vestibulares',
  epoch: 'Século XIX (1870–1914)',
  title: 'A Partilha do Mundo & o Neocolonialismo',
  subtitle: 'Capital Monopolista, Ideologias de Dominação e o Prelúdio da Grande Guerra',
  acts: [
    {
      id: 'act-1',
      actBadge: 'ATO I // CAUSAS ECONÔMICAS & 2ª REV. INDUSTRIAL',
      vestibularTags: ['ENEM • Habilidade 11', 'FUVEST • Economia Política', 'UNICAMP'],
      title: 'A Segunda Revolução Industrial e o Capitalismo Monopolista',
      historicalContext:
        'A partir de 1870, a difusão do aço, do petróleo, da eletricidade e dos motores a combustão impulsionou a produtividade industrial na Europa e nos EUA. Contudo, a Grande Depressão de 1873 demonstrou a saturação dos mercados consumidores internos e a queda das taxas de lucro. O capitalismo concorrencial cedeu lugar ao capitalismo monopolista e financeiro: grandes corporações unificaram-se a bancos (trustes, cartéis e holdings), exigindo a conquista de colônias para garantir reservas exclusivas de matérias-primas e o escoamento de capitais excedentes.',
      keyConcepts: [
        'Capitalismo Monopolista-Financeiro (Trustes, Cartéis e Holdings)',
        'Grande Depressão de 1873 & Saturação dos Mercados Internos',
        'Busca por Matérias-Primas (Borracha, Petróleo, Cobre, Algodão)',
        'Exportação de Capitais Excedentes e Protecionismo Europeu'
      ],
      causalChain: [
        '2ª Revolução Industrial gera salto produtivo e crise de superprodução',
        'Fusão do capital industrial com o capital bancário gerando monopólios',
        'Protecionismo mútuo na Europa obriga a busca por mercados cativos ultramarinos',
        'Ocupação imperialista como saída estrutural para manter taxas de lucro'
      ],
      examAnalysis:
        'O ENEM e a FUVEST cobram sistematicamente o nexo econômico: o Neocolonialismo NÃO foi fruto de mera ambição militar ou "curiosidade geográfica", mas sim uma necessidade estrutural do capitalismo industrial monopolista em crise de superprodução após 1873.',
      examTrap:
        'CONFUSÃO CLÁSSICA (ENEM/FUVEST): Não confunda Colonialismo do Séc. XVI (Mercantilismo, América, busca de ouro e prata, exclusivo metropolitano do pacto colonial) com Neocolonialismo do Séc. XIX (Capitalismo Industrial/Financeiro, África e Ásia, busca de matérias-primas industriais, mercados cativos e exportação de capitais).',
      comparativeTable: {
        title: 'Quadro Comparativo Obrigatório no Vestibular',
        colA: 'Colonialismo Clássico (Séc. XVI)',
        colB: 'Neocolonialismo / Imperialismo (Séc. XIX)',
        rows: [
          {
            label: 'Fase Capitalista',
            valA: 'Capitalismo Comercial / Mercantilismo',
            valB: 'Capitalismo Monopolista e Financeiro'
          },
          {
            label: 'Alvo Geográfico',
            valA: 'Continente Americano',
            valB: 'África e Ásia'
          },
          {
            label: 'Objetivo Central',
            valA: 'Metais preciosos (ouro/prata) e especiarias tropicais',
            valB: 'Matérias-primas industriais (petróleo, borracha, cobre) e mercados'
          },
          {
            label: 'Agente Impulsionador',
            valA: 'Monarquias Absolutistas e burguesia mercantil',
            valB: 'Estados Nacionais burgueses, trustes, cartéis e bancos'
          },
          {
            label: 'Justificativa Ideológica',
            valA: 'Expansão da fé cristã (Contrarreforma / Catequese)',
            valB: 'Darwinismo Social, Positivismo e "Missão Civilizadora"'
          }
        ]
      },
      sceneParams: { steamDensity: 0.9, mapLineProgress: 0.1, dangerAlert: 0.2, cameraZoom: 1.0 }
    },
    {
      id: 'act-2',
      actBadge: 'ATO II // IDEOLOGIAS DE DOMINAÇÃO & CONFERÊNCIA DE BERLIM',
      vestibularTags: ['ENEM • Habilidade 9', 'FUVEST • Ideologia', 'UNESP • Geopolítica'],
      title: 'O Fardo do Homem Branco e a Régua de Berlim (1884–1885)',
      historicalContext:
        'Para legitimar a violência da espoliação, as elites europeias construíram um discurso pseudocientífico fundamentado no Darwinismo Social (Herbert Spencer) e no Positivismo: a ideia de que a "raça branca" ocupava o ápice da evolução biológica e cultural, cabendo-lhe o "Fardo do Homem Branco" (poema de Rudyard Kipling) de levar a "Missão Civilizadora" aos povos supostamente "bárbaros". Sob a mediação de Otto von Bismarck, a Conferência de Berlim estabeleceu a regra da "Ocupação Efetiva" e traçou fronteiras arbitrárias sem consultar nenhuma liderança africana.',
      keyConcepts: [
        'Darwinismo Social (Hierarquização racista pseudocientífica)',
        'O "Fardo do Homem Branco" & a "Missão Civilizadora" (Alibi Moral)',
        'Conferência de Berlim (1884–1885): Princípio da Ocupação Efetiva',
        'Fronteiras Artificiais (Causa das guerras civis contemporâneas na África)'
      ],
      causalChain: [
        'Elaboração de teorias raciais pseudocientíficas para legitimar a dominação',
        'Convocação da Conferência de Berlim para evitar guerras entre potências europeias',
        'Substituição do direito de descoberta pela regra da ocupação militar/administrativa efetiva',
        'Traçado com régua e compasso unindo etnias rivais e dividindo povos históricos'
      ],
      examAnalysis:
        'A FUVEST e a UNICAMP focam na contradição do discurso: enquanto propagavam caridade e progresso, as potências pilhavam recursos. Nas questões de Geopolítica e Atualidades, o traçado arbitrário de Berlim é cobrado como raiz direta dos conflitos étnicos africanos modernos (ex: Genocídio de Ruanda em 1994 e conflitos no Sudão).',
      examTrap:
        'PEGADINHA REPETIDA EM PROVA: Afirmar que a colonização levou modernização e infraestrutura beneficente. As ferrovias e portos construídos pela Europa tinham traçado unicamente extrativo (ligavam minas e plantações diretamente aos portos de exportação), sem qualquer integração interna ou benefício à população nativa.',
      sceneParams: { steamDensity: 0.45, mapLineProgress: 0.9, dangerAlert: 0.6, cameraZoom: 1.15 }
    },
    {
      id: 'act-3',
      actBadge: 'ATO III // VIOLÊNCIA COLONIAL, RESISTÊNCIAS & RUMO A 1914',
      vestibularTags: ['ENEM • Habilidade 8 (Resistências)', 'FUVEST • Causas da 1ª Guerra'],
      title: 'O Massacre do Congo, as Lutas Anticoloniais e a Marcha para 1914',
      historicalContext:
        'O Estado Livre do Congo (1885–1908), transformado em propriedade privada de Leopoldo II da Bélgica, converteu-se no símbolo máximo do terror imperialista: trabalhos forçados de extração de borracha e marfim, com mutilações de mãos e punições corporais que custaram a vida de até 10 milhões de congoleses. Ao mesmo tempo, os povos colonizados organizaram intensas resistências armadas e culturais em todo o globo. As disputas acirradas por mercados e colônias geraram incidentes diplomáticos (Fachoda, Crises do Marrocos) que alimentaram a corrida armamentista da Paz Armada e culminaram na 1ª Guerra Mundial.',
      keyConcepts: [
        'Terror no Estado Livre do Congo (Propriedade privada de Leopoldo II)',
        'Resistências Anticoloniais (Desconstrução do mito da passividade)',
        'Revolta dos Cipaios (Índia, 1857) & Guerra dos Boxers (China, 1899)',
        'Batalha de Adwa (Etiópia, 1896: vitória africana contra invasão italiana)',
        'Paz Armada & Crises Imperialistas (Causa estrutural da 1ª Guerra)'
      ],
      causalChain: [
        'Exploração predatória com terror e trabalho compulsório no continente africano',
        'Reações organizadas dos povos autóctones (guerrilhas, levantes e vitórias militares)',
        'Atritos interimperialistas diretos (Incidentes de Fachoda, Crises Marroquinas e Bálcãs)',
        'Formação de alianças militares rígidas que explodem no estopim de 1914'
      ],
      examAnalysis:
        'O ENEM EXIGE que o vestibulando DESCONSTRUA o mito da passividade africana e asiática. A dominação NUNCA foi pacífica: houve resistência armada tenaz (Adwa na Etiópia, Cipaios na Índia, Boxers na China, Zulus na África do Sul). Na FUVEST, o Imperialismo é cobrado como a CAUSA ESTRUTURAL PRIMORDIAL da Primeira Guerra Mundial.',
      examTrap:
        'CUIDADO COM O DISTRATOR DO ENEM: Alternativas que afirmam que os africanos aceitaram passivamente a dominação europeia ou que a superioridade militar ocidental impediu qualquer resistência são SEMPRE FALSAS. A vitória do imperador Menelik II da Etiópia contra a Itália na Batalha de Adwa (1896) é exemplo clássico cobrado.',
      sceneParams: { steamDensity: 0.3, mapLineProgress: 1.0, dangerAlert: 0.95, cameraZoom: 1.0 }
    }
  ]
};
