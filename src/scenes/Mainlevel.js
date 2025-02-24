class Mainlevel extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    create() {
        this.isSprawn = false;//sprawn flag
        //level = 0;
        // define keys    
        
        this.installShootingLogic(); // ✅ Attach shooting logic to this scene
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        
        

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

        //add collider with help

    }

    // create new barriers and add them to existing barrier group
    

    update() {
        
        rumia.update();
        // update bullet
        this.bulletGroup.children.iterate(bullet => {
            if (bullet && typeof bullet.update === 'function') {
                bullet.update(); // Safely update each tree
            }
        });
        
    }
    //game over
    gameOver(){
        rumia.dropOff();
            rumia.time.delayedCall(3000, () => {
                this.bgMusic.stop(); // Stop background music
                this.scene.start('titleScene');
            }, [], this);        
        //
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
    getReflection(bullet,normalVectorX,normalVectorY){
        let rate = 40;
        /*switch(bullet.type){
            case 'blueSmallCircleBullet':
                rate = 40;
                break;
            case 'blueMediumCircleBullet':
                rate = 40;
                break;
            case 'blueLargeCircleBullet':
                rate = 40;
                break;    
        }*/
        bullet.reflect(normalVectorX, normalVectorY,rate);
        return bullet;
    }
    //bullet collision
    bulletCollision(obj, bullet){
        if(!obj.isDrop){
            if(obj.type == 'player'){
                if(!obj.isHit  && !bullet.isReflected ){
                    if (obj.isdefence ) { // ✅ Reflect the bullet when defending
                        if(bullet.isRed && rumia.unableDefence <= 0){
                            rumia.endDefenseMode();
                            rumia.unableDefence = 4;
                            rumia.notDefenceState();
                            bullet.dropOff();
                            return;
                        }
                           
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
                
                        //bullet.reflect(normalVector.x, normalVector.y);
                        bullet = this.getReflection(bullet,normalVector.x, normalVector.y );

                        //.children.iterate(emeny => {
                        this.physics.add.collider(this.EmenyGroup, bullet, (reflectedBullet,enemy ) => {
                            this.bulletCollision(enemy, reflectedBullet);
                        });
                        //});
                        
                        return
                    }
                    else if(rumia.unableDefence == 4)
                    {
                        bullet.dropOff();
                        return;
                    } 
                    obj.collideToBullet(bullet);
                    bullet.dropOff();
                    //this.colliderObject.destroy();
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
        if(obj.healthly <= 0)
            obj.dropOff()
        if(rumia.healthly < 0){
            //this.gameOver();
                
            //this.gameOver();
        }
        this.RumiahealthText.setText('[H]:'+rumia.healthly);
        this.CurrentScoreText.setText('[P]:'+rumia.score);
        //rumia.isHit = true;
    }

    spawnEmeny(num, type, Emeny, subtype = '', behavior = '', startY = boardheigh / 4, startX = game.config.width + 50) {
        let positionList = [];
        let emeny;
        let spacing;
        
        let data = new dataRecord(); // ✅ Access enemy sizes
        let enemyWidth, enemyHeight;
    
        switch (Emeny) {
            case 'Kedama':
                enemyWidth = data.getData('kedama_width');
                enemyHeight = data.getData('kedama_height');
                break;
            case 'DivineSpirit':
                enemyWidth = data.getData('blueDivineSpirit_width');
                enemyHeight = data.getData('blueDivineSpirit_height');
                break;
            case 'SunFlowerFairy':
                enemyWidth = data.getData('sunflowerFairy_width');
                enemyHeight = data.getData('sunflowerFairy_height');
                break;
            default:
                console.warn(`Unknown enemy type: ${Emeny}`);
                return;
        }
    
        spacing = enemyWidth; // ✅ Default spacing is 1 body length
    
        for (let i = 0; i < num; i++) {
            let posX = startX;
            let posY = startY;
    
            switch (type) {
                case 'list': // ✅ Keep a vertical distance of 1 body length
                    posY = startY + (i * enemyHeight) ;
                    if(i > 0){
                        posY += i*enemyHeight
                    }
                    break;
                case 'random_list': // ✅ Randomize vertical position while keeping spacing
                    do {
                        posY = Phaser.Math.Between(60, boardheigh - 60);
                    } while (positionList.some(y => Math.abs(y - posY) < enemyHeight));
                    break;
                case 'arrow': // ✅ Arrange in arrow shape, spacing vertically and diagonally
                    posY = startY + (i % 2 === 0 ? i * enemyHeight : -i * enemyHeight) + 60;
                    posX = startX - (i * spacing / 2) - 60;
                    break;
                case 'diagonal': // ✅ Arrange diagonally with 1 body length spacing
                    posY = 30 + startY + i * enemyHeight;
                    posX = startX - i * spacing - 30;
                    break;
                case 'wideList': // ✅ Arrange in a wide list with 2 body length spacing
                    posY = startY + (i * enemyHeight) ;
                    if(i > 0){
                        posY += 2* i * enemyHeight
                    }
                    break;
            }
    
            // ✅ Create the enemy instance
            if (Emeny === 'Kedama') {
                emeny = new Kedama(this, posX, posY, 'Kedama');
            } else if (Emeny === 'DivineSpirit') {
                emeny = new DivineSpirit(this, posX, posY,subtype);
            } else if (Emeny === 'SunFlowerFairy') {
                emeny = new Fairy(this, posX, posY, 'SunFlowerFairy');
            }
    
            emeny.subType = subtype;
            emeny.behavior = behavior;
    
            // ✅ Ensure spacing is maintained
            positionList.push(posY);
    
            // ✅ Add collision with Rumia
            this.physics.add.overlap(rumia, emeny, (rumia, emeny) => {
                if (!rumia.isHit) {
                    this.handleCollision(rumia, emeny);
                }
            });
    
            this.EmenyGroup.add(emeny);
        }
    }
    levelBump() {
        // increment level (ie, score)
        //emenySpeed = emenySpeed + 0.5;
    }

    
}