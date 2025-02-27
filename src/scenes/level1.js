
class Level1 extends Mainlevel {
    constructor() {
        super('level1Scene'); // Scene Key
    }

    create() {
        // Create the animation for Rumia=


        this.startfield = this.add.tileSprite(0, 0, boardwidth, boardheigh, 'backgroundtop').setOrigin(0, 0);
        this.backgroundforest = this.add.tileSprite(0, 420, boardwidth, boardheigh, 'backgrounddown').setOrigin(0, 0);

        rumia = new Rumia(this, 150, 100, ).setOrigin(0.5, 0);

        super.create(); // Call MainLevel create method
       
        
        
        this.trees = this.physics.add.group();

        
        
        // Spawn trees at intervals
        this.time.addEvent({
            delay: 13000,
            callback: () => {
                //console.log("Spawning tree...");
                let tree1 = new Tree1(this, 1000, 500, 'tree1');
                console.log(tree1);
                this.trees.add(tree1);
            },
            callbackScope: this,
            loop: true

        });
        
        //snow
        this.snowGroup = this.physics.add.group(); // Create a group for snowflakes

        this.time.addEvent({
            delay: 700, // Every 0.7 seconds
            callback: () => {
                let snowflake = new Snow(this);
                this.snowGroup.add(snowflake);
            },
            callbackScope: this,
            loop: true
        });
        this.physics.add.collider(rumia, this.trees, this.handleCollision, null, this);
        
        //emeny occur
        
        
        
        
        
        /*this.time.addEvent({
            delay: 2000, // Fire every 2 seconds
            callback: () => {
                if (rumia) {
                    let bullet = new BlueCircleBullet(this, 200, 400, rumia,'s');
                    this.bulletGroup.add(bullet);
                    bullet.moving(); // Start moving towards Rumia
                }
            },
            callbackScope: this,
            loop: true
        });*/
        
        
        this.current = 0;
        this.emenySpawn = [
            this.midBossSpawn.bind(this),
            this.emenySpawn1.bind(this),
            this.emenySpawn2.bind(this),
            this.emenySpawn3.bind(this),
            this.emenySpawn4.bind(this),
            this.emenySpawn5.bind(this),
            this.emenySpawn6.bind(this),
            this.emenySpawn7.bind(this),
            this.midBossSpawn.bind(this),
            this.emenySpawn9.bind(this),
            this.emenySpawn10.bind(this),
            this.emenySpawn11.bind(this),
            this.emenySpawn12.bind(this),
            this.emenySpawn13.bind(this),
            this.finalBossSpawn.bind(this),
            
        ];
        this.rumiaSpeechWithWriggle = ['aaa','test','test1'];
        this.rumiaSpeechWithCrino = ['aaa','test','test1'];
        this.wriggleSpeech = ['www','aa','test']
        this.crinoSpeech = ['ccc','cbc','ccca']
        this.isSpeech = false;
        // ✅ Start the first wave
        this.nextWave();

        //music
        /*
        this.bgMusic = this.sound.add('background', { 
            loop: true, // Loop the music infinitely
            volume: 0.5 // Adjust volume (0.0 to 1.0)
            });
    
        this.bgMusic.play();*/
    }





    update(){
        if(this.isSpeech)
            return;
        super.update();
        this.backgroundforest.tilePositionX += 2; // Adjust speed as needed
        this.trees.children.iterate(tree => {
            if (tree && typeof tree.update === 'function') {
                tree.update(); // Safely update each tree
            }
        });

        // ✅ If no enemies are left, move to the next wave
        //
        this.nextWave();
    }
    nextWave() {
        this.emenySpawn[this.current](); // ✅ Call the current wave function
        // update emeny state
        this.EmenyGroup.children.iterate(enemy => {
            if (enemy && typeof enemy.update === 'function') {
                enemy.update(); // ✅ Ensure each enemy's update() is called
            }
        });
    }
    //spawn emeny
    emenySpawn1(){
        if(!this.isSprawn){
            //alert('emenySpawn1')
            this.isSprawn = true;
            super.spawnEmeny(3,'wideList','Kedama','','l2')
            this.time.delayedCall(2000, () => {
                this.spawnEmeny(4, 'list', 'DivineSpirit','blue','r_shooting2_l',200); // ✅ Spawns one DivineSpirit
                this.time.delayedCall(6000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
            }, [], this);//step2
        }
        /*else if (this.EmenyGroup.countActive(true) === 0) {
            this.current++; // ✅ Move to the next wave
            this.isSprawn = false; // ✅ Reset spawn flag
        }*/
    }
    emenySpawn2() {
        if (!this.isSprawn) {
            //alert('emenySpawn2')
            this.isSprawn = true;
            console.log("Wave 2 started!");
            super.spawnEmeny(6,'arrow','Kedama','','hp_3o6');
            this.time.delayedCall(2000, () => {this.spawnEmeny(4, 'list', 'DivineSpirit','blue','r_shooting2_l',200);})
            this.time.delayedCall(7000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn3() {
        if (!this.isSprawn) {
            this.isSprawn = true;
            console.log("Wave 3 started!");
            //alert('emenySpawn3')
            super.spawnEmeny(5,'List','Kedama','','l2',160)
            
            super.spawnEmeny(2,'list','MaidFairy','MaidFairy1','r_sb4f_at',150); // ✅ Reuse same function to spawn new enemies
            this.time.delayedCall(1400, () =>{super.spawnEmeny(2,'list','MaidFairy','MaidFairy1','r_sb4f_at',150)} , [], this);//step2
            this.time.delayedCall(2400, () =>{super.spawnEmeny(2,'list','MaidFairy','MaidFairy1','r_sb4f_at',150); } , [], this);//step2
            this.time.delayedCall(3400, () =>{super.spawnEmeny(2,'list','MaidFairy','MaidFairy1','r_sb4f_at',150)} , [], this);//step2
            this.time.delayedCall(4000, () =>{super.spawnEmeny(6,'arrow','Kedama','','hp_3o6')} , [], this);//step2
            this.time.delayedCall(4400, () =>{super.spawnEmeny(2,'list','MaidFairy','MaidFairy1','r_sr3f_at',150);} , [], this);//step2
            this.time.delayedCall(4400, () =>{super.spawnEmeny(6,'arrow','Kedama','','l2');} , [], this);//step2
            this.time.delayedCall(6000, () =>{super.spawnEmeny(6,'arrow','Kedama','','hp_3o6'); this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn4(){
        if(!this.isSprawn){
            this.isSprawn = true;
            //alert('emenySpawn4')
            console.log("Wave 4 started!");
            super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t');
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t')} , [], this);//step2
            this.time.delayedCall(3000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t')} , [], this);//step2
            this.time.delayedCall(3500, () =>{super.spawnEmeny(5,'list','Kedama','','l2',160)} , [], this);//step2
            this.time.delayedCall(5000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t')} , [], this);//step2
            this.time.delayedCall(3400, () =>{super.spawnEmeny(2,'list','MaidFairy','MaidFairy2','r_sb4f_at',150)} , [], this);//step2
            this.time.delayedCall(7000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t')} , [], this);//step2
            this.time.delayedCall(4500, () =>{super.spawnEmeny(2,'list','MaidFairy','MaidFairy2','r_sb4f_at',150)} , [], this);//step2
            this.time.delayedCall(8000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t')} , [], this);//step2
            //super.spawnEmeny(5,'list','Kedama','','l2');
            this.time.delayedCall(7500, () =>{super.spawnEmeny(5,'list','Kedama','','l2',160)} , [], this);//step2
            this.time.delayedCall(15300, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn5(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);
            this.time.delayedCall(3000, () => {this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);})
            this.time.delayedCall(4500, () => {this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);})
            this.time.delayedCall(6000, () => {this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);})
            this.time.delayedCall(7500, () => {this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);})
            this.time.delayedCall(9000, () => {this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);})
            this.time.delayedCall(11500, () => {this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);})
            this.time.delayedCall(14300, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn6(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(3000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',180)} , [], this);//step2
            this.time.delayedCall(3000, () => {this.spawnEmeny(1, 'list', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',460);})
            this.time.delayedCall(4500, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',180)} , [], this);//step2
            this.time.delayedCall(4500, () => {this.spawnEmeny(1, 'list', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',460);})
            this.time.delayedCall(6000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',180)} , [], this);//step2
            this.time.delayedCall(6000, () => {this.spawnEmeny(1, 'list', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',460);})
            this.time.delayedCall(7500, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',180)} , [], this);//step2
            this.time.delayedCall(7500, () => {this.spawnEmeny(1, 'list', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',460);})
            this.time.delayedCall(9000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',180)} , [], this);//step2
            this.time.delayedCall(9000, () => {this.spawnEmeny(1, 'list', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',460);})
            this.time.delayedCall(10500, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',180)} , [], this);//step2
            this.time.delayedCall(10500, () => {this.spawnEmeny(1, 'list', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',460);})
            this.time.delayedCall(12000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',180)} , [], this);//step2
            this.time.delayedCall(12000, () => {this.spawnEmeny(1, 'list', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',460);})
            this.time.delayedCall(13500, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',180)} , [], this);//step2
            this.time.delayedCall(13500, () => {this.spawnEmeny(1, 'list', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',460);})
            this.time.delayedCall(20000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn7(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(2000, () => {this.spawnEmeny(3, 'list', 'DivineSpirit','blue','r_shooting2_l',100);})
            this.time.delayedCall(2000, () =>{super.spawnEmeny(10,'arrow','Kedama','','hp_3o6')} , [], this);//step2
            this.time.delayedCall(5000, () =>{super.spawnEmeny(7,'arrow','Kedama','','hp_3o6')} , [], this);//step2
            this.time.delayedCall(6000, () =>{super.spawnEmeny(7,'arrow','Kedama','','hp_3o6')} , [], this);//step2
            this.time.delayedCall(18000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    midBossSpawn(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss = this.spawnEmeny(1, 'list', 'Wriggle','','r_sbf4_srf1')
            //this.time.delayedCall(20, () => {;})
            this.bossHealthTotal = this.boss.healthly;
            this.bossHealthBar.setVisible(true);
            if(this.boss.isDrop){
                this.current += 1;
                this.isSprawn = false;
                this.boss = null;
            }
            this.time.delayedCall(2600, () => {
                this.startDialogue('Rumia', this.rumiaSpeechWithWriggle, 'Wriggle Nightbug', this.wriggleSpeech);
            });
        }
    }
    emenySpawn9(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(2000, () => {this.spawnEmeny(1, 'list', 'Daiyousei','','healthly',200);});
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',480)} , [], this);//step2
            this.time.delayedCall(3400, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',480)} , [], this);//step2
            this.time.delayedCall(5000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',480)} , [], this);//step2
            this.time.delayedCall(6500, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',480)} , [], this);//step2
            this.time.delayedCall(8000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',480)} , [], this);//step2
            this.time.delayedCall(9500, () =>{super.spawnEmeny(8,'list','Kedama','','l2',80)} , [], this);//step2
            this.time.delayedCall(14000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn10(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','SunFlowerFairy','r5_s5Fs6L_tL',120)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',440)} , [], this);//step2
            this.time.delayedCall(4000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',440)} , [], this);//step2\
            this.time.delayedCall(6000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',440)} , [], this);//step2
            this.time.delayedCall(8000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',440)} , [], this);//step2
            this.time.delayedCall(10000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',440)} , [], this);//step2
            this.time.delayedCall(12000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',440)} , [], this);//step2
            this.time.delayedCall(14000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',440)} , [], this);//step2
            this.time.delayedCall(16000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',440)} , [], this);//step2
            this.time.delayedCall(18000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',440)} , [], this);//step2
            this.time.delayedCall(20000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',440)} , [], this);//step2
            this.time.delayedCall(26000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn11(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','t_sbf2t_srl1_b',-70, 350)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','t_sbf2t_srl1_b',-70, 550)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','t_sbf2t_srl1_b',-70, 750)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','t_sbf2t_srl1_b',-70, 950)} , [], this);//step2
            this.time.delayedCall(1600, () =>{super.spawnEmeny(6,'list','Kedama','','l2',80)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','b_sbf2t_srl1_t',boardheigh + 70, 350)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','b_sbf2t_srl1_t',boardheigh + 70, 550)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','b_sbf2t_srl1_t',boardheigh + 70, 750)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','b_sbf2t_srl1_t',boardheigh + 70, 950)} , [], this);//step2
            this.time.delayedCall(6000, () =>{super.spawnEmeny(7,'arrow','Kedama','','hp_3o6')} , [], this);//step2
            this.time.delayedCall(14000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn12(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','SunFlowerFairy','r5_s5Fs6L_tL',520)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',140)} , [], this);//step2
            this.time.delayedCall(4000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',140)} , [], this);//step2\
            this.time.delayedCall(6000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',140)} , [], this);//step2
            this.time.delayedCall(8000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',140)} , [], this);//step2
            this.time.delayedCall(10000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',140)} , [], this);//step2
            this.time.delayedCall(12000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',140)} , [], this);//step2
            this.time.delayedCall(14000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',140)} , [], this);//step2
            this.time.delayedCall(16000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',140)} , [], this);//step2
            this.time.delayedCall(18000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',140)} , [], this);//step2
            this.time.delayedCall(20000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_r3l_at',140)} , [], this);//step2
            this.time.delayedCall(26000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn13(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t')} , [], this);//step2
            this.time.delayedCall(3000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t')} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_sb4f_at',150)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_sb4f_at',450)} , [], this);//step2
            this.time.delayedCall(3500, () =>{super.spawnEmeny(5,'list','Kedama','','l2',160)} , [], this);//step2
            this.time.delayedCall(5000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t')} , [], this);//step2
            this.time.delayedCall(3400, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_sb4f_at',150)} , [], this);//step2
            this.time.delayedCall(3400, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_sb4f_at',450)} , [], this);//step2
            this.time.delayedCall(7000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t')} , [], this);//step2
            this.time.delayedCall(5500, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_sb4f_at',150)} , [], this);//step2
            this.time.delayedCall(5500, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_sb4f_at',450)} , [], this);//step2
            this.time.delayedCall(8000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t')} , [], this);//step2
            this.time.delayedCall(7500, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_sb4f_at',150)} , [], this);//step2
            this.time.delayedCall(7500, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_sb4f_at',450)} , [], this);//step2
            this.time.delayedCall(9000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t')} , [], this);//step2
            this.time.delayedCall(8500, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_sb4f_at',150)} , [], this);//step2
            this.time.delayedCall(8500, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','r_sb4f_at',450)} , [], this);//step2
            this.time.delayedCall(20000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    finalBossSpawn(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss =super.spawnEmeny(1,'list','Crino','Crino','r_sTf9_sTf8')//step2
            this.bossHealthTotal = this.boss.healthly;
            this.bossHealthBar.setVisible(true);
            if(this.boss.isDrop){
                this.current += 1;
                this.isSprawn = false;
                this.boss = null;
            }
            this.time.delayedCall(2800, () => {
                this.startDialogue('Rumia', this.rumiaSpeechWithCrino, 'Crino', this.crinoSpeech);
            });
        }
    }
  
}