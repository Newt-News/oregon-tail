import { Injectable, computed, signal } from '@angular/core';

export interface GameStats {
  moisture: number;
  toxicity: number;
  distance: number;
}

export interface StatEffects {
  moistureChange?: number;
  toxicityChange?: number;
  distanceChange?: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  // Signals
  readonly moisture = signal<number>(100);
  readonly toxicity = signal<number>(50);
  readonly distance = signal<number>(0);
  readonly currentSceneId = signal<string>('start');

  // Computed
  readonly isAlive = computed(() => this.moisture() > 0);

  constructor() { }

  updateStats(effects: StatEffects): void {
    if (effects.moistureChange) {
      this.moisture.update((val) => Math.min(100, Math.max(0, val + effects.moistureChange!)));
    }
    if (effects.toxicityChange) {
      this.toxicity.update((val) => Math.min(100, Math.max(0, val + effects.toxicityChange!)));
    }
    if (effects.distanceChange) {
      this.distance.update((val) => val + effects.distanceChange!);
    }
  }

  loadScene(sceneId: string): void {
    this.currentSceneId.set(sceneId);
  }

  resetGame(): void {
    this.moisture.set(100);
    this.toxicity.set(50);
    this.distance.set(0);
    this.currentSceneId.set('start');
  }
}
