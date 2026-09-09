// src/lib/audio.ts
// @ts-check

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmAudio: HTMLAudioElement | null = null;
  private bgmSource: MediaElementAudioSourceNode | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private isBgmPlaying: boolean = false;
  private compressor: DynamicsCompressorNode | null = null;

  private initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      // Compressor master para coesão acústica e prevenção de clipping
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.1, this.ctx.currentTime);
      this.compressor.connect(this.ctx.destination);

      // Barramento de SFX
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.sfxGain.connect(this.compressor);

      // Barramento de Drone contínuo
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      this.droneGain.connect(this.compressor);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Inicializa e orquestra a trilha sonora contínua em loop
   */
  public mountBGM(audioUrl: string = '/assets/audio/imperialism_theme.mp3'): void {
    if (this.bgmAudio) return;

    this.bgmAudio = new Audio(audioUrl);
    this.bgmAudio.loop = true;
    this.bgmAudio.crossOrigin = 'anonymous';
    this.bgmAudio.preload = 'auto';
  }

  public async startBGM(): Promise<void> {
    const ctx = this.initContext();
    if (!this.bgmAudio) {
      this.mountBGM();
    }
    if (!this.bgmAudio) return;

    if (!this.bgmSource && this.compressor) {
      this.bgmSource = ctx.createMediaElementSource(this.bgmAudio);
      this.bgmGain = ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.bgmGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 2.5);
      this.bgmSource.connect(this.bgmGain);
      this.bgmGain.connect(this.compressor);
    } else if (this.bgmGain) {
      this.bgmGain.gain.cancelScheduledValues(ctx.currentTime);
      this.bgmGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.5);
    }

    try {
      await this.bgmAudio.play();
      this.isBgmPlaying = true;
    } catch {
      // Autoplay bloqueado pelo browser; ativará no próximo clique do usuário
    }
  }

  public toggleBGM(): boolean {
    if (this.isBgmPlaying && this.bgmGain && this.ctx) {
      this.bgmGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        this.bgmAudio?.pause();
        this.isBgmPlaying = false;
      }, 800);
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  /**
   * Aplica atenuação imediata (ducking) na música para dar destaque a SFX cruciais
   */
  private triggerDucking(targetGain: number = 0.07, recoveryTimeSec: number = 0.7): void {
    if (!this.bgmGain || !this.ctx || !this.isBgmPlaying) return;
    const now = this.ctx.currentTime;
    this.bgmGain.gain.cancelScheduledValues(now);
    this.bgmGain.gain.setValueAtTime(this.bgmGain.gain.value, now);
    this.bgmGain.gain.exponentialRampToValueAtTime(targetGain, now + 0.05);
    this.bgmGain.gain.exponentialRampToValueAtTime(0.22, now + recoveryTimeSec);
  }

  public playTelegraphClick(): void {
    const ctx = this.initContext();
    this.triggerDucking(0.14, 0.25);
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(840, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.03);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1250, now);
    filter.Q.setValueAtTime(4.0, now);

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(filter);
    filter.connect(gain);
    if (this.sfxGain) gain.connect(this.sfxGain);
    else gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  /**
   * Rajada rítmica de pulsos de código Morse para recepção de despachos telegráficos
   */
  public playMorseBurst(): void {
    const ctx = this.initContext();
    this.triggerDucking(0.12, 0.4);
    const now = ctx.currentTime;
    const intervals = [0, 0.05, 0.12, 0.17, 0.26]; // Cadência mecânica de telégrafo

    intervals.forEach((timeOffset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1080, now + timeOffset);

      gain.gain.setValueAtTime(0.09, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + timeOffset + 0.035);

      osc.connect(gain);
      if (this.sfxGain) gain.connect(this.sfxGain);
      else gain.connect(ctx.destination);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + 0.04);
    });
  }

  public playWaxSealImpact(): void {
    const ctx = this.initContext();
    this.triggerDucking(0.04, 0.9);
    const now = ctx.currentTime;

    // Subgrave de madeira nobre maciça
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(28, now + 0.45);

    subGain.gain.setValueAtTime(0.8, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    subOsc.connect(subGain);
    if (this.sfxGain) subGain.connect(this.sfxGain);
    else subGain.connect(ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + 0.55);

    // Atrito do metal de bronze e cera quente
    const bufferSize = Math.floor(ctx.sampleRate * 0.18);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(1900, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(150, now + 0.16);

    const noiseGainNode = ctx.createGain();
    noiseGainNode.gain.setValueAtTime(0.45, now);
    noiseGainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGainNode);
    if (this.sfxGain) noiseGainNode.connect(this.sfxGain);
    else noiseGainNode.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.2);
  }

  public startSteamDrone(): void {
    const ctx = this.initContext();
    if (this.noiseNode) return;

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.0;
    }

    this.noiseNode = ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, ctx.currentTime);

    this.noiseNode.connect(filter);
    if (this.droneGain) {
      filter.connect(this.droneGain);
    } else {
      filter.connect(ctx.destination);
    }

    this.noiseNode.start();
  }

  public stopSteamDrone(): void {
    if (this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 1.0);
      setTimeout(() => {
        if (this.noiseNode) {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
          this.noiseNode = null;
        }
      }, 1000);
    }
  }
}

export const sound = new SoundEngine();

// Aliases para retrocompatibilidade
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

export function playMorseBurst(enabled = true): void {
  if (enabled) sound.playMorseBurst();
}
