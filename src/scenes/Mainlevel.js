class Mainlevel extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    create() {
        this.isSprawn = false;
        //level = 0;
        // define keys    
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        
        let shootingLogic = new stgShootingLogic();

        this.EmenyGroup = this.physics.add.group(); // Create a Emeny group
        this.bulletGroup = this.physics.add.group(); // Create a bullet group
        this.helperGroup = this.physics.add.group();

        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            //backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.RumiahealthText = this.add.text(50, 20, '[H]:'+rumia.healthly, this.scoreConfig).setOrigin(0.5)
        this.CurrentScoreText = this.add.text(50, 40, '[P]:'+ score, this.scoreConfig).setOrigin(0.5);

        this.anims.create({
            key: 'explodeAnim',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5 }), // Adjust frames if needed
            frameRate: 10,
            hideOnComplete: true
        });
    }

    // create new barriers and add them to existing barrier group
    

    update() {
        
        rumia.update();

        /*
        this.kedamaGroup.children.iterate(kedama => {
            if (kedama && typeof kedama.update === 'function') {
                kedama.update(); // Safely update each tree
            }
        });
        */
        
    }
    //game over
    gameOver(){
        this.scene.start('titleScene');
    }
    
    getAudio(require) {
        if (!this.sound) return null; // Safety check
    
        if (require === 'p') {
            return this.sound.add('pickUp1'); // ✅ Correctly add sound
        } 
        else if (require === 'h') {
            let hitSounds = ['hitHurt1', 'hitHurt2', 'hitHurt3'];
            let randomSoundKey = Phaser.Math.RND.pick(hitSounds); // ✅ Pick a random sound
            return this.sound.add(randomSoundKey); // ✅ Return a Phaser sound object
        } 
        return null; // Invalid input
    }
    getBGM(require){

    }

    
    isPositionValid(newY, positionList) {
        for (let y of positionList) {
            if (Math.abs(y - newY) < 50) {
                return false; // Too close to an existing enemy
            }
        }
        return true; // Valid position
    }

    //bullet collision
    bulletCollision(obj, bullet){
        if(!obj.isDrop){
           
            if(obj.type == 'player'){
                if(!obj.isHit){
                    if (obj.isdefence) { // ✅ Reflect the bullet when defending

                        /*this.scene.tweens.add({
                            targets: this,
                            alpha: 0.2, // Reduce opacity
                            duration: 100, // Flash duration (0.1s)
                            yoyo: true, // Return to normal opacity
                            repeat: 2 // Flash twice
                        });*/
                        let normalX = rumia.x - bullet.x; 
                        let normalY = rumia.y - bullet.y; 
                
                        let normalVector = new Phaser.Math.Vector2(normalX, normalY).normalize();
                
                        bullet.reflect(normalVector.x, normalVector.y);
                        return
                    } 
                    obj.collideToBullet(bullet);
                    bullet.dropOff();
                    //this.colliderObject.destroy();
                }else{
                   // bullet.destroy();
                }
            }else{
                obj.collideToBullet(bullet);
                bullet.dropOff();
            }
        }
    }
    //collision with character
    handleCollision(rumia, obj) {
        //tree.destroy(); // Remove tree
        //alert('aaa')
        // Flash effect
        rumia.collide(obj);
        obj.collide(rumia); //  Call obj’s collide behavior
        obj.dropOff()
        if(rumia.healthly < 0){
            rumia.dropOff();
            rumia.time.delayedCall(3000, () => {
                this.bgMusic.stop(); // Stop background music
                this.gameOver();
            }, [], this);            
            //this.gameOver();
        }
        this.RumiahealthText.setText('[H]:'+rumia.healthly);
        this.CurrentScoreText.setText('[P]:'+rumia.score);
        //rumia.isHit = true;
    }

    spawnEmeny(num, type, Emeny) {
        //let count = num//Phaser.Math.Between(1, num); // Random number of enemies
        let positionList = [];
        let emeny;
        let spacing = 50; // Distance between enemies
        let startX = game.config.width + 50; // ✅ Always spawn enemies from the right side
        let startY = Phaser.Math.Between(60, boardheigh - 60); // Start y position
    
        for (let i = 0; i < num; i++) {
            let posX = startX;
            let posY = startY;
    
            switch (type) {
                case 'list': // ✅ Enemies spawn at fixed distances
                    posY = startY + i * spacing;
                    break;
                case 'random_list': // ✅ Enemies spawn at random Y positions
                    posY = Phaser.Math.Between(60, boardheigh - 60);
                    break;
                case 'arrow': // ✅ Arranges enemies in an arrow shape
                    posY = startY + (i % 2 === 0 ? i * spacing : -i * spacing);
                    posX = startX - (i * spacing / 2); // Stagger x positions
                    break;
                case 'diagonal': // ✅ Arranges enemies diagonally
                    posY = startY + i * spacing;
                    posX = startX - i * spacing;
                    break;
            }
    
            if (Emeny == 'Kedama') {
                emeny = new Kedama(this, posX, posY, 'Kedama');
            }
            
            this.EmenyGroup.add(emeny);
        }
    }
    levelBump() {
        // increment level (ie, score)
        //emenySpeed = emenySpeed + 0.5;
    }

    
}