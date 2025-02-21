class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Default properties for all characters
        this.healthly = 3; 
        this.isEmeny = false; 
        this.isDrop = false; 
        this.type = 'neutral'; 
        this.ableToDefence = false; 
        this.isTouch = false; 
        this.speed = 3;

        this.body.setImmovable(true); // ✅ Prevents movement from collisions
        this.body.setVelocity(0, 0);  // ✅ Ensures Rumia stays in place

        // Adjust hitbox
        this.body.setSize(50, 50);
        this.body.setCollideWorldBounds(true);
    }
    update(){

    }
    // Method to drop when hit
    dropOff() {
        this.isDrop = true;
        this.scene.tweens.add({
            targets: this,
            angle: 360, 
            duration: 1000, 
            ease: 'Linear',
            onComplete: () => this.destroy() // Remove after animation
        });
    }
    
    

    // Method for generic behavior (to be overridden in subclasses)
    behavior() {
        console.log(`${this.type} character behavior`);
    }

    // Collision handling
    collide(obj) {
        if (!this.isDrop && obj.isEmeny !== this.isEmeny) {
            this.dropOff();
        }
    }
    collideToBullet(bullet){
        
    } 
    // Movement logic (to be overridden)
    moving() {
        console.log(`${this.type} moving`);
    }
}