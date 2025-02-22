class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture,type, frame) {
        super(scene, x, y, texture, frame);

        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Default properties for all characters
        this.healthly = 3; 
        this.isEmeny = false; 
        this.isDrop = false; 
        this.type = type; 
        this.ableToDefence = false; 
        this.behavior = '';
        this.subtype = '';
        this.speed = 3;
        this.heigh = 0;
        this.width = 0;
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
            angle: -360, 
            duration: 700, 
            ease: 'Linear',
            repeat: -1, 
            onComplete: () => {
                this.destroy(); // Remove the object after animation
            }
        });
        
    }
    
    
    // ✅ Check if the character should be destroyed when off-screen
    checkDestroy(board) {
        let screenWidth = game.config.width;
        let screenHeight = game.config.height;

        switch (board) {
            case 'top':
                if (this.y < -50) {
                    this.destroy();
                }
                break;
            case 'bottom':
                if (this.y > screenHeight + 50) {
                    this.destroy();
                }
                break;
            case 'left':
                if (this.x < -50) {
                    this.destroy();
                }
                break;
            case 'right':
                if (this.x > screenWidth + 50) {
                    this.destroy();
                }
                break;
        }
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