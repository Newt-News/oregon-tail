import { Component, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common'; // Build failure if not imported? Standalone defaults? Usually need CommonModule for NgClass/NgIf or just imports section.
import { GameStateService } from './core/services/game-state.service';
import { StoryService } from './core/services/story.service';
import { Choice } from './core/models/story-types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private gameState = inject(GameStateService);
  private storyService = inject(StoryService);

  // Expose signals for template
  moisture = this.gameState.moisture;
  toxicity = this.gameState.toxicity;
  distance = this.gameState.distance;
  isAlive = this.gameState.isAlive;

  // Current Scene Logic
  currentScene = computed(() => {
    return this.storyService.getScene(this.gameState.currentSceneId());
  });

  // Resolve text if it's dynamic
  currentSceneText = computed(() => {
    const scene = this.currentScene();
    if (!scene) return '';

    const textOrFn = scene.text;
    if (typeof textOrFn === 'function') {
      return textOrFn({
        moisture: this.moisture(),
        toxicity: this.toxicity(),
        distance: this.distance()
      });
    }
    return textOrFn;
  });

  // Filter choices based on conditions
  currentChoices = computed(() => {
    const scene = this.currentScene();
    if (!scene) return [];

    const statsSnapshot = {
      moisture: this.moisture(),
      toxicity: this.toxicity(),
      distance: this.distance()
    };

    return scene.choices.filter(choice => {
      if (!choice.requiredCondition) return true;
      return choice.requiredCondition(statsSnapshot);
    });
  });

  constructor() {
    effect(() => {
      const isAlive = this.gameState.isAlive();
      const currentId = this.gameState.currentSceneId();

      // If dead from lack of moisture and not already in a game over state
      if (!isAlive && currentId !== 'game_over_dried' && currentId !== 'game_over_eaten') {
        this.gameState.loadScene('game_over_dried');
      }
    });
  }

  makeChoice(choice: Choice): void {
    if (choice.nextSceneId === 'start') {
      this.gameState.resetGame();
      return;
    }

    if (choice.effects) {
      this.gameState.updateStats(choice.effects);
    }

    this.gameState.loadScene(choice.nextSceneId);
  }

  // Helper for scene image placeholder (future use)
  getSceneImageClass(): string {
    const scene = this.currentScene();
    return scene?.imageAsset ? `has-image` : 'no-image';
  }
}
