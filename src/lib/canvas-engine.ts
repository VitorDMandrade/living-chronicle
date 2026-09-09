// src/lib/canvas-engine.ts
// @ts-check

export interface CanvasSceneParams {
  scrollProgress: number; // 0.0 a 1.0
  mouseX: number;
  mouseY: number;
  isInspecting?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
}

export class ChronicleCanvasEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;
  private particles: Particle[] = [];
  private animFrameId: number | null = null;
  private smoothedMouse = { x: 0.5, y: 0.5 };
  private compassRotation: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) throw new Error('Não foi possível obter o contexto 2D do canvas.');
    this.ctx = context;
    this.handleResize();
    this.initParticles();
  }

  public handleResize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(dpr, dpr);
  }

  private initParticles(): void {
    const count = 45;
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  private createParticle(randomAge: boolean = false): Particle {
    const maxLife = 140 + Math.random() * 180;
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.2 - Math.random() * 0.45, // Movimento lento ascendente (fuligem e vapor)
      size: 1.2 + Math.random() * 2.8,
      alpha: 0,
      maxAlpha: 0.08 + Math.random() * 0.22,
      life: randomAge ? Math.random() * maxLife : 0,
      maxLife,
    };
  }

  public render(params: CanvasSceneParams): void {
    const { scrollProgress, mouseX, mouseY } = params;

    // Interpolação suave do mouse (Inércia física de 0.05)
    this.smoothedMouse.x += (mouseX - this.smoothedMouse.x) * 0.05;
    this.smoothedMouse.y += (mouseY - this.smoothedMouse.y) * 0.05;

    // 1. Limpeza translúcida para manter o vídeo do Google Flow visível
    this.ctx.clearRect(0, 0, this.width, this.height);

    const grad = this.ctx.createRadialGradient(
      this.width * 0.5,
      this.height * 0.5,
      100,
      this.width * 0.5,
      this.height * 0.5,
      Math.max(this.width, this.height) * 0.8
    );
    grad.addColorStop(0, 'rgba(9, 10, 12, 0.15)');
    grad.addColorStop(1, 'rgba(6, 8, 11, 0.65)');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Fuligem de carvão e cinzas industriais
    this.renderAtmosphericDust();

    // 3. Mesa Cartográfica: Silhueta estilizada da África com paralaxe
    this.renderCartographicStage(scrollProgress);

    // 4. Compasso Geodésico Imperial de latão oscilando com o cursor
    this.renderBrassCompass(scrollProgress);
  }

  private renderAtmosphericDust(): void {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;

      // Curva de opacidade com fade-in e fade-out
      const progress = p.life / p.maxLife;
      if (progress < 0.2) {
        p.alpha = (progress / 0.2) * p.maxAlpha;
      } else if (progress > 0.8) {
        p.alpha = ((1 - progress) / 0.2) * p.maxAlpha;
      } else {
        p.alpha = p.maxAlpha;
      }

      if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > this.width + 10) {
        this.particles[i] = this.createParticle();
      }

      this.ctx.fillStyle = `rgba(215, 205, 185, ${p.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private renderCartographicStage(scrollProgress: number): void {
    const offsetX = (this.smoothedMouse.x - 0.5) * 32;
    const offsetY = (this.smoothedMouse.y - 0.5) * 32;

    const centerX = this.width * 0.55 + offsetX;
    const centerY = this.height * 0.52 + offsetY;
    const mapScale = Math.min(this.width, this.height) * 0.0018;

    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    this.ctx.scale(mapScale, mapScale);

    // Grade Geodésica de Navegação Sutil
    this.ctx.strokeStyle = 'rgba(156, 148, 134, 0.08)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    for (let x = -280; x <= 280; x += 70) {
      this.ctx.moveTo(x, -280);
      this.ctx.lineTo(x, 280);
    }
    for (let y = -280; y <= 280; y += 70) {
      this.ctx.moveTo(-280, y);
      this.ctx.lineTo(280, y);
    }
    this.ctx.stroke();

    // Silhueta Vetorial Histórica do Continente Africano
    this.ctx.strokeStyle = 'rgba(237, 229, 216, 0.22)';
    this.ctx.lineWidth = 1.6;
    this.ctx.beginPath();
    // Contorno poligonal cartográfico estilizado
    this.ctx.moveTo(-70, -180); // Gibraltar / Norte
    this.ctx.lineTo(80, -170);  // Suez / Egito
    this.ctx.lineTo(130, -90);  // Chifre da África
    this.ctx.lineTo(95, 30);    // Costa Leste
    this.ctx.lineTo(55, 170);   // Cabo da Boa Esperança (Sul)
    this.ctx.lineTo(10, 180);   // Ponta Austral
    this.ctx.lineTo(-40, 120);  // Namíbia
    this.ctx.lineTo(-65, 30);   // Golfo da Guiné (Entrada)
    this.ctx.lineTo(-135, -20); // Protuberância Ocidental (Senegal)
    this.ctx.lineTo(-110, -120);// Saara Ocidental
    this.ctx.closePath();
    this.ctx.stroke();

    // --- LINHAS DA PARTILHA DE BERLIM (Ato II e Ato III) ---
    if (scrollProgress > 0.32) {
      const partitionFactor = Math.min(1.0, (scrollProgress - 0.32) / 0.38);

      this.ctx.save();
      this.ctx.strokeStyle = '#9e2a2b'; // Vermelho Carmesim Colonial
      this.ctx.lineWidth = 2.0;
      this.ctx.setLineDash([7, 5]);

      // Linha 1: Divisão Transversal Central (Congo / África Equatorial)
      this.ctx.beginPath();
      this.ctx.moveTo(-65, 20);
      this.ctx.lineTo(-65 + 155 * partitionFactor, 20 + 15 * partitionFactor);
      this.ctx.stroke();

      // Linha 2: Partilha Norte / África Ocidental
      if (partitionFactor > 0.4) {
        const subFactor = (partitionFactor - 0.4) / 0.6;
        this.ctx.beginPath();
        this.ctx.moveTo(-110, -80);
        this.ctx.lineTo(-110 + 120 * subFactor, -80 + 30 * subFactor);
        this.ctx.stroke();
      }

      // Linha 3: O Eixo Cairo-Cabo Britânico (Ato III - Tensão Máxima)
      if (scrollProgress > 0.68) {
        const cairoFactor = Math.min(1.0, (scrollProgress - 0.68) / 0.28);
        this.ctx.strokeStyle = '#c69b3f'; // Latão de conflito interimperialista
        this.ctx.beginPath();
        this.ctx.moveTo(70, -160);
        this.ctx.lineTo(70 - 25 * cairoFactor, -160 + 320 * cairoFactor);
        this.ctx.stroke();

        // Nós de Tensão Pulsantes (Fachoda e Transvaal)
        const pulse = 0.5 + Math.sin(Date.now() * 0.005) * 0.5;
        this.ctx.fillStyle = `rgba(158, 42, 43, ${0.4 + pulse * 0.4})`;
        this.ctx.beginPath();
        this.ctx.arc(60, -30, 4.5 + pulse * 2, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    this.ctx.restore();
  }

  private renderBrassCompass(scrollProgress: number): void {
    const compassX = this.width * 0.84 + (this.smoothedMouse.x - 0.5) * 45;
    const compassY = this.height * 0.28 + (this.smoothedMouse.y - 0.5) * 45;

    this.compassRotation = (this.smoothedMouse.x - 0.5) * 0.45 + scrollProgress * Math.PI * 0.25;

    this.ctx.save();
    this.ctx.translate(compassX, compassY);
    this.ctx.rotate(this.compassRotation);

    // Corpo circular do compasso
    this.ctx.strokeStyle = 'rgba(198, 155, 63, 0.35)'; // Latão oxidado
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 36, 0, Math.PI * 2);
    this.ctx.stroke();

    // Haste graduada do instrumento
    this.ctx.strokeStyle = 'rgba(198, 155, 63, 0.75)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -46);
    this.ctx.lineTo(0, 46);
    this.ctx.moveTo(-16, 0);
    this.ctx.lineTo(16, 0);
    this.ctx.stroke();

    // Rosa dos ventos estilizada
    this.ctx.fillStyle = 'rgba(237, 229, 216, 0.85)';
    this.ctx.beginPath();
    this.ctx.moveTo(0, -34);
    this.ctx.lineTo(5, -12);
    this.ctx.lineTo(0, -16);
    this.ctx.lineTo(-5, -12);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
  }

  public startLoop(getParams: () => CanvasSceneParams): void {
    const tick = () => {
      this.render(getParams());
      this.animFrameId = requestAnimationFrame(tick);
    };
    tick();
  }

  public stopLoop(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }
}
