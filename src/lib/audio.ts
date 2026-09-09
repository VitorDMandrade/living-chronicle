// src/lib/audio.ts
// @ts-check

class SoundEngine {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;

  private initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Clique de telégrafo mecânico da Chancelaria (micro-interação)
   */
  public playTelegraphClick(): void {
    const ctx = this.initContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.035);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(3.5, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  /**
   * Impacto encorpado do carimbo imperial com ressonância de mesa de mogno
   */
  public playWaxSealImpact(): void {
    const ctx = this.initContext();
    const now = ctx.currentTime;

    // 1. Golpe subgrave inicial (baque de madeira maciça)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.35);

    subGain.gain.setValueAtTime(0.65, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.42);

    // 2. Fricção de bronze/metal contra papel pergaminho
    const bufferSize = Math.floor(ctx.sampleRate * 0.15);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(1800, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(200, now + 0.12);

    const noiseGainNode = ctx.createGain();
    noiseGainNode.gain.setValueAtTime(0.35, now);
    noiseGainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGainNode);
    noiseGainNode.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.15);
  }

  /**
   * Zumbido térmico contínuo de caldeira a vapor em baixa frequência
   */
  public startSteamDrone(): void {
    const ctx = this.initContext();
    if (this.noiseNode) return;

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    // Gerador de ruído marrom (brownian noise) para simular pressão de vapor contínua
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    this.noiseNode = ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, ctx.currentTime);

    this.noiseGain = ctx.createGain();
    this.noiseGain.gain.setValueAtTime(0.001, ctx.currentTime);
    this.noiseGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 3.0);

    this.noiseNode.connect(filter);
    filter.connect(this.noiseGain);
    this.noiseGain.connect(ctx.destination);

    this.noiseNode.start();
  }

  public stopSteamDrone(): void {
    if (this.noiseGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.noiseGain.gain.linearRampToValueAtTime(0.001, now + 1.5);
      setTimeout(() => {
        if (this.noiseNode) {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
          this.noiseNode = null;
        }
      }, 1500);
    }
  }
}

export const sound = new SoundEngine();

// Aliases para compatibilidade total com os componentes existentes
export function playChancellerySeal(enabled = true): void {
  if (enabled) sound.playWaxSealImpact();
}

export function playTelegraphBeep(enabled = true): void {
  if (enabled) sound.playTelegraphClick();
}

export function startSteamAmbience(enabled = true): void {
  if (enabled) sound.startSteamDrone();
}

export function playImperialGavel(enabled = true): void {
  if (enabled) sound.playWaxSealImpact();
}
