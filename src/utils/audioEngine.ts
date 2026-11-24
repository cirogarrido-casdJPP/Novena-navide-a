import { BuiltinMelodyId } from '../data/villancicos';

/**
 * Motor de audio dual para la Novena de Navidad:
 * 1. Reproduce archivos locales (.mp3 / .ogg / .wav) o cargados por la institución cuando están disponibles.
 * 2. Si no existe archivo local, reproduce arreglos polifónicos suaves en Web Audio API (celesta/campanas)
 *    para que los villancicos, los gozos y la música ambiental funcionen siempre de forma inmediata.
 */

interface NoteStep {
  freq: number;
  beats: number;
  bassFreq?: number;
}

// Frecuencias musicales (Hz)
const N = {
  REST: 0,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, Cs4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99,
  G4: 392.0, Gs4: 415.3, A4: 440.0, Bb4: 466.16, B4: 493.88,
  C5: 523.25, Cs5: 554.37, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, A5: 880.0,
};

const MELODIES: Record<BuiltinMelodyId, { bpm: number; notes: NoteStep[] }> = {
  'noche-de-paz': {
    bpm: 82,
    notes: [
      { freq: N.G4, beats: 1.5, bassFreq: N.C3 }, { freq: N.A4, beats: 0.5 }, { freq: N.G4, beats: 1 }, { freq: N.E4, beats: 3 },
      { freq: N.G4, beats: 1.5, bassFreq: N.C3 }, { freq: N.A4, beats: 0.5 }, { freq: N.G4, beats: 1 }, { freq: N.E4, beats: 3 },
      { freq: N.D5, beats: 2, bassFreq: N.G3 }, { freq: N.D5, beats: 1 }, { freq: N.B4, beats: 3 },
      { freq: N.C5, beats: 2, bassFreq: N.C3 }, { freq: N.C5, beats: 1 }, { freq: N.G4, beats: 3 },
      { freq: N.A4, beats: 2, bassFreq: N.F3 }, { freq: N.A4, beats: 1 }, { freq: N.C5, beats: 1.5 }, { freq: N.B4, beats: 0.5 }, { freq: N.A4, beats: 1 },
      { freq: N.G4, beats: 1.5, bassFreq: N.C3 }, { freq: N.A4, beats: 0.5 }, { freq: N.G4, beats: 1 }, { freq: N.E4, beats: 3 },
      { freq: N.D5, beats: 2, bassFreq: N.G3 }, { freq: N.D5, beats: 1 }, { freq: N.F5, beats: 1.5 }, { freq: N.D5, beats: 0.5 }, { freq: N.B4, beats: 1 },
      { freq: N.C5, beats: 3, bassFreq: N.C3 }, { freq: N.E5, beats: 3 },
      { freq: N.C5, beats: 1.5, bassFreq: N.G3 }, { freq: N.G4, beats: 0.5 }, { freq: N.E4, beats: 1 }, { freq: N.G4, beats: 1.5 }, { freq: N.F4, beats: 0.5 }, { freq: N.D4, beats: 1 },
      { freq: N.C4, beats: 4, bassFreq: N.C3 },
    ],
  },
  'campana-sobre-campana': {
    bpm: 112,
    notes: [
      { freq: N.G4, beats: 1, bassFreq: N.C3 }, { freq: N.G4, beats: 0.5 }, { freq: N.G4, beats: 0.5 }, { freq: N.G4, beats: 1 }, { freq: N.E4, beats: 1 },
      { freq: N.F4, beats: 1, bassFreq: N.G3 }, { freq: N.G4, beats: 0.5 }, { freq: N.F4, beats: 0.5 }, { freq: N.E4, beats: 2 },
      { freq: N.G4, beats: 1, bassFreq: N.C3 }, { freq: N.G4, beats: 0.5 }, { freq: N.G4, beats: 0.5 }, { freq: N.G4, beats: 1 }, { freq: N.E4, beats: 1 },
      { freq: N.F4, beats: 1, bassFreq: N.G3 }, { freq: N.G4, beats: 0.5 }, { freq: N.F4, beats: 0.5 }, { freq: N.E4, beats: 2 },
      { freq: N.A4, beats: 1, bassFreq: N.F3 }, { freq: N.A4, beats: 0.5 }, { freq: N.C5, beats: 0.5 }, { freq: N.B4, beats: 1 }, { freq: N.A4, beats: 1 },
      { freq: N.G4, beats: 1, bassFreq: N.C3 }, { freq: N.G4, beats: 0.5 }, { freq: N.A4, beats: 0.5 }, { freq: N.G4, beats: 2 },
      { freq: N.F4, beats: 1, bassFreq: N.G3 }, { freq: N.E4, beats: 1 }, { freq: N.D4, beats: 1 }, { freq: N.G4, beats: 1 },
      { freq: N.E4, beats: 1 }, { freq: N.D4, beats: 1 }, { freq: N.C4, beats: 2, bassFreq: N.C3 },
    ],
  },
  'tutaina': {
    bpm: 116,
    notes: [
      { freq: N.E4, beats: 0.5, bassFreq: N.C3 }, { freq: N.G4, beats: 0.5 }, { freq: N.C5, beats: 1 }, { freq: N.C5, beats: 1 }, { freq: N.B4, beats: 0.5 }, { freq: N.A4, beats: 0.5 },
      { freq: N.G4, beats: 1.5, bassFreq: N.G3 }, { freq: N.E4, beats: 0.5 }, { freq: N.G4, beats: 2 },
      { freq: N.F4, beats: 0.5, bassFreq: N.G3 }, { freq: N.E4, beats: 0.5 }, { freq: N.D4, beats: 1 }, { freq: N.G4, beats: 1 }, { freq: N.F4, beats: 0.5 }, { freq: N.D4, beats: 0.5 },
      { freq: N.E4, beats: 2, bassFreq: N.C3 }, { freq: N.C4, beats: 2 },
      { freq: N.E4, beats: 1, bassFreq: N.C3 }, { freq: N.E4, beats: 1 }, { freq: N.F4, beats: 1 }, { freq: N.G4, beats: 1 },
      { freq: N.A4, beats: 1.5, bassFreq: N.F3 }, { freq: N.G4, beats: 0.5 }, { freq: N.F4, beats: 2 },
      { freq: N.D4, beats: 1, bassFreq: N.G3 }, { freq: N.E4, beats: 1 }, { freq: N.F4, beats: 1 }, { freq: N.D4, beats: 1 },
      { freq: N.C4, beats: 3, bassFreq: N.C3 }, { freq: N.REST, beats: 1 },
    ],
  },
  'peces-en-el-rio': {
    bpm: 118,
    notes: [
      { freq: N.A4, beats: 0.5, bassFreq: N.A3 }, { freq: N.A4, beats: 0.5 }, { freq: N.A4, beats: 0.5 }, { freq: N.B4, beats: 0.5 }, { freq: N.C5, beats: 1 }, { freq: N.A4, beats: 1 },
      { freq: N.Gs4, beats: 1, bassFreq: N.E3 }, { freq: N.E4, beats: 1 }, { freq: N.E4, beats: 2 },
      { freq: N.B4, beats: 0.5, bassFreq: N.E3 }, { freq: N.B4, beats: 0.5 }, { freq: N.B4, beats: 0.5 }, { freq: N.C5, beats: 0.5 }, { freq: N.D5, beats: 1 }, { freq: N.B4, beats: 1 },
      { freq: N.C5, beats: 1, bassFreq: N.A3 }, { freq: N.A4, beats: 1 }, { freq: N.A4, beats: 2 },
      { freq: N.C5, beats: 1, bassFreq: N.C3 }, { freq: N.C5, beats: 0.5 }, { freq: N.B4, beats: 0.5 }, { freq: N.A4, beats: 1 }, { freq: N.G4, beats: 1 },
      { freq: N.F4, beats: 1, bassFreq: N.D3 }, { freq: N.E4, beats: 1 }, { freq: N.D4, beats: 2 },
      { freq: N.E4, beats: 1, bassFreq: N.E3 }, { freq: N.F4, beats: 1 }, { freq: N.Gs4, beats: 1 }, { freq: N.B4, beats: 1 },
      { freq: N.A4, beats: 3, bassFreq: N.A3 }, { freq: N.REST, beats: 1 },
    ],
  },
  'tamborilero': {
    bpm: 88,
    notes: [
      { freq: N.C4, beats: 2, bassFreq: N.C3 }, { freq: N.D4, beats: 1 }, { freq: N.E4, beats: 1.5 }, { freq: N.E4, beats: 0.5 }, { freq: N.E4, beats: 1 },
      { freq: N.F4, beats: 0.5, bassFreq: N.F3 }, { freq: N.E4, beats: 0.5 }, { freq: N.F4, beats: 1 }, { freq: N.E4, beats: 2 },
      { freq: N.C4, beats: 1, bassFreq: N.C3 }, { freq: N.C4, beats: 1 }, { freq: N.D4, beats: 1 }, { freq: N.E4, beats: 1 }, { freq: N.E4, beats: 1 },
      { freq: N.E4, beats: 1 }, { freq: N.F4, beats: 0.5, bassFreq: N.F3 }, { freq: N.E4, beats: 0.5 }, { freq: N.F4, beats: 1 }, { freq: N.E4, beats: 2 },
      { freq: N.D4, beats: 0.5, bassFreq: N.G3 }, { freq: N.E4, beats: 0.5 }, { freq: N.F4, beats: 1 }, { freq: N.G4, beats: 1 }, { freq: N.G4, beats: 1 },
      { freq: N.G4, beats: 1 }, { freq: N.A4, beats: 0.5, bassFreq: N.F3 }, { freq: N.G4, beats: 0.5 }, { freq: N.F4, beats: 1 }, { freq: N.E4, beats: 2 },
      { freq: N.D4, beats: 1, bassFreq: N.G3 }, { freq: N.E4, beats: 0.5 }, { freq: N.D4, beats: 0.5 }, { freq: N.C4, beats: 3, bassFreq: N.C3 },
    ],
  },
  'nanita-nana': {
    bpm: 90,
    notes: [
      { freq: N.E4, beats: 1, bassFreq: N.A3 }, { freq: N.A4, beats: 1 }, { freq: N.C5, beats: 1 }, { freq: N.B4, beats: 1 },
      { freq: N.A4, beats: 1.5, bassFreq: N.A3 }, { freq: N.Gs4, beats: 0.5 }, { freq: N.A4, beats: 2 },
      { freq: N.C5, beats: 1, bassFreq: N.F3 }, { freq: N.D5, beats: 1 }, { freq: N.E5, beats: 1.5 }, { freq: N.D5, beats: 0.5 },
      { freq: N.C5, beats: 2, bassFreq: N.C3 }, { freq: N.B4, beats: 2, bassFreq: N.E3 },
      { freq: N.A4, beats: 1, bassFreq: N.A3 }, { freq: N.C5, beats: 1 }, { freq: N.B4, beats: 1 }, { freq: N.A4, beats: 1 },
      { freq: N.Gs4, beats: 1.5, bassFreq: N.E3 }, { freq: N.E4, beats: 0.5 }, { freq: N.A4, beats: 2, bassFreq: N.A3 },
    ],
  },
  'gozos-tradicionales': {
    bpm: 104,
    notes: [
      { freq: N.G4, beats: 1, bassFreq: N.C3 }, { freq: N.E4, beats: 0.5 }, { freq: N.G4, beats: 0.5 }, { freq: N.C5, beats: 1.5 }, { freq: N.B4, beats: 0.5 },
      { freq: N.A4, beats: 1, bassFreq: N.F3 }, { freq: N.G4, beats: 1 }, { freq: N.F4, beats: 1 }, { freq: N.E4, beats: 1 },
      { freq: N.D4, beats: 1, bassFreq: N.G3 }, { freq: N.E4, beats: 0.5 }, { freq: N.F4, beats: 0.5 }, { freq: N.G4, beats: 1.5 }, { freq: N.F4, beats: 0.5 },
      { freq: N.E4, beats: 1.5, bassFreq: N.C3 }, { freq: N.D4, beats: 0.5 }, { freq: N.C4, beats: 2 },
    ],
  },
};

class HolidayAudioEngine {
  private ctx: AudioContext | null = null;
  private activeHtmlAudio: HTMLAudioElement | null = null;
  private synthTimer: number | null = null;
  private bgSynthTimer: number | null = null;
  private bgHtmlAudio: HTMLAudioElement | null = null;
  private bgActive = false;
  private bgGain = 0.22;
  private trackGain = 0.45;
  private onTrackProgressCb: ((progress: number, isSynth: boolean) => void) | null = null;
  private onTrackEndCb: (() => void) | null = null;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private playBellNote(freq: number, durationSec: number, volume: number, bassFreq?: number) {
    if (!this.ctx || freq <= 0) return;
    const now = this.ctx.currentTime;

    // Oscilador principal cálido (campana / celesta navideña)
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(volume * 0.18, now);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.min(durationSec * 0.6, 0.5));

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + durationSec * 0.95);

    osc.connect(gain);
    oscHarmonic.connect(harmonicGain);
    harmonicGain.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + durationSec);
    oscHarmonic.stop(now + durationSec);

    if (bassFreq && bassFreq > 0) {
      const bass = this.ctx.createOscillator();
      const bGain = this.ctx.createGain();
      bass.type = 'sine';
      bass.frequency.setValueAtTime(bassFreq, now);
      bGain.gain.setValueAtTime(0.001, now);
      bGain.gain.linearRampToValueAtTime(volume * 0.45, now + 0.04);
      bGain.gain.exponentialRampToValueAtTime(0.0008, now + durationSec * 1.3);
      bass.connect(bGain);
      bGain.connect(this.ctx.destination);
      bass.start(now);
      bass.stop(now + durationSec * 1.35);
    }
  }

  public stopTrack() {
    if (this.activeHtmlAudio) {
      this.activeHtmlAudio.pause();
      this.activeHtmlAudio.currentTime = 0;
      this.activeHtmlAudio = null;
    }
    if (this.synthTimer !== null) {
      window.clearTimeout(this.synthTimer);
      this.synthTimer = null;
    }
  }

  public setTrackVolume(vol: number) {
    this.trackGain = Math.max(0, Math.min(1, vol));
    if (this.activeHtmlAudio) {
      this.activeHtmlAudio.volume = this.trackGain;
    }
  }

  public async playTrack(
    audioUrl: string | undefined,
    fallbackMelody: BuiltinMelodyId,
    onProgress?: (progress: number, usingSynth: boolean) => void,
    onEnded?: () => void
  ): Promise<{ usingSynth: boolean }> {
    this.stopTrack();
    this.onTrackProgressCb = onProgress ?? null;
    this.onTrackEndCb = onEnded ?? null;

    if (audioUrl && audioUrl.trim().length > 0) {
      try {
        const loaded = await new Promise<HTMLAudioElement | null>((resolve) => {
          const audio = new Audio(audioUrl);
          audio.volume = this.trackGain;
          const cleanup = () => {
            audio.removeEventListener('canplaythrough', onReady);
            audio.removeEventListener('error', onErr);
          };
          const onReady = () => {
            cleanup();
            resolve(audio);
          };
          const onErr = () => {
            cleanup();
            resolve(null);
          };
          audio.addEventListener('canplaythrough', onReady, { once: true });
          audio.addEventListener('error', onErr, { once: true });
          window.setTimeout(() => {
            cleanup();
            resolve(null);
          }, 1200);
        });

        if (loaded) {
          this.activeHtmlAudio = loaded;
          loaded.ontimeupdate = () => {
            if (loaded.duration > 0) {
              this.onTrackProgressCb?.((loaded.currentTime / loaded.duration) * 100, false);
            }
          };
          loaded.onended = () => {
            this.onTrackProgressCb?.(100, false);
            this.onTrackEndCb?.();
          };
          await loaded.play();
          return { usingSynth: false };
        }
      } catch {
        // Si el archivo local no existe aún en public/audio/, pasamos suavemente al sintetizador
      }
    }

    this.playSynthMelody(fallbackMelody, false);
    return { usingSynth: true };
  }

  private playSynthMelody(melodyId: BuiltinMelodyId, loop: boolean) {
    this.ensureContext();
    const melody = MELODIES[melodyId] || MELODIES['noche-de-paz'];
    const beatMs = (60 / melody.bpm) * 1000;
    let index = 0;

    const step = () => {
      if (loop && !this.bgActive) return;
      if (!loop && this.synthTimer === null && index > 0) return;

      const note = melody.notes[index];
      const durMs = note.beats * beatMs;
      const vol = loop ? this.bgGain * 0.45 : this.trackGain * 0.42;

      if (note.freq > 0) {
        this.playBellNote(note.freq, durMs / 1000, vol, note.bassFreq);
      }

      if (!loop) {
        const pct = Math.min(100, Math.round(((index + 1) / melody.notes.length) * 100));
        this.onTrackProgressCb?.(pct, true);
      }

      index++;
      if (index >= melody.notes.length) {
        if (loop) {
          index = 0;
          this.bgSynthTimer = window.setTimeout(step, durMs + 600);
        } else {
          this.synthTimer = window.setTimeout(() => {
            this.synthTimer = null;
            this.onTrackEndCb?.();
          }, durMs);
        }
      } else {
        const timerId = window.setTimeout(step, durMs);
        if (loop) {
          this.bgSynthTimer = timerId;
        } else {
          this.synthTimer = timerId;
        }
      }
    };

    if (!loop) {
      this.synthTimer = window.setTimeout(step, 10);
    } else {
      this.bgSynthTimer = window.setTimeout(step, 10);
    }
  }

  public async toggleBackgroundMusic(enable: boolean, bgUrl?: string): Promise<boolean> {
    this.stopBackgroundMusic();
    if (!enable) {
      this.bgActive = false;
      return false;
    }

    this.bgActive = true;
    if (bgUrl && bgUrl.trim().length > 0) {
      try {
        const loaded = await new Promise<HTMLAudioElement | null>((resolve) => {
          const audio = new Audio(bgUrl);
          audio.loop = true;
          audio.volume = this.bgGain;
          const onReady = () => resolve(audio);
          const onErr = () => resolve(null);
          audio.addEventListener('canplaythrough', onReady, { once: true });
          audio.addEventListener('error', onErr, { once: true });
          window.setTimeout(() => resolve(null), 1000);
        });
        if (loaded && this.bgActive) {
          this.bgHtmlAudio = loaded;
          await loaded.play();
          return true;
        }
      } catch {
        // Fallback al arreglo navideño integrado
      }
    }

    if (this.bgActive) {
      this.playSynthMelody('noche-de-paz', true);
    }
    return true;
  }

  public stopBackgroundMusic() {
    this.bgActive = false;
    if (this.bgHtmlAudio) {
      this.bgHtmlAudio.pause();
      this.bgHtmlAudio.currentTime = 0;
      this.bgHtmlAudio = null;
    }
    if (this.bgSynthTimer !== null) {
      window.clearTimeout(this.bgSynthTimer);
      this.bgSynthTimer = null;
    }
  }

  public playCelebrationChime() {
    try {
      const ctx = this.ensureContext();
      const notes = [N.C5, N.E5, N.G5, N.C5 * 2];
      notes.forEach((freq, idx) => {
        window.setTimeout(() => {
          if (ctx.state === 'running') {
            this.playBellNote(freq, 0.75, 0.25);
          }
        }, idx * 110);
      });
    } catch {
      // Ignorar si el navegador bloquea audio sin gesto previo
    }
  }
}

export const holidayAudio = new HolidayAudioEngine();

/**
 * Lectura guiada en voz alta (Web Speech API) para acompañar oraciones
 * cuando no se ha cargado un archivo MP3 personalizado.
 */
export function speakPrayerText(
  text: string,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const spanishVoice =
    voices.find((v) => v.lang.toLowerCase().startsWith('es-co')) ||
    voices.find((v) => v.lang.toLowerCase().startsWith('es'));

  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }
  utterance.lang = 'es-CO';
  utterance.rate = 0.94;
  utterance.pitch = 1.0;

  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopPrayerSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
