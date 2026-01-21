import { GameScene } from '../models/story-types';

export const STORY_DATA: GameScene[] = [
    {
        id: 'start',
        text: (stats: any) => {
            if (stats.moisture < 50) {
                return 'You wake up under a rotting log. The air is dry and your skin feels tight, dangerously close to cracking.';
            }
            return 'You wake up under a rotting log. The air is cool and damp. You feel strong and slick.';
        },
        cssClass: 'scene-forest-dry',
        choices: [
            {
                text: 'Wait for rain (Risk predators)',
                nextSceneId: 'RANDOM_EVENT',
                effects: { moistureChange: 10, distanceChange: 0 }
            },
            {
                text: 'Scurry toward the creek',
                nextSceneId: 'creek_path', // Diverts to highway now
                effects: { moistureChange: -10, distanceChange: 1 }
            },
            {
                text: 'Dig deeper into the mud',
                nextSceneId: 'mud_burrow',
                effects: { moistureChange: 5, toxicityChange: 2 }
            }
        ]
    },
    {
        id: 'wait_rain',
        text: 'You wait. Clouds gather. A light drizzle begins, soothing your parched skin.',
        choices: [
            {
                text: 'Stay hidden',
                nextSceneId: 'RANDOM_EVENT',
                effects: { moistureChange: 15 }
            },
            {
                text: 'Move now',
                nextSceneId: 'predator_encounter',
                effects: { distanceChange: 1 }
            },
            {
                text: 'Catch bugs',
                nextSceneId: 'bug_feast',
                effects: { toxicityChange: 5 }
            }
        ]
    },
    {
        id: 'mud_burrow',
        text: 'The mud is cool and safe. You recover some moisture, but you make no progress.',
        choices: [
            {
                text: 'Sleep',
                nextSceneId: 'start',
                effects: { moistureChange: 20 }
            },
            {
                text: 'Emerge',
                nextSceneId: 'RANDOM_FOREST',
                effects: { moistureChange: -5 }
            },
            {
                text: 'Eat a worm',
                nextSceneId: 'start',
                effects: { toxicityChange: 5 }
            }
        ]
    },
    {
        id: 'creek_path',
        text: 'You move quickly over dry needles. The sound of water is close, but a massive gray scar cuts through the forest.',
        choices: [
            {
                text: 'Approach the gray scar',
                nextSceneId: 'highway_edge',
                effects: { moistureChange: -5, distanceChange: 1 }
            },
            {
                text: 'Move carefully',
                nextSceneId: 'predator_encounter',
                effects: { moistureChange: -10, distanceChange: 1 }
            },
            {
                text: 'Hide under a leaf',
                nextSceneId: 'RANDOM_FOREST',
                effects: { moistureChange: -5 }
            }
        ]
    },

    // --- HIGHWAY SEQUENCE ---
    {
        id: 'highway_edge',
        text: 'It is Highway 101. Monsters of metal and light roar past, shaking the ground. The creek is on the other side.',
        choices: [
            {
                text: 'Wait for a gap',
                nextSceneId: 'highway_crossing_1',
                effects: { moistureChange: -10 }
            },
            {
                text: 'Look for a tunnel',
                nextSceneId: 'sewer_entrance',
                effects: { distanceChange: 1, moistureChange: -5 }
            },
            {
                text: 'Turn back',
                nextSceneId: 'start',
                effects: { distanceChange: -1 }
            }
        ]
    },
    {
        id: 'highway_crossing_1',
        text: 'You scurry onto the asphalt. It is hot and rough. A shadow looms above you!',
        choices: [
            {
                text: 'Freeze!',
                nextSceneId: 'highway_median',
                effects: { moistureChange: -5, distanceChange: 1 }
            },
            {
                text: 'Run faster!',
                nextSceneId: 'game_over_run_over', // Risk death
                effects: { distanceChange: 1 }
            },
            {
                text: 'Dodge!',
                nextSceneId: 'highway_median',
                effects: { moistureChange: -10, toxicityChange: -2, distanceChange: 1 }
            }
        ]
    },
    {
        id: 'highway_median',
        text: 'You reach the median strip. Dry grass and garbage. One more lane to go.',
        choices: [
            {
                text: 'Go now!',
                nextSceneId: 'highway_success', // New transition
                effects: { distanceChange: 2, moistureChange: -5 }
            },
            {
                text: 'Wait for night',
                nextSceneId: 'highway_success', // Safe but dries you out
                effects: { moistureChange: -20, distanceChange: 2 }
            },
            {
                text: 'Eat a dead fly',
                nextSceneId: 'highway_median',
                effects: { toxicityChange: 5 }
            }
        ]
    },
    {
        id: 'highway_success',
        text: 'You dodge the final wheel and tumble down the embankment into the cool mud. The roar of the road fades behind you.',
        choices: [
            {
                text: 'Crawl to water',
                nextSceneId: 'creek_arrival',
                effects: { moistureChange: 10 }
            }
        ]
    },
    {
        id: 'sewer_entrance',
        text: 'You find a culvert. It smells of rot and chemicals, but it goes under the road.',
        choices: [
            {
                text: 'Enter the darkness',
                nextSceneId: 'sewer_tunnel',
                effects: { moistureChange: 5 } // Damp inside
            },
            {
                text: 'Search for cleaner path',
                nextSceneId: 'highway_edge',
                effects: { moistureChange: -5 }
            },
            {
                text: 'Rest at entrance',
                nextSceneId: 'start',
                effects: { moistureChange: 10 }
            }
        ]
    },
    {
        id: 'sewer_tunnel',
        text: 'Slime coats the walls. The water here burns your skin slightly.',
        choices: [
            {
                text: 'Keep moving',
                nextSceneId: 'creek_arrival',
                effects: { distanceChange: 3, toxicityChange: 10 } // Toxic but fast
            },
            {
                text: 'Swim in the muck',
                nextSceneId: 'creek_arrival',
                effects: { distanceChange: 3, toxicityChange: 20 }
            },
            {
                text: 'Climb the walls',
                nextSceneId: 'creek_arrival',
                effects: { distanceChange: 3, moistureChange: -5 }
            }
        ]
    },
    {
        id: 'game_over_run_over',
        text: 'CRUNCH. The tire of a Subaru Outback ends your journey.',
        choices: [
            {
                text: 'Restart',
                nextSceneId: 'start',
                effects: { moistureChange: 100, distanceChange: -100, toxicityChange: 50 }
            }
        ]
    },

    // --- EXISTING SCENES ---
    {
        id: 'predator_encounter',
        text: 'A Garter Snake lunges from the brush! It bars your way, tongue tasting the air.',
        tags: ['EVENT'],
        choices: [
            {
                text: 'Flee!',
                nextSceneId: 'start',
                effects: { moistureChange: -10 }
            },
            {
                text: 'Play dead',
                nextSceneId: 'game_over_eaten',
                effects: { moistureChange: -5 } // Risky
            },
            {
                text: 'Flash Orange Belly',
                nextSceneId: 'predator_scared',
                effects: { toxicityChange: -5 },
                requiredCondition: (gameState: { toxicity: number }) => gameState.toxicity > 20
            }
        ]
    },
    {
        id: 'predator_scared',
        text: 'You arch your back, revealing the bright orange warning colors on your belly. The snake recoils.',
        choices: [
            {
                text: 'Escape',
                nextSceneId: 'creek_arrival',
                effects: { distanceChange: 2 }
            },
            {
                text: 'Taunt it (Gain Confidence)',
                nextSceneId: 'creek_arrival',
                effects: { toxicityChange: 5, distanceChange: 1 }
            },
            {
                text: 'Hide',
                nextSceneId: 'start',
                effects: { moistureChange: -5 }
            }
        ]
    },
    {
        id: 'creek_arrival',
        text: 'You reach the creek! The water is cool and abundant.',
        choices: [
            {
                text: 'Swim',
                nextSceneId: 'RANDOM_RIVER',
                effects: { moistureChange: 50, distanceChange: 5 }
            },
            {
                text: 'Rest on the bank',
                nextSceneId: 'start',
                effects: { moistureChange: 30 }
            },
            {
                text: 'Hunt water bugs',
                nextSceneId: 'bug_feast',
                effects: { toxicityChange: 10 }
            }
        ]
    },
    {
        id: 'bug_feast',
        text: 'You find a swarm of yummy insects. Crunch crunch.',
        tags: ['EVENT'],
        choices: [
            {
                text: 'Eat more',
                nextSceneId: 'start',
                effects: { toxicityChange: 20 }
            },
            {
                text: 'Save for later',
                nextSceneId: 'start',
                effects: { toxicityChange: 10 }
            },
            {
                text: 'Return to journey',
                nextSceneId: 'RANDOM_FOREST',
                effects: { distanceChange: 1 }
            }
        ]
    },

    // --- RIVER RANDOM POOL ---
    {
        id: 'river_rapids',
        text: 'The current sweeps you up! You tumble through whitewater, bashing against rocks.',
        tags: ['RIVER'],
        choices: [
            {
                text: 'Ride the current',
                nextSceneId: 'rapids_survived', // New transition
                effects: { distanceChange: 10, moistureChange: 10 }
            },
            {
                text: 'Fight for shore',
                nextSceneId: 'start',
                effects: { moistureChange: -10, distanceChange: 2 }
            },
            {
                text: 'Grab a submerged branch',
                nextSceneId: 'start',
                effects: { distanceChange: 5 }
            }
        ]
    },
    {
        id: 'rapids_survived',
        text: 'The river churns you over and over until you are unceremoniously dumped onto a sandy bank, dizzy but alive.',
        choices: [
            {
                text: 'Check surroundings',
                nextSceneId: 'creek_arrival',
                effects: { distanceChange: 1 }
            }
        ]
    },
    {
        id: 'river_trout',
        text: 'A shadow passes over you. A Rainbow Trout, huge and ancient, patrols the depth.',
        tags: ['RIVER'],
        choices: [
            {
                text: 'Stay perfectly still',
                nextSceneId: 'creek_arrival',
                effects: { moistureChange: 5 }
            },
            {
                text: 'Release toxins',
                nextSceneId: 'trout_repelled', // New transition
                effects: { toxicityChange: -10 }
            },
            {
                text: 'Swim away fast',
                nextSceneId: 'game_over_eaten',
                effects: { distanceChange: 1 }
            }
        ]
    },
    {
        id: 'trout_repelled',
        text: 'The great fish looms close, but tastes the bitterness in the water. It shakes its head in disgust and swims away.',
        choices: [
            {
                text: 'Exhale',
                nextSceneId: 'creek_arrival',
                effects: { moistureChange: 5 }
            }
        ]
    },
    {
        id: 'river_eddy',
        text: 'You find a calm pool behind a large boulder. Debris and bugs float here.',
        tags: ['RIVER'],
        choices: [
            {
                text: 'Rest',
                nextSceneId: 'creek_arrival',
                effects: { moistureChange: 30 }
            },
            {
                text: 'Feast on larvae',
                nextSceneId: 'creek_arrival',
                effects: { toxicityChange: 15, moistureChange: 10 }
            },
            {
                text: 'Leave',
                nextSceneId: 'creek_arrival',
                effects: { distanceChange: 2 }
            }
        ]
    },

    // RANDOM SCENES POOL
    {
        id: 'forest_rain',
        text: 'A sudden downpour! The forest floor floods with life.',
        tags: ['FOREST', 'EVENT'],
        choices: [
            {
                text: 'Soak it up',
                nextSceneId: 'start',
                effects: { moistureChange: 40 }
            },
            {
                text: 'Travel fast while wet',
                nextSceneId: 'creek_path',
                effects: { distanceChange: 3, moistureChange: 10 }
            },
            {
                text: 'Wash off toxins',
                nextSceneId: 'start',
                effects: { toxicityChange: -10, moistureChange: 20 }
            }
        ]
    },
    {
        id: 'lost_hiker',
        text: 'A giant boot crashes down inches from your nose. A human towers above, pointing at you. "Whoa, check this out!"',
        tags: ['FOREST', 'EVENT'],
        choices: [
            {
                text: 'Freeze and look poisonous',
                nextSceneId: 'hiker_interaction', // New hub for outcomes
                effects: { toxicityChange: 2 }
            },
            {
                text: 'Run for cover',
                nextSceneId: 'RANDOM_FOREST',
                effects: { moistureChange: -10, distanceChange: 1 }
            },
            {
                text: 'Hiss softly',
                nextSceneId: 'hiker_dog', // Risk dog attack
                effects: { toxicityChange: 5 }
            }
        ]
    },
    {
        id: 'hiker_interaction',
        text: 'The human squats down. "Cool colors," they mutter. They reach out a hand explicitly covered in salty sweat and bug spray.',
        choices: [
            {
                text: 'Let them pick you up',
                nextSceneId: 'game_over_oils', // Death by chemicals
                effects: { moistureChange: -10 }
            },
            {
                text: 'Flash Orange Belly',
                nextSceneId: 'hiker_leaves', // They respect the warning
                effects: { toxicityChange: -2 }
            },
            {
                text: 'Scuttle under a fern',
                nextSceneId: 'hiker_feed', // Maybe they toss food before leaving
                effects: { distanceChange: 0 }
            }
        ]
    },
    {
        id: 'hiker_dog',
        text: 'A wet nose shoves into your face. A dog! It drools, oblivious to your lethal defense.',
        choices: [
            {
                text: 'Flash Belly',
                nextSceneId: 'game_over_dog_mutual', // Dog eats you, dog dies.
                effects: { toxicityChange: -50 }
            },
            {
                text: 'Play dead',
                nextSceneId: 'game_over_dog_mutual', // Dog eats you anyway
                effects: { moistureChange: -5 }
            },
            {
                text: 'Release musk',
                nextSceneId: 'hiker_leaves', // Dog sneezes and leaves
                effects: { toxicityChange: -10 }
            }
        ]
    },
    {
        id: 'hiker_feed',
        text: 'The human laughs. "Little guy is hungry." They toss a juicy earthworm near your nose before walking away.',
        choices: [
            {
                text: 'Feast',
                nextSceneId: 'start',
                effects: { toxicityChange: 20, moistureChange: 5 }
            },
            {
                text: 'Ignore it',
                nextSceneId: 'start',
                effects: { distanceChange: 0 }
            }
        ]
    },
    {
        id: 'hiker_leaves',
        text: 'The giant backs off. "Better leave it alone, Buddy," they say to the dog. Heavy footsteps fade away.',
        choices: [
            {
                text: 'Recover',
                nextSceneId: 'start',
                effects: { moistureChange: 5 }
            }
        ]
    },
    {
        id: 'game_over_oils',
        text: 'The human skin is burning hot and salty. Strange oils seep into your porous skin. Your nerves fire uncontrollably. The giant drops you.',
        choices: [
            {
                text: 'Twitch and fade',
                nextSceneId: 'start', // Restart
                effects: { moistureChange: 100 }
            }
        ]
    },
    {
        id: 'game_over_dog_mutual',
        text: 'GULP. Darkness. You are in the belly of the beast. But your tetrodotoxin is potent. The dog will not survive this meal either.',
        choices: [
            {
                text: 'Mutual Destruction',
                nextSceneId: 'start', // Restart
                effects: { moistureChange: 100, toxicityChange: 50 }
            }
        ]
    },
    {
        id: 'game_over_dried',
        text: 'Your skin stiffens. The world fades. You have desiccated.',
        cssClass: 'scene-forest-dry',
        choices: [
            {
                text: 'Restart',
                nextSceneId: 'start',
                effects: { moistureChange: 100, distanceChange: -100 }
            },
            {
                text: 'Give up',
                nextSceneId: 'start', // Loop back anyway
                effects: { moistureChange: 100 }
            },
            {
                text: 'Dream of rain',
                nextSceneId: 'start',
                effects: { moistureChange: 100 }
            }
        ]
    },
    {
        id: 'game_over_eaten',
        text: 'The snake strikes. Darkness follows. You have become sustenance.',
        choices: [
            {
                text: 'Restart',
                nextSceneId: 'start',
                effects: { moistureChange: 100, toxicityChange: 50, distanceChange: -100 }
            },
            {
                text: 'Try again',
                nextSceneId: 'start',
                effects: { moistureChange: 100 }
            },
            {
                text: 'Accept fate',
                nextSceneId: 'start',
                effects: { moistureChange: 100 }
            }
        ]
    }
];
