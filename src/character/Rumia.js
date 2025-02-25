class Rumia extends Character{
    
    constructor(scene, x, y,  frame) {
        super(scene, x, y, 'rumiafly1','player', frame)
        
        this.healthly = 3; 
        this.speed = 3.5;
        this.boomber = 0;
        this.score = 0;
        this.ableToDefence = true; 
        this.isdefence = false;
        this.isSpecialanimePlaying = false;
        this.collideCircleRadius = 22;
        this.collideCircleRadiusOffset = [30,14]
        this.Xspeed = 0;
        this.unableDefence = 0;
        
        this.isHit = false;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setCircle(data.getData('rumia_circle')); // ✅ Set a circular hitbox with radius 25
        //this.body.setSize(25, 25); // ✅ Adjust width/height to fit the oval shape
        this.body.setOffset(45, 24);
        // ✅ Create countdown text (initially hidden)
        this.defenseCountdownText = scene.add.text(this.x, this.y - 40, '', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(0.5).setVisible(false);          
        // create anims rumia fly
        this.anims.create({
            key: 'rumiaFly',
            frames: [
                { key: 'rumiafly1' },
                { key: 'rumiafly2' },
                { key: 'rumiafly3' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });

        // create anims rumia fly
        this.anims.create({
            key: 'rumiaDefenceStart',
            frames: [
                { key: 'rumiaDefence1' },
                { key: 'rumiaDefence2' },
                { key: 'rumiaDefence3' },
                { key: 'rumiaDefence4' },
            ],
            frameRate: 15, // 10 frames per second
            repeat: 0 // Loop infinitely
        });

        this.anims.create({
            key: 'rumiaDefenceEnd',
            frames: [
                { key: 'rumiaDefence4' },
                { key: 'rumiaDefence3' },
                { key: 'rumiaDefence2' },
                { key: 'rumiaDefence1' },
            ],
            frameRate: 15, // 10 frames per second
            repeat: 0 // Loop infinitely
        });
        this.play('rumiaFly'); // Play the 'rumiaFly' animation
        
    }
    update(){
        super.update();
        if(!this.isDrop){
            this.playerMoving();
        }else{
            this.y +=4
        }
        if( this.unableDefence <= 0){
            this.ableToDefence = true; 
        }
        // ✅ Update defense countdown text position and value
        this.defenseCountdownText.setPosition(this.x, this.y - 40);
        if (this.unableDefence > 0) {
            this.defenseCountdownText.setText(this.unableDefence.toFixed(1)); // Show time left
            this.defenseCountdownText.setVisible(true);
        } else {
            this.defenseCountdownText.setVisible(false); // Hide when countdown ends
        }
    }
    notDefenceState() {
        // Spawn trees at intervals
        if(!this.ableToDefence)
            return
        this.scene.time.addEvent({
            delay: 1000,
            repeat: 3,
            callback: () => {
                this.unableDefence -= 1;
            },
            callbackScope: this,
            loop: false
        });
        this.ableToDefence = false; 

    }

    playerMoving(){
        // Remove obstacles when they leave the screen
        
            if (keyA.isDown && this.x > 32) {
            
                this.x -= this.speed
            }
            if (keyS.isDown && this.y < 480) {
                   
                this.y += this.speed
            }
            
            if (keyW.isDown && this.y > 0) {
                this.y -= this.speed
            }
            if (keyD.isDown && this.x < 950) {
                this.x += this.speed
            }
        
        
        /*if (!keyShift.isDown) {
            this.speed = this.Speed
        }
        if (keyShift.isDown) {
            this.speed = this.Speed + 2
        }*/
        
       
        // ✅ Prevent entering defense mode if unableDefence > 0
        if (keyK.isDown && this.isdefence === false && this.isSpecialanimePlaying === false && this.unableDefence <= 0) {
            this.enterDefenseMode();
        } else if (!keyK.isDown && this.isdefence === true && this.isSpecialanimePlaying === false) {
            this.endDefenseMode();
        }
        
        
            // Prevent character from going outside the board
    }
    dropOff(){
        this.isDrop = true
        //this.setTexture('KedamaHit');
        
        this.scene.tweens.add({
            targets: this,
            angle: 360, 
            duration: 6500, 
            ease: 'Linear',
            repeat: -1, 
            onComplete: () => {
                this.destroy(); // Remove the object after animation
            }
        });

    }
    enterDefenseMode() {
        
        this.anims.stop();
        this.anims.play('rumiaDefenceStart'); // Play defense start animation
        this.isSpecialanimePlaying = true 
        // After defenseStart finishes, freeze on rumiaDefence3
        this.once('animationcomplete', () => {
            this.setTexture('rumiaDefence4'); // Freeze on rumiaDefence5
            this.isSpecialanimePlaying = false; 
            this.body.setImmovable(true)
            //alert('aaa')
            this.isdefence = true; // Set to defense mode
                // ✅ Restore normal attack range
            this.body.setCircle(52);  // Reset collider size
            this.body.setOffset(4, 3); // Reset offset
        });
    }
    
    endDefenseMode() {
        this.anims.play('rumiaDefenceEnd'); // Play defense exit animation
        this.isSpecialanimePlaying = true;
        //alert('aaa')
        this.isdefence = false;
        this.body.setCircle(data.getData('rumia_circle'));  // Reset collider size
        this.body.setOffset(45, 24); // Reset offset
        this.once('animationcomplete', () => {
            this.setTexture('rumiafly1'); // Reset to normal state
            this.isSpecialanimePlaying = false;
            
            this.play('rumiaFly');
                // ✅ Restore normal attack range
            
        });
    }

    collide(obj) {
        
        if (!this.isDrop && !obj.isDrop) {
            if (!obj.isEmeny) { // If colliding with a friendly object
                if (!obj.isTouch) {
                    let pickUpSound = this.scene.getAudio('p'); // ✅ Call from scene
                    if (pickUpSound) pickUpSound.play();
                }
                //obj.behavior(this);
                //obj.dropOff();
            } else if (!this.isHit) { // If colliding with an enemy
                let hitSound = this.scene.getAudio('h'); // ✅ Call from scene
                if (hitSound) hitSound.play();
                if(this.isdefence && obj.type == 'Kedama'){
                    return;
                }
                this.isSpecialanimePlaying = true;
                this.isHit = true;
                this.healthly--; // Reduce health
                //this.isdefence  = false
                
    
                // Damage animation effect
                this.anims.stop();
                this.setTexture('rumiaflyhit'); // ✅ Set damage texture immediately

                this.scene.tweens.add({
                    targets: this,
                    alpha: 0.2, // Flash effect
                    yoyo: true,
                    repeat: 6, // Flash 6 times
                    duration: 250,
                    onComplete: () => {
                        this.setTexture('rumiafly1'); // ✅ Reset texture after animation
                        this.play('rumiaFly'); // ✅ Resume flying animation
                        this.alpha = 1; // ✅ Reset transparency
                        this.isHit = false; // ✅ Allow another hit
                        this.isSpecialanimePlaying = false;
                    }
                });

            }
        }
    }
    collideToBullet(bullet){
        if (!this.isHit) { // Prevent multiple hits at once
            this.body.checkCollision=false

            this.body.ov
            this.isHit = true;
            //this.isdefence  = false
            this.healthly--; // Reduce health
            score -= 5;
            this.setTexture('rumiaflyhit');
    
            let hitSound = this.scene.getAudio('h'); // ✅ Play hit sound
            if (hitSound) hitSound.play();
    
            // Damage effect (flashing)
            this.anims.stop();
            this.scene.tweens.add({
                targets: this,
                alpha: 0.2, // Flash effect
                yoyo: true,
                repeat: 6, // Flash 6 times
                duration: 250,
                onComplete: () => {
                    this.setTexture('rumiafly1');
                    this.play('rumiaFly');
                    this.alpha = 1;
                    this.isHit = false; // Allow another hit
                }
            });
    
            // Check if health is zero (Game Over)
            if (this.healthly <= 0) {
                this.scene.time.delayedCall(1000, () => {
                    this.dropOff(); // Destroy Rumia
                    this.scene.gameOver(); // End game
                });
            }
        }
    } 
}
