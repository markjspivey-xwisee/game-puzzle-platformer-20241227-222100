```javascript
/**
 * @file power-ups.js
 * @author [Your Name]
 * @description Handles the power-up functionality for the game.
 */

/**
 * @class PowerUp
 * @extends Phaser.GameObjects.Sprite
 * @description Base class for power-ups.
 */
class PowerUp extends Phaser.GameObjects.Sprite {
  /**
   * @constructor
   * @param {Phaser.Scene} scene - The scene in which the power-up will be added.
   * @param {number} x - The x-coordinate of the power-up.
   * @param {number} y - The y-coordinate of the power-up.
   * @param {string} texture - The key of the texture for the power-up.
   * @param {string} type - The type of the power-up.
   * @param {number} duration - The duration of the power-up in milliseconds.
   */
  constructor(scene, x, y, texture, type, duration) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.type = type;
    this.duration = duration;
    this.scene.add.existing(this);
  }

  /**
   * @method activate
   * @description Activates the power-up and applies its effect.
   * @param {Phaser.GameObjects.Sprite} player - The player sprite to apply the power-up effect to.
   */
  activate(player) {
    try {
      switch (this.type) {
        case 'speed':
          player.setVelocity(player.body.velocity.x * 2, player.body.velocity.y * 2);
          break;
        case 'invincibility':
          player.setTint(0x00ff00);
          break;
        // Add more power-up types here
        default:
          console.warn(`Unknown power-up type: ${this.type}`);
      }

      this.scene.time.delayedCall(this.duration, this.deactivate, [player], this);
    } catch (error) {
      console.error(`Error activating power-up: ${error.message}`);
    }
  }

  /**
   * @method deactivate
   * @description Deactivates the power-up and removes its effect.
   * @param {Phaser.GameObjects.Sprite} player - The player sprite to remove the power-up effect from.
   */
  deactivate(player) {
    try {
      switch (this.type) {
        case 'speed':
          player.setVelocity(player.body.velocity.x / 2, player.body.velocity.y / 2);
          break;
        case 'invincibility':
          player.clearTint();
          break;
        // Add more power-up types here
        default:
          console.warn(`Unknown power-up type: ${this.type}`);
      }

      this.destroy();
    } catch (error) {
      console.error(`Error deactivating power-up: ${error.message}`);
    }
  }
}

/**
 * @class PowerUpManager
 * @description Manages the creation and handling of power-ups in the game.
 */
class PowerUpManager {
  /**
   * @constructor
   * @param {Phaser.Scene} scene - The scene in which the power-ups will be created.
   * @param {Phaser.GameObjects.Sprite} player - The player sprite to apply power-up effects to.
   */
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.powerUps = [];
  }

  /**
   * @method createPowerUp
   * @description Creates a new power-up at a random position on the screen.
   * @param {string} type - The type of the power-up to create.
   * @param {number} duration - The duration of the power-up in milliseconds.
   */
  createPowerUp(type, duration) {
    try {
      const x = Phaser.Math.Between(50, this.scene.game.config.width - 50);
      const y = Phaser.Math.Between(50, this.scene.game.config.height - 50);
      const texture = `power-up-${type}`;
      const powerUp = new PowerUp(this.scene, x, y, texture, type, duration);
      this.powerUps.push(powerUp);
      this.scene.physics.add.overlap(this.player, powerUp, this.collectPowerUp, null, this);
    } catch (error) {
      console.error(`Error creating power-up: ${error.message}`);
    }
  }

  /**
   * @method collectPowerUp
   * @description Handles the collection of a power-up by the player.
   * @param {Phaser.GameObjects.Sprite} player - The player sprite that collected the power-up.
   * @param {PowerUp} powerUp - The power-up that was collected.
   */
  collectPowerUp(player, powerUp) {
    try {
      powerUp.activate(player);
      this.powerUps = this.powerUps.filter((p) => p !== powerUp);
    } catch (error) {
      console.error(`Error collecting power-up: ${error.message}`);
    }
  }
}

// Example usage
// In your game scene, create an instance of PowerUpManager
const powerUpManager = new PowerUpManager(this, player);

// Create a new power-up every 10 seconds
this.time.addEvent({
  delay: 10000,
  loop: true,
  callback: () => {
    const type = Phaser.Math.RND.pick(['speed', 'invincibility']);
    const duration = Phaser.Math.Between(5000, 10000);
    powerUpManager.createPowerUp(type, duration);
  },
});
```

This code provides a base implementation for power-ups in a Phaser.js game. It includes two main classes:

1. `PowerUp`: This class represents a single power-up and handles its activation and deactivation. It extends the `Phaser.GameObjects.Sprite` class and can be added to the game scene like any other sprite. The `activate` method applies the power-up effect to the player sprite, and the `deactivate` method removes the effect after the specified duration.

2. `PowerUpManager`: This class manages the creation and handling of power-ups in the game. It creates new power-ups at random positions on the screen and handles the collection of power-ups by the player. It also includes an example usage that creates a new power-up every 10 seconds with a random type and duration.

The code follows Phaser.js best practices and conventions, includes JSDoc comments for documentation, and includes error handling and logging. It is modular and reusable, and can be easily extended to add more power-up types or additional functionality.

Note that this is a basic implementation, and you may need to adapt it to fit your specific game requirements. Additionally, you should write tests to ensure the functionality of the power-up system and update the documentation accordingly.