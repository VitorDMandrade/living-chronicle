export interface SceneParams {
  steamDensity: number;      // 0 a 1 (intensidade de fuligem industrial)
  mapLineProgress: number;   // 0 a 1 (fronteiras artificiais sendo traçadas)
  dangerAlert: number;       // 0 a 1 (alerta vermelho imperial / conflito)
  cameraZoom: number;        // 1 a 1.3
}

export interface ChronicleAct {
  id: string;
  actBadge: string;
  title: string;
  historicalContext: string;
  causalChain: string[];
  examTrap: string;
  sceneParams: SceneParams;
}

export interface ChronicleChapter {
  id: string;
  discipline: string;
  epoch: string;
  title: string;
  subtitle: string;
  acts: ChronicleAct[];
}
