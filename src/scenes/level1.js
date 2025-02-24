
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
            this.emenySpawn4.bind(this),
            this.emenySpawn2.bind(this),
            this.emenySpawn1.bind(this),
            
            
            
            
            
            
            //
            
            this.emenySpawn3.bind(this),
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
            this.isSprawn = true;
            super.spawnEmeny(3,'wideList','Kedama')
        }else if (this.EmenyGroup.countActive(true) === 0) {
            this.current++; // ✅ Move to the next wave
            this.isSprawn = false; // ✅ Reset spawn flag
        }
    }
    emenySpawn2() {
        if (!this.isSprawn) {
            this.isSprawn = true;
            console.log("Wave 2 started!");
            this.spawnEmeny(4, 'list', 'DivineSpirit','blue','r_shooting2_l',200); // ✅ Spawns one DivineSpirit
        }
    }
    emenySpawn3() {
        if (!this.isSprawn) {
            this.isSprawn = true;
            console.log("Wave 3 started!");
            super.spawnEmeny(5,'arrow','Kedama'); // ✅BlueCircleBullet Reuse same function to spawn new enemies
        }
    }
    emenySpawn4(){
        if(!this.isSprawn){
            this.isSprawn = true;
            console.log("Wave 4 started!");
            super.spawnEmeny(2,'wideList','SunFlowerFairy','SunFlowerFairy','r5_s5Fs6L_tL',200); // ✅ Reuse same function to spawn new enemies
        }
    }



    midBossSpawn(){

    }
    FinalBossSpawn(){

    }
  
}