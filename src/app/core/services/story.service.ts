import { Injectable } from '@angular/core';
import { GameScene } from '../models/story-types';
import { STORY_DATA } from '../data/story-data';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private scenes = new Map<string, GameScene>();

  constructor() {
    this.initializeScenes();
  }

  private initializeScenes() {
    STORY_DATA.forEach(scene => {
      this.scenes.set(scene.id, scene);
    });
  }

  getScene(id: string): GameScene | undefined {
    if (id.startsWith('RANDOM_')) {
      return this.getRandomScene(id.replace('RANDOM_', ''));
    }
    return this.scenes.get(id);
  }

  private getRandomScene(tag: string): GameScene | undefined {
    const candidates = STORY_DATA.filter(scene => scene.tags?.includes(tag));
    if (candidates.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
  }
}
