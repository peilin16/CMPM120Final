class DivineSpirit extends Character {
    constructor(scene, x, y,subType = 'blue') {
        if(subType == 'blue'){
            super(scene, x, y, 'DivineSpiritBlue1','DivineSpirit'); // Start with the first texture
            this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
            this.body.setSize(data.getData('blueDivineSpirit_width'), data.getData('blueDivineSpirit_height'));
            this.anims.create({
                key: 'BlueDivineSpirit',
                frames: [
                    { key: 'DivineSpiritBlue1' },
                    { key: 'DivineSpiritBlue2' },
                    { key: 'DivineSpiritBlue3' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.subType = subType;
            this.anims.play('BlueDivineSpirit');
            super.healthly = 15;
        }else if(type == 'red'){

        }
        
        
        
        
        this.scene = scene;
        this.setOrigin(0.5);
        
        // Enemy Properties
        this.isEmeny = true;
        
        //this.type = 'DivineSpirit'
        
        this.hasExited = false; // Ensures it exits properly
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.body.setOffset(3, 4);
        //this.body.setVelocityX(-this.speed); // Move towards the right quarter of the screen
        
        
    }

    update() {
        super.update();
        if(this.isDrop){
            return
        }
        if(this.behavior == 'r_shooting2_l'){
            this.r_shooting2_l();
        }

    }


    r_shooting2_l() {
        if (this.step == 0 && this.moveTo(850,-1,2)){
            this.step +=1
            this.scene.shootingLogic.listType_ToTarget('blueMediumCircle', 5, 200, this, rumia,2);
            this.scene.time.delayedCall(2400, () => this.step +=1, [], this);//step2
        } 
        if(this.step == 2){
            this.exitScreen('autoTB')
        }
    }
    collide(){
        this.healthly -=5
    }

    
}