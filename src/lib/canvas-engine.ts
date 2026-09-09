import { SceneParams } from '../types/chronicle';

export class ImperialismCanvasEngine {
  private time = 0;
  private currentTiltX = 0;
  private currentTiltY = 0;

  public render(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    params: SceneParams,
    targetMouseX = 0,
    targetMouseY = 0
  ) {
    this.time += 0.015;

    // Interpolação suave do paralaxe inercial
    this.currentTiltX += (targetMouseX - this.currentTiltX) * 0.04;
    this.currentTiltY += (targetMouseY - this.currentTiltY) * 0.04;

    ctx.clearRect(0, 0, width, height);

    // 1. Fundo com vinheta de carvão e metalurgia
    const bg = ctx.createRadialGradient(
      width / 2 + this.currentTiltX * 20,
      height / 2 + this.currentTiltY * 20,
      40,
      width / 2,
      height / 2,
      width * 0.75
    );
    bg.addColorStop(0, '#101520');
    bg.addColorStop(1, '#06080b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // 2. Vapor industrial volumétrico (Chaminés da 2ª Revolução Industrial)
    for (let i = 0; i < 18; i++) {
      const fogX = (Math.sin(this.time * 0.25 + i * 0.7) * 0.5 + 0.5) * width + this.currentTiltX * (i * 3);
      const fogY = height * 0.35 + i * 16 + this.currentTiltY * (i * 2);
      const fogRad = 110 + Math.sin(this.time + i) * 40;

      const grad = ctx.createRadialGradient(fogX, fogY, 10, fogX, fogY, fogRad);
      grad.addColorStop(0, `rgba(28, 35, 48, ${params.steamDensity * 0.3})`);
      grad.addColorStop(1, 'rgba(6, 8, 11, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(fogX, fogY, fogRad, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Projeção Cartográfica Abstrata com deslocamento de paralaxe
    const cx = width * 0.5 + this.currentTiltX * 35;
    const cy = height * 0.5 + this.currentTiltY * 25;

    ctx.save();
    ctx.translate(cx, cy);

    // Silhueta do continente africano em traço sutil
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -110);
    ctx.quadraticCurveTo(80, -90, 85, -20);
    ctx.quadraticCurveTo(110, 20, 60, 90);
    ctx.quadraticCurveTo(20, 140, 0, 160);
    ctx.quadraticCurveTo(-40, 130, -55, 60);
    ctx.quadraticCurveTo(-110, 10, -90, -50);
    ctx.closePath();
    ctx.stroke();

    // 4. Linhas de Partilha Imperial (Fronteiras Artificiais Cortando o Mapa)
    if (params.mapLineProgress > 0) {
      const p = params.mapLineProgress;
      ctx.strokeStyle = `rgba(220, 38, 38, ${0.4 + p * 0.5})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);

      // Linha Transversal 1
      ctx.beginPath();
      ctx.moveTo(-100, -30);
      ctx.lineTo(-100 + 190 * p, -30);
      ctx.stroke();

      // Linha Transversal 2
      ctx.beginPath();
      ctx.moveTo(-50, 40);
      ctx.lineTo(-50 + 140 * p, 40 + 20 * p);
      ctx.stroke();

      // Linha Vertical 3 (Eixo Norte-Sul)
      ctx.beginPath();
      ctx.moveTo(35, -90);
      ctx.lineTo(35, -90 + 220 * p);
      ctx.stroke();

      ctx.setLineDash([]);
    }

    // 5. Compasso de Latão e Mira Cartográfica
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, 130, 0, Math.PI * 2);
    ctx.stroke();

    for (let a = 0; a < 12; a++) {
      const ang = (a / 12) * Math.PI * 2 + this.time * 0.05;
      const x1 = Math.cos(ang) * 124;
      const y1 = Math.sin(ang) * 124;
      const x2 = Math.cos(ang) * 130;
      const y2 = Math.sin(ang) * 130;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    ctx.restore();
  }
}
