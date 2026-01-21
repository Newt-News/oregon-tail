export interface Choice {
    text: string;
    nextSceneId: string;
    effects?: {
        moistureChange?: number;
        toxicityChange?: number;
        distanceChange?: number;
    };
    requiredCondition?: (gameState: any) => boolean; // Using any for loose coupling, or type it properly
}

export interface GameScene {
    id: string;
    text: string | ((stats: any) => string); // Typed as any to avoid circular dep with GameStateService, or just generic object
    choices: Choice[];
    cssClass?: string;
    imageAsset?: string;
    tags?: string[]; // For random selection
}
