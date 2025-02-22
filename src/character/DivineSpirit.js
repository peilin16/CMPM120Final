class DivineSpirit extends Character {
    constructor(scene, x, y,type = 'blue') {
        
        super(scene, x, y, 'DivineSpiritBlue1','DivineSpirit'); // Start with the first texture
        this.scene = scene;
        this.setOrigin(0.5);
        
        // Enemy Properties
        this.isEmeny = true;
        
        //this.type = 'DivineSpirit'
        this.shooting = false; // Prevents double shooting
        this.hasExited = false; // Ensures it exits properly
        this.speed = data.getData('blueDivineSpirit_speed'); // Move speed
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(data.getData('blueDivineSpirit_width'), data.getData('blueDivineSpirit_height'));
        this.body.setOffset(3, 4);
        this.body.setVelocityX(-this.speed); // Move towards the right quarter of the screen
        //this.body.setImmovable(true);
    }

    update() {
        
        if(this.behavior == 'r_shooting2_l'){
            this.x -= this.speed;
            if(this.isDrop){
                this.y += this.speed; 
            }else if ( this.x <= game.config.width * 0.75) {
                if (this.hasExited) 
                    return;
                this.speed = 0;// Stop moving
                this.scene.time.delayedCall(1000, () => this.r_shooting2_l(), [], this);
            }
        }

    }


    r_shooting2_l() {
        if (this.shooting) 
            return;
        this.shooting = true;

        /*let bullet1 = new BlueCircleBullet(this.scene, this.x, this.y, rumia, 's');
        this.scene.bulletGroup.add(bullet1);
        this.shootingLogic.sniperBullet(bullet1, rumia); // Aim at player*/

        
        let count = 0;
        this.scene.time.addEvent({
            delay: 200,
            repeat: 4,
            callback: () => {
                //console.log("Spawning tree...");
                let bullet2 = new BlueCircleBullet(this.scene, this.x, this.y, rumia, 120, false,  's');
                this.scene.bulletGroup.add(bullet2);
                shootingLogic.sniperBullet(bullet2, rumia);
                count++
                this.scene.physics.add.overlap(rumia, bullet2, (rumia, bullet2) => {
                    if (!rumia.isHit && !bullet2.isReflected) { 
                        this.scene.bulletCollision(rumia, bullet2);
                    }
                });
            },
            callbackScope: this,
            loop: false

        });
        // After shooting, wait 1 second and move left to exit
        this.scene.time.delayedCall(2300, () => this.exitScreen(), [], this);
    }
    collide(){
        this.healthly -=5
    }
    exitScreen() {
        this.hasExited = true;
        this.speed = 2.5;
        //this.body.setVelocityX(-this.speed); // Move left to exit 
    }
    
}