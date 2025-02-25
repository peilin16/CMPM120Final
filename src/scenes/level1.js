
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
            this.emenySpawn7.bind(this),
            this.emenySpawn2.bind(this),
            this.emenySpawn3.bind(this),
            this.emenySpawn4.bind(this),
            this.emenySpawn5.bind(this),
            this.emenySpawn6.bind(this),
            this.emenySpawn7.bind(this),
            this.midBossSpawn.bind(this),
            this.finalBossSpawn.bind(this),
            
            
            
            //
            
            
        ];
        



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
            this.time.delayedCall(18000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
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
            //this.bossHealthBarBG.setVisible(true);
            this.bossHealthBar.setVisible(true);
        }
    }
    finalBossSpawn(){

    }
  
}