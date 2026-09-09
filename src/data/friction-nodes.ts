export interface FrictionNode {
  id: string;
  name: string;
  year: string;
  region: string;
  powers: string;
  coords: { x: number; y: number }; // Coordenadas no espaço da mesa cartográfica
  primarySource: {
    author: string;
    quote: string;
    date: string;
  };
  geopoliticalClash: string;
  bancaInsight: string;
}

export const FRICTION_NODES: FrictionNode[] = [
  {
    id: 'suez',
    name: 'Canal de Suez & Ocupação do Egito',
    year: '1882',
    region: 'Norte da África / Mar Vermelho',
    powers: 'Império Britânico vs. Nacionalistas Egípcios (Urabi Paxá)',
    coords: { x: 75, y: -165 },
    primarySource: {
      author: 'Lorde Cromer (Cônsul-Geral Britânico no Egito)',
      quote:
        '"O Egito não pode governar a si mesmo; o Canal de Suez é a jugular do Império Britânico que conecta Londres a Bombaim. Abandoná-lo seria o suicídio naval de nossa hegemonia."',
      date: 'Despacho confidencial ao Foreign Office, 1883',
    },
    geopoliticalClash:
      'A abertura do canal reduziu pela metade a rota marítima para a Índia ("A Joia da Coroa"). O endividamento do quediva egípcio abriu brecha para a compra das ações por Benjamin Disraeli e a invasão militar unilateral britânica em 1882, ignorando a soberania otomana.',
    bancaInsight:
      'FUVEST/UNICAMP: Bancas cobram Suez como a chave-mestra da infraestrutura imperialista global — a ligação umbilical entre a finança londrina e o mercado cativo do subcontinente indiano.',
  },
  {
    id: 'congo',
    name: 'Estado Livre do Congo',
    year: '1885',
    region: 'Bacia Hidrográfica do Rio Congo',
    powers: 'Rei Leopoldo II da Bélgica (Posse Pessoal Privada)',
    coords: { x: -15, y: 25 },
    primarySource: {
      author: 'E. D. Morel (Denúncia das Atrocidades no Congo)',
      quote:
        '"Para cada tonelada de látex exportada para as fábricas de pneus da Europa, uma aldeia inteira é queimada e mãos decepadas são contabilizadas como comprovante de cartuchos disparados."',
      date: 'King Leopold’s Soliloquy / Relatórios Oficiais, 1904',
    },
    geopoliticalClash:
      'Leopoldo II mascarou a tomada do Congo como "filantropia científica e combate à escravidão árabe". Na prática, estabeleceu um regime de terror e trabalho forçado (Force Publique) para suprir a voracidade da indústria de borracha e marfim da Segunda Revolução Industrial.',
    bancaInsight:
      'ENEM/FUVEST: O Congo Belga é o exemplo máximo da "Farsa Humanitária" — o choque frontal entre o discurso civilizatório e a realidade do genocídio extrativista financiado por capitais privados.',
  },
  {
    id: 'fachoda',
    name: 'Incidente de Fachoda',
    year: '1898',
    region: 'Alto Nilo (Sudão Atual)',
    powers: 'França (Capitão Marchand) vs. Grã-Bretanha (General Kitchener)',
    coords: { x: 60, y: -30 },
    primarySource: {
      author: 'Telégrafo do General Kitchener a Lorde Salisbury',
      quote:
        '"Encontrei a expedição francesa entrincheirada em Fachoda sob bandeira tricolor. Informei ao capitão Marchand que o Nilo não admite duas potências. Estamos a um fio da guerra generalizada."',
      date: 'Telégrafo de Campanha, 19 de Setembro de 1898',
    },
    geopoliticalClash:
      'A colisão direta entre dois projetos coloniais expansionistas: o eixo transversal Oeste-Leste francês (Dacar ao Djibuti) e o eixo longitudinal Norte-Sul britânico (Cairo ao Cabo). A retirada francesa humilhante cimentou o controle inglês sobre toda a bacia nilótica.',
    bancaInsight:
      'UNICAMP/FUVEST: Fachoda simboliza o "Quase-1914": o ponto de atrito em que rivalidades periféricas em solo africano quase anteciparam a Primeira Guerra Mundial em dezesseis anos.',
  },
  {
    id: 'transvaal',
    name: 'Guerra dos Bôeres (Transvaal & Orange)',
    year: '1899–1902',
    region: 'Sul da África (Witwatersrand)',
    powers: 'Império Britânico vs. Repúblicas Bôeres (Africânderes)',
    coords: { x: 35, y: 135 },
    primarySource: {
      author: 'Cecil Rhodes (Primeiro-Ministro da Colônia do Cabo)',
      quote:
        '"Pensar nestas estrelas que vemos à noite, estes vastos mundos que nunca poderemos alcançar. Se eu pudesse, anexaria os planetas; frequentemente penso nisso."',
      date: 'Declaração política sobre o Transvaal, 1895',
    },
    geopoliticalClash:
      'A descoberta das maiores reservas mundiais de ouro e diamantes no Transvaal atraiu capitais britânicos liderados por Cecil Rhodes. O conflito com os colonos de origem holandesa (bôeres) inaugurou a tática de terra arrasada e os primeiros campos de concentração da modernidade.',
    bancaInsight:
      'FUVEST/ENEM: Revela que o imperialismo não poupou sequer populações de origem europeia quando os interesses de cartéis mineradores e monopólios financeiros britânicos estavam em jogo.',
  },
];
