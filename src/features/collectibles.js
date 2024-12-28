Sure, here's a production-ready code for the "Collectibles" feature in a Phaser.js game, following the provided requirements and best practices:

```javascript
/**
 * @module Collectibles
 * @description Handles the collectible items in the game.
 */

import Phaser from 'phaser';

/**
 * @class Collectible
 * @extends Phaser.GameObjects.Sprite
 * @constructor
 * @param {Phaser.Scene} scene - The scene in which the collectible will be added.
 * @param {number} x - The x-coordinate of the collectible.
 * @param {number} y - The y-coordinate of the collectible.
 * @param {string} texture - The key of the texture to be used for the collectible sprite.
 * @param {string} frame - The frame of the texture to be used for the collectible sprite.
 * @param {function} onCollect - The callback function to be executed when the collectible is collected.
 */
class Collectible extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, onCollect) {
    super(scene, x, y, texture, frame);

    // Add the collectible to the scene
    scene.add.existing(this);

    // Enable physics for the collectible
    scene.physics.add.existing(this);

    // Set the collectible to be immovable
    this.body.immovable = true;

    // Set the callback function to be executed when the collectible is collected
    this.onCollect = onCollect;
  }

  /**
   * @method collect
   * @description Handles the collection of the collectible.
   * @param {Phaser.GameObjects.Sprite} player - The player sprite that collected the collectible.
   */
  collect(player) {
    try {
      // Execute the callback function
      this.onCollect(player);

      // Remove the collectible from the scene
      this.destroy();
    } catch (error) {
      console.error('Error collecting collectible:', error);
    }
  }
}

/**
 * @class CollectiblesManager
 * @description Manages the collectibles in the game.
 */
class CollectiblesManager {
  /**
   * @constructor
   * @param {Phaser.Scene} scene - The scene in which the collectibles will be managed.
   */
  constructor(scene) {
    this.scene = scene;
    this.collectibles = [];
  }

  /**
   * @method createCollectible
   * @description Creates a new collectible and adds it to the scene.
   * @param {number} x - The x-coordinate of the collectible.
   * @param {number} y - The y-coordinate of the collectible.
   * @param {string} texture - The key of the texture to be used for the collectible sprite.
   * @param {string} frame - The frame of the texture to be used for the collectible sprite.
   * @param {function} onCollect - The callback function to be executed when the collectible is collected.
   * @returns {Collectible} The created collectible object.
   */
  createCollectible(x, y, texture, frame, onCollect) {
    const collectible = new Collectible(this.scene, x, y, texture, frame, onCollect);
    this.collectibles.push(collectible);
    return collectible;
  }

  /**
   * @method collectOverlap
   * @description Checks for overlap between the player and the collectibles.
   * @param {Phaser.GameObjects.Sprite} player - The player sprite.
   */
  collectOverlap(player) {
    this.collectibles.forEach((collectible) => {
      if (player.body.hitTest(collectible.body)) {
        collectible.collect(player);
      }
    });
  }
}

export default CollectiblesManager;
```

This code defines two classes: `Collectible` and `CollectiblesManager`.

The `Collectible` class extends the `Phaser.GameObjects.Sprite` class and represents a single collectible item in the game. It has a constructor that takes in the scene, position, texture, frame, and a callback function to be executed when the collectible is collected. The `collect` method handles the collection of the collectible by executing the callback function and removing the collectible from the scene.

The `CollectiblesManager` class manages the collectibles in the game. It has a `createCollectible` method that creates a new `Collectible` object and adds it to the scene. The `collectOverlap` method checks for overlap between the player and the collectibles, and if an overlap is detected, it calls the `collect` method of the corresponding collectible.

Here's an example of how you can use these classes in your Phaser.js game:

```javascript
import CollectiblesManager from './collectibles';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
  }

  preload() {
    // Load game assets
    this.load.image('collectible', 'assets/collectible.png');
  }

  create() {
    // Create the player sprite
    this.player = this.physics.add.sprite(100, 100, 'player');

    // Create the collectibles manager
    this.collectiblesManager = new CollectiblesManager(this);

    // Create some collectibles
    this.collectiblesManager.createCollectible(200, 200, 'collectible', null, this.handleCollect.bind(this));
    this.collectiblesManager.createCollectible(400, 400, 'collectible', null, this.handleCollect.bind(this));
  }

  update() {
    // Check for overlap between the player and the collectibles
    this.collectiblesManager.collectOverlap(this.player);
  }

  handleCollect(player) {
    // Handle the collection of a collectible
    console.log('Collectible collected!');
    // Perform additional actions, such as unlocking abilities or customizations
  }
}
```

In this example, we create a `GameScene` that preloads the necessary assets, creates the player sprite and the `CollectiblesManager` instance, and adds some collectibles to the scene. In the `update` method, we call the `collectOverlap` method of the `CollectiblesManager` to check for overlap between the player and the collectibles. When a collectible is collected, the `handleCollect` method is called, where you can perform additional actions, such as unlocking abilities or customizations.

Note that this code includes JSDoc comments for documentation and follows best practices for error handling, modularity, and reusability. Additionally, you can write unit tests for the `Collectible` and `CollectiblesManager` classes using a testing framework like Jest or Mocha.