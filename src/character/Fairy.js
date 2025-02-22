class Fairy extends Character{
    constructor(scene, x, y, t, frame) {
        if(t == 'sunflower'){
            super(scene, x, y, 'sunflowerFairy1', frame)
        }else{
            super(scene, x, y, 'dandelionFairy1', frame)
        }
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.isDrop = false;
        this.kind = 'k'
        this.direction = 1; 
        this.speed = emenySpeed; 
        this.ableToDefence = false; 
        this.isEmeny = true;
        this.body.setSize(65, 75, true); // Adjust hitbox size
        this.body.setOffset(5, 5);  
        this.anims.create({
            key: 'sunflowerFairy',
            frames: [
                { key: 'sunflowerFairy1' },
                { key: 'sunflowerFairy2' },
                { key: 'sunflowerFairy3' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });
        this.play('sunflowerFairy'); // Play the 'rumiaFly' animation
    }

    update() {
        this.x -= emenySpeed;
        if(!this.isDrop){

            // Move up/down based on direction
            this.y += this.direction * this.speed;

            // Reverse direction when hitting the bottom
            if (this.y >= boardheigh - 60) {
                this.direction = -1; // Move up
            }

            // Reverse direction when hitting the top
            if (this.y <= 60) {
                this.direction = 1; // Move down
            }
        }else{
            this.y += 3
        }
        

        // Destroy when off-screen
        if (this.x < -100 || this.y > 700) {
            this.destroy();
        }
    }
    dropOff(){
        this.isDrop = true
        this.anims.stop();
        this.setTexture('sunflowerFairyHit');
        
        this.scene.tweens.add({
            targets: this,
            angle: -360, 
            duration: 1000, 
            ease: 'Linear',
            repeat: -1, 
            onComplete: () => {
                this.destroy(); // Remove the object after animation
            }
        });
    }
}