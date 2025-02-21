
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
            delay: 5000,
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
        
        
        
        
        this.bulletGroup = this.physics.add.group(); // Create a bullet group
        this.time.addEvent({
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
        });
        
        


















        this.physics.add.overlap(rumia, this.bulletGroup, (rumia, bullet) => {
            if (!rumia.isHit && !bullet.isReflected) { 
                this.bulletCollision(rumia, bullet);
            }
        });
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
    }




    spawnKedama() {
        let count = Phaser.Math.Between(2, 4); // Random number of enemies
        let positionList = [];
        for (let i = 0; i < count; i++) {
            let attempts = 10; 
            let randomY;
            do {
                randomY = Phaser.Math.Between(60, boardheigh - 60);
                attempts--;
            } while (!this.isPositionValid(randomY, positionList) && attempts > 0)
            positionList.push(randomY)
            let kedama = new Kedama(this, game.config.width, randomY, 'Kedama');
            this.kedamaGroup.add(kedama);
        }
    }
}