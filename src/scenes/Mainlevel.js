class Mainlevel extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    create() {
        this.isSprawn = false;//sprawn flag
        //level = 0;
        // define keys    
        this.physics.world.setFPS(120);
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
        this.CurrentScoreText = this.add.text(50, 40, '[S]:'+ rumia.Playerscore, this.scoreConfig).setOrigin(0.5);

        this.anims.create({
            key: 'explodeAnim',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5 }), // Adjust frames if needed
            frameRate: 10,
            hideOnComplete: true
        });
        // ✅ Boss Health Bar UI (Centered at the bottom)
        //this.bossHealthBarBG = this.add.rectangle(boardwidth / 2 , boardheigh - 20, 500, 20, 0x000000)//.setOrigin(0.5, 0.5);
        this.bossHealthBar = this.add.rectangle(boardwidth / 2 , boardheigh - 20, 500, 20, 0xffffff)//.setOrigin(0.5, 0.5);
        this.bossHealthTotal = 0;;
        this.bossHealthBar.setVisible(false);
    
        this.boss = null; // ✅ Store the boss reference
    
            // Create Dialogue Box
        this.dialogueBox = this.add.rectangle(boardwidth / 2, boardheigh - 100, boardwidth - 200, 120, 0x000000, 0.7);
        this.dialogueText = this.add.text(boardwidth / 2 - 350, boardheigh - 125, '', {
            fontSize: '24px',
            color: '#ffffff',
            wordWrap: { width: boardwidth - 250 }
        });
        this.speakerText = this.add.text(boardwidth / 2 - 350, boardheigh - 160, '', {
            fontSize: '28px',
            color: '#ffcc00',
            fontStyle: 'bold'
        });

        this.dialogueBox.setVisible(false);
        this.dialogueText.setVisible(false);
        this.speakerText.setVisible(false);

        this.dialogueIndex = 0;
        this.isSpeech = false;
        
        // Spacebar Input to Continue Dialogue
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.isSpeech) {
                this.nextDialogue();
            }
        });

    }

    // create new barriers and add them to existing barrier group
    

    update() {
        
        rumia.update();
        // update bullet
        this.bulletGroup.children.iterate(bullet => {
            if (bullet && typeof bullet.update === 'function') {
                bullet.update(this.time.now, this.game.loop.delta); // Safely update each tree
            }
        });
        if (this.boss) {
            // 计算血量百分比（0到1之间）
            let healthPercent = Math.max(this.boss.healthly / this.bossHealthTotal, 0); // ✅ Normalize health (0-1)
            
            // 根据血量百分比计算血条宽度
            let newWidth = 500 * healthPercent; // ✅ Scale width based on health
            
            // 更新血条宽度
            this.bossHealthBar.setSize(newWidth, 20);
            
            // ✅ Keep the health bar centered (如果需要居中)
            // this.bossHealthBar.x = boardwidth / 2 - 200 + (newWidth / 2);
        }
    }

    startDialogue(playerName, playerSpeech, bossName, bossSpeech) {
        this.isSpeech = true; // ✅ Pause the game
        this.playerName = playerName;
        this.bossName = bossName;
        this.playerSpeech = playerSpeech;
        this.bossSpeech = bossSpeech;
        this.dialogueIndex = 0;
    
        // ✅ Show UI Elements
        this.dialogueBox.setVisible(true);
        this.dialogueText.setVisible(true);
        this.speakerText.setVisible(true);
    
        this.nextDialogue(); // ✅ Start first dialogue line
    }
    
    nextDialogue() {
        // ✅ If both characters have dialogue, alternate turns
        if (this.playerSpeech.length > 0 && this.bossSpeech.length > 0) {
            if (this.dialogueIndex % 2 === 0) {
                // ✅ Player's Turn
                if (this.dialogueIndex / 2 < this.playerSpeech.length) {
                    this.speakerText.setText(this.playerName);
                    this.dialogueText.setText(this.playerSpeech[Math.floor(this.dialogueIndex / 2)]);
                    this.dialogueIndex++;
                    return;
                }
            } else {
                // ✅ Boss's Turn
                if (Math.floor(this.dialogueIndex / 2) < this.bossSpeech.length) {
                    this.speakerText.setText(this.bossName);
                    this.dialogueText.setText(this.bossSpeech[Math.floor(this.dialogueIndex / 2)]);
                    this.dialogueIndex++;
                    return;
                }
            }
        } 
        // ✅ If only the player has dialogue, show only the player’s speech
        else if (this.playerSpeech.length > 0) {
            if (this.dialogueIndex < this.playerSpeech.length) {
                this.speakerText.setText(this.playerName);
                this.dialogueText.setText(this.playerSpeech[this.dialogueIndex]);
                this.dialogueIndex++;
                return;
            }
        } 
        // ✅ If only the boss has dialogue, show only the boss’s speech
        else if (this.bossSpeech.length > 0) {
            if (this.dialogueIndex < this.bossSpeech.length) {
                this.speakerText.setText(this.bossName);
                this.dialogueText.setText(this.bossSpeech[this.dialogueIndex]);
                this.dialogueIndex++;
                return;
            }
        }
    
        // ✅ End dialogue and resume game when both lists are finished
        this.isSpeech = false;
        this.dialogueBox.setVisible(false);
        this.dialogueText.setVisible(false);
        this.speakerText.setVisible(false);
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

    //bullet collision
    bulletCollision(obj, bullet){
        if(!obj.isDrop){
            if(obj.type == 'Rumia'){
                if(!obj.isHit  && !bullet.isReflected ){
                    if (obj.isdefence ) { // ✅ Reflect the bullet when defending
                        if(bullet.isRed && rumia.unableDefence <= 0){
                            rumia.endDefenseMode();
                            rumia.unableDefence = 3;
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
                
                        this.reflect(bullet,normalVector.x, normalVector.y);
                        
                        //this.reflect(bullet);
                        //.children.iterate(emeny => {
                        
                        //});
                        
                        return
                    }
                    else if(rumia.unableDefence == 3)
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
    DelayXspawnEmeny(numY, type, Emeny, subtype = '', behavior = '', startY = boardheigh / 2, startX = game.config.width + 120 ,numX = 1 , sprateMin = 1){
        for (let i = 0; i < numX; i++) {
            this.time.delayedCall(sprateMin, () =>{
                spawnEmeny(numY, type, Emeny, subtype , behavior, startY , startX )
            } , [], this);//step2
        }
    }
    spawnEmeny(numY, type, Emeny, subtype = '', behavior = '', startY = boardheigh / 2, startX = game.config.width + 120 ) {
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
                    case 'MaidFairy':
                        enemyWidth = data.getData('MaidFairy1_width');
                        enemyHeight = data.getData('MaidFairy1_height');
                        break;
                    case 'Wriggle':
                        enemyWidth = data.getData('Wriggle_width');
                        enemyHeight = data.getData('Wriggle_height');
                        break;
                    case 'Daiyousei':
                        enemyWidth = data.getData('Daiyousei_width');
                        enemyHeight = data.getData('Daiyousei_height');
                        break;
                    case 'Crino':
                        enemyWidth = data.getData('Crino_width');
                        enemyHeight = data.getData('Crino_height');
                        break;
                    case 'DestructionIce':
                        enemyWidth = data.getData('Crino_width');
                        enemyHeight = data.getData('Crino_height');
                        break;
                    default:
                        enemyWidth = 50;
                        enemyHeight = 50;
                }
                startY -= enemyHeight/2
                startX -= enemyWidth /2
                spacing = enemyWidth; // ✅ Default spacing is 1 body length
            
                for (let i = 0; i < numY; i++) {
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
                    
                    //  Create the enemy instance
                    emeny = this.setEmeny(Emeny, posX, posY, subtype);
        
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
                    //add bullet collider
                    this.bulletGroup.children.iterate(bullet => {
                        if (bullet.isReflected) {
                            this.physics.add.collider(emeny, bullet, (enemy, reflectedBullet) => {
                                this.bulletCollision(enemy, reflectedBullet);
                            });
                        }
                    });
                    this.EmenyGroup.add(emeny);
                }
        return emeny;
        
    }

    setEmeny(key, posX, posY, subtype){
        let emeny
        switch (key) {
            case 'Kedama':
                emeny = new Kedama(this, posX, posY, subtype);
                break;
            case 'DivineSpirit':
                emeny = new DivineSpirit(this, posX, posY,subtype);
                break;
            case 'SunFlowerFairy':
                emeny = new FlowerFairy(this, posX, posY, subtype);
                break;
            case 'MaidFairy':
                emeny = new MaidFairy(this, posX, posY, subtype);
                break;
            case 'Wriggle':
                emeny = new Wriggle(this, posX, posY, subtype);
                break;
            case 'Daiyousei':
                emeny = new Daiyousei(this, posX, posY, subtype);
                break;
            case 'Crino':
                emeny = new Crino(this, posX, posY, subtype);
                break;
            case 'DestructionIce':
                emeny = new Destruction(this, posX, posY, subtype);
                break;
            default:
                console.warn(`Unknown enemy type: ${Emeny}`);
                return;
        }
        return emeny;
    }
    getReflection(bulletType) {
        let rate = 70; // ✅ Default reflection rate
    
        // ✅ Adjust reflection rate based on bullet type
        /*
        switch (bulletType) {
            case 'blueSmallCircleBullet':
                rate = 40;
                break;
            case 'blueMediumCircleBullet':
                rate = 50;
                break;
            case 'blueLargeCircleBullet':
                rate = 60;
                break;    
        }*/
    
        return rate;
    }

    
    
    reflect(bullet, normalX = 0, normalY = -1) {
        if(bullet.isReflected)
            return;
        let rate = this.getReflection(bullet.type); // ✅ Get reflection rate
        let newBullet = this.shootingLogic.getBullet( bullet.type, rumia, bullet.speed,false);
        newBullet.x = bullet.x;
        newBullet.y = bullet.y;
        
        let target = bullet.shooter;
        if(target.type == 'distruction' && target.master){
            target = target.master;
        }
        let vx = bullet.vx;
        let vy = bullet.vy;



        bullet.dropOff(false); // ✅ Destroy original bullet
        newBullet.target = target;
        newBullet.shooter = rumia
        let randomChance = Phaser.Math.Between(0, 100);
        if (randomChance < rate && target && !target.isDrop) {
            newBullet = this.targetReflect(newBullet, target); // ✅ Regenerate bullet toward shooter
        } else {
            newBullet = this.normalReflect(newBullet, normalX, normalY,vx,vy); // ✅ Regenerate bullet at reflected angle
        }
        // ✅ Remove collision with Rumia so the bullet doesn't hit again
        this.physics.world.colliders.getActive().forEach(collider => {
            if (collider.object1 === newBullet && collider.object2 === rumia) {
                collider.destroy();
            }
        });
        newBullet.isReflected = true;    
        newBullet.setTint(0x00ff00);
        this.EmenyGroup.children.iterate(emeny => {
            this.physics.add.overlap(emeny, newBullet, (emeny, newBullet) => {
                this.bulletCollision(emeny, newBullet);
            });
        });
       

        this.bulletGroup.add(newBullet);
    }
    
    normalReflect(bullet, normalX = 0, normalY = -1, px,py) {
        let normalVector = new Phaser.Math.Vector2(normalX, normalY).normalize();
        let velocity = new Phaser.Math.Vector2(px, py);
        let reflectedVelocity = velocity.reflect(normalVector);
        
        let angleVariation = Phaser.Math.Between(-10, 10); // ✅ Randomize reflection angle
        reflectedVelocity.rotate(Phaser.Math.DEG_TO_RAD * angleVariation);
        
        bullet.vx = reflectedVelocity.x;
        bullet.vy = reflectedVelocity.y;
    
        // ✅ Ensure bullet moves by applying speed
        //bullet.vx *= bullet.speed;
       // bullet.vy *= bullet.speed;
    
        return bullet;
    }
    
    targetReflect(bullet, target) {
       
        
        // ✅ Bounce back directly toward shooter
        let direction = new Phaser.Math.Vector2(target.x - bullet.x, target.y - bullet.y).normalize();
        bullet.vx = direction.x * bullet.speed;
        bullet.vy = direction.y * bullet.speed;
        return bullet;
    }
    clearScreen(){

    }
    
}