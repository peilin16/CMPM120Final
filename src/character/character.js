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
        this.subType = '';
        this.step = 0; // Prevents double shooting
        this.heigh = 0;
        this.width = 0;
        this.body.setImmovable(true); // ✅ Prevents movement from collisions
        this.body.setVelocity(0, 0);  // ✅ Ensures Rumia stays in place

        // Adjust hitbox
        this.body.setSize(50, 50);
        this.body.setCollideWorldBounds(true);
    }
    update(){
        
        if(this.healthly <= 0){
            this.dropOff();
        }
        
    }
    // Method to drop when hit
    dropOff() {
        this.isDrop = true;
        this.y +=3
        this.scene.tweens.add({
            targets: this,
            angle: -360, 
            duration: 700, 
            ease: 'Linear',
            repeat: -1, 
            
        });
        this.checkDestroy('bottom');
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
    exitScreen(key, speed = 2) { 
        switch (key) {
            case 'top':
                this.y -= speed; // Move upwards
                break;
            case 'bottom':
                this.y += speed; // Move downwards
                break;
            case 'left':
                this.x -= speed; // Move left
                break;
            case 'right':
                this.x += speed; // Move right
                break;
            case 'autoLR':
                if (this.x < game.config.width / 2) {
                    this.x -= speed; // Move left if closer to left
                } else {
                    this.x += speed; // Move right if closer to right
                }
                break;
            case 'autoTB':
                if (this.y < game.config.height / 2) {
                    this.y -= speed; // Move up if closer to top
                } else {
                    this.y += speed; // Move down if closer to bottom
                }
                break;
        }
    }
    moveTo(Xpos = -1, Ypos = -1, speed = 2) {
        let reachedX = false;
        let reachedY = false;
    
        // ✅ Move on the X-axis if Xpos is specified
        if (Xpos !== -1) {
            let directionX = Math.sign(Xpos - this.x); // ✅ Determine movement direction
            if (Math.abs(this.x - Xpos) > speed) {
                this.x += directionX * speed; // ✅ Move towards the target
            } else {
                this.x = Xpos;
                reachedX = true;
            }
        } else {
            reachedX = true; // ✅ Skip X check if not specified
        }
    
        // ✅ Move on the Y-axis if Ypos is specified
        if (Ypos !== -1) {
            let directionY = Math.sign(Ypos - this.y); // ✅ Determine movement direction
            if (Math.abs(this.y - Ypos) > speed) {
                this.y += directionY * speed; // ✅ Move towards the target
            } else {
                this.y = Ypos;
                reachedY = true;
            }
        } else {
            reachedY = true; // ✅ Skip Y check if not specified
        }
    
        return reachedX && reachedY; // ✅ Return true when both positions are reached
    }
    
    // Collision handling
    collide(obj) {
        
    }
    collideToBullet(bullet){
        if(bullet.isReflected){
            this.healthly -= bullet.atk;
            if(this.healthly <= 0){
                this.dropOff();
            }
        }
    } 
    // Movement logic (to be overridden)
    moving() {
        console.log(`${this.type} moving`);
    }
}