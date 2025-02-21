class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, target) {
        super(scene, x, y, texture, target);

        
        // Bullet properties
        this.speed = 5; // Default speed
        this.isReflected = false; // If the bullet has been deflected
        this.target = target; // Target for homing bullets
        this.ableToReflect = true;
        this.shooter = null; // Who shoot this bullet
        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //this.body.setSize(10, 10);
    }
    moving() {
       
    }
        // Bullet movement logic
    // Behavior when bullet interacts with an object
    behavior(obj) {
        if (obj.isdefence) {
            this.isAfterDefence = true;
            this.body.setVelocityY(-this.speed * 0.8);
            this.setTint(0x00ff00); // Change color to indicate deflection
        }
    }
    // ✅ Reflect the bullet when hitting Rumia in defense mode
    reflect(normalX = 0, normalY = -1) {
        
    }

    dropOff() {
        // Create explosion effect at the bullet's position
        let explosionEmitter = this.scene.add.particles('explosionTexture').createEmitter({
            x: this.x,
            y: this.y,
            speed: { min: -100, max: 100 },
            lifespan: 500, // How long the particles last
            scale: { start: 0.5, end: 0 }, // Particles shrink over time
            quantity: 10, // Number of particles
            blendMode: 'ADD' // Bright effect
        });
    
        // Stop and remove the explosion effect after 0.7 seconds
        this.scene.time.delayedCall(600, () => {
            explosionEmitter.stop();  
            explosionEmitter.manager.emitters.remove(explosionEmitter);  
        });
        this.destroy();
        
    }

    // Update function to remove bullets when they go off-screen
    update() {
        if (this.y < -20 || this.y > this.scene.game.config.height + 20) {
            this.destroy();
        }
    }
}