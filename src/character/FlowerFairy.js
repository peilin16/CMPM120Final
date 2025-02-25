class FlowerFairy extends Character{
    constructor(scene, x, y, type, frame) {
        if(type == 'SunFlowerFairy'){
            super(scene, x, y, 'sunflowerFairy1', frame)
            this.anims.create({
                key: 'sunflowerFairy',
                frames: [
                    { key: 'sunflowerFairy1' },
                    { key: 'sunflowerFairy2' },
                    { key: 'sunflowerFairy3' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.play('sunflowerFairy'); // Play the 'rumiaFly' animation
            this.subtype = 'sunflower'
            this.body.setSize(data.getData('sunflowerFairy_width') , data.getData('sunflowerFairy_height'), true); // Adjust hitbox size
            this.body.setOffset(5, 5); 
            //this.speed = data.getData('sunflowerFairy_speed') 
        }else{
            super(scene, x, y, 'dandelionFairy1', frame)
            this.anims.create({
                key: 'dandelionFairy',
                frames: [
                    { key: 'dandelionFairy1' },
                    { key: 'dandelionFairy2' },
                    { key: 'dandelionFairy3' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.play('dandelionFairy'); // Play the 'rumiaFly' animation
            this.subtype = 'dandelion'
            this.body.setSize(data.getData('dandelionFairy_width') , data.getData('dandelionFairy_height'), true); // Adjust hitbox size
            this.body.setOffset(5, 5); 
            //this.speed = data.getData('dandelionFairy_speed') 
        }
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.healthly = 37;
        this.isDrop = false;
        this.kind = 'f'
        //this.speed = emenySpeed; 
        this.ableToDefence = false; 
        this.isEmeny = true;
        

    }

    update() {
        super.update();
        if(this.isDrop)
            return
        if(this.behavior == 'r5_s5Fs6L_tL' ){
            this.r5_s5Fs6L_tL();
        }
                
        
    }
    
    

    r5_s5Fs6L_tL() {
        if(this.step == 0 && this.moveTo(850)){
            this.step += 1;
            //fanShapedType_ToDirection(bulletType, num, angleStart, angleEnd, shooter, speed)
            //fanShapedType_ToTarget(bulletType, num, target, offsetAngle, shooter, speed) 
            for (let i = 0; i < 4; i++) {
                this.scene.time.delayedCall(i * 30, () => {
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircle', 5, 170, 190, this, 2);//shooting 
                    
                });
            }
            this.scene.time.delayedCall(400, () => this.step +=1, [], this);//step2
        }

        if(this.step == 2){
            this.step +=1
            
            this.scene.shootingLogic.listType_ToTarget('redMediumCircle', 5, 200, this, rumia, 4);//shooting 
            this.scene.time.delayedCall(2400, () => this.step +=1, [], this);//step2
        }
        if(this.step == 4){
            this.exitScreen('autoTB')
        }

    }

    dropOff(){
        this.anims.stop();
        this.setTexture('sunflowerFairyHit');
        super.dropOff();
        
    }
}