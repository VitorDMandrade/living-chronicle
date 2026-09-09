import { ChronicleChapter } from '../types/chronicle';

export const IMPERIALISM_CHAPTER: ChronicleChapter = {
  id: 'imperialismo-seculo-xix',
  discipline: 'História Geral & Geopolítica',
  epoch: 'Século XIX (1870–1914)',
  title: 'A Partilha do Mundo',
  subtitle: 'Capital Monopolista, Fronteiras Artificiais e o Prelúdio da Grande Guerra',
  acts: [
    {
      id: 'act-1',
      actBadge: 'ATO I // A FOME DA MÁQUINA A VAPOR',
      title: 'A Segunda Revolução Industrial e a Crise de Superprodução',
      historicalContext: 'A partir de 1870, a ascensão do aço, do petróleo e da eletricidade acelerou a produção europeia a níveis sem precedentes. Com a Grande Depressão de 1873 e a saturação dos mercados internos, trustes e cartéis demandavam urgentemente matérias-primas essenciais (borracha, cobre, algodão) e mercados cativos exclusivos para escoar seus excedentes.',
      causalChain: [
        'Transição do capitalismo concorrencial para o capitalismo monopolista-financeiro',
        'Saturação do consumo interno europeu associada ao protecionismo alfandegário mútuo',
        'Necessidade inegociável de fontes de matérias-primas e exportação de capitais excedentes'
      ],
      examTrap: 'Pegadinha clássica (ENEM/FUVEST): Confundir Colonialismo Clássico (Séc. XVI - mercantilista, América, metais preciosos) com Neocolonialismo (Séc. XIX - industrial, África e Ásia, capital financeiro, partilha territorial direta).',
      sceneParams: { steamDensity: 0.9, mapLineProgress: 0.1, dangerAlert: 0.2, cameraZoom: 1.0 }
    },
    {
      id: 'act-2',
      actBadge: 'ATO II // A RÉGUA DE BERLIM & O FARDO DA MENTIRA',
      title: 'A Conferência de Berlim (1884–1885) e o Darwinismo Social',
      historicalContext: 'Convocada por Otto von Bismarck para evitar conflitos armados entre potências europeias, a Conferência de Berlim estabeleceu a regra da ocupação efetiva para a posse territorial. Com réguas e compassos, diplomatas traçaram fronteiras arbitrárias sem qualquer respeito às etnias, línguas e reinos africanos pré-existentes, mascarando a pilhagem sob o discurso etnocêntrico do "Fardo do Homem Branco" (Kipling) e a suposta "Missão Civilizadora".',
      causalChain: [
        'Instituição do princípio de ocupação militar e administrativa efetiva',
        'Apropriação ideológica do Darwinismo Social e Positivismo como álibi moral da espoliação',
        'Junção coercitiva de povos historicamente hostis e fragmentação violenta de nações aliadas'
      ],
      examTrap: 'Pegadinha de Vestibular Médico (Einstein/UNESP): Afirmar que a colonização levou progresso e saneamento de forma planejada. As poucas ferrovias construídas serviam exclusivamente ao escoamento de minérios aos portos, desestruturando toda a economia agrícola nativa.',
      sceneParams: { steamDensity: 0.45, mapLineProgress: 0.9, dangerAlert: 0.6, cameraZoom: 1.15 }
    },
    {
      id: 'act-3',
      actBadge: 'ATO III // O HORROR DA BORRACHA & A PAZ ARMADA',
      title: 'O Massacre no Congo Belga e a Marcha para 1914',
      historicalContext: 'Transformado em propriedade privada de Leopoldo II da Bélgica, o Estado Livre do Congo tornou-se o epicentro da atrocidade imperial: mutilações de mãos e trabalho forçado sistemático para a extração de borracha e marfim dizimaram cerca de 10 milhões de pessoas. As resistências autóctones (como a Guerra dos Boxers na China, a Revolta dos Cipaios na Índia e as Guerras Zulus) foram esmagadas pela superioridade das metralhadoras Maxim, enquanto a disputa por colônias gerava o acirramento das alianças militares da Paz Armada.',
      causalChain: [
        'Exploração predatória extrema do trabalho compulsório para abastecer indústrias ocidentais',
        'Resistências militares locais violentamente suprimidas por armamento de repetição',
        'Choques imperialistas diretos (Crises do Marrocos e Bálcãs) que serviram de causa estrutural da 1ª Guerra Mundial'
      ],
      examTrap: 'Atenção na prova: Jamais trate os povos colonizados como agentes passivos que aceitaram a dominação. Houve resistência armada contínua, rebeliões culturais e levantes diplomáticos em todo o continente.',
      sceneParams: { steamDensity: 0.3, mapLineProgress: 1.0, dangerAlert: 0.95, cameraZoom: 1.0 }
    }
  ]
};
