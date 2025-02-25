class MaidFairy extends Character{
    constructor(scene, x, y, type, frame) {
        if(type == 'MaidFairy1'){
            super(scene, x, y, 'MaidFairy1_1', frame)
            this.anims.create({
                key: 'MaidFairy1',
                frames: [
                    { key: 'MaidFairy1_1' },
                    { key: 'MaidFairy1_2' },
                    { key: 'MaidFairy1_3' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.play('MaidFairy1'); // Play the 'rumiaFly' animation
            
            this.body.setSize(data.getData('MaidFairy1_width') , data.getData('MaidFairy1_height'), true); // Adjust hitbox size
            this.body.setOffset(5, 5); 
            //this.speed = data.getData('sunflowerFairy_speed') 
        }else{
            super(scene, x, y, 'MaidFairy1_2', frame)
            this.anims.create({
                key: 'MaidFairy2',
                frames: [
                    { key: 'MaidFairy2_1' },
                    { key: 'MaidFairy2_2' },
                    { key: 'MaidFairy2_3' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.play('MaidFairy2'); // Play the 'rumiaFly' animation
            
            this.body.setSize(data.getData('MaidFairy1_width') , data.getData('MaidFairy1_height'), true); // Adjust hitbox size
            this.body.setOffset(5, 5); 
        }
        this.subtype = type
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.healthly = 30;
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
        switch(this.behavior){
            case 'r_sb4f_at':
                this.r_sb4f_at();
                break;
            case 'r_sr3f_at':
                this.r_sr3f_at();
                break;
            case 'r_sbf3t_srf2t':
                this.r_sbf3t_srf2t();
                break; 
            case 't_sbf2t_srl1_b':
                this.t_sbf2t_srl1_b();
                break; 
            case 'b_sbf2t_srl1_t':
                this.b_sbf2t_srl1_t();
                break; 
        }
        
    }

    r_sb4f_at(){
        if(this.moveTo(700,-1,1.8) && this.step == 0){
            this.step +=1
            for (let i = 0; i < 3; i++) {
                this.scene.time.delayedCall(i * 150, () => {
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircle', 4, 160, 180, this, 2);//shooting 
                });
            }
            this.scene.time.delayedCall(300, () => this.step +=1, [], this);//step2
        }
        if(this.step == 2){
            this.exitScreen('autoTB')
        }
    }

    r_sr3f_at(){
        if(this.moveTo(700,-1,1.8) && this.step == 0){
            this.step +=1
            for (let i = 0; i < 3; i++) {
                this.scene.time.delayedCall(i * 150, () => {
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircle', 2, 150, 210, this, 2);//shooting 
                });
            }
            this.scene.time.delayedCall(300, () => this.step +=1, [], this);//step2
        }
        if(this.step == 2){
            this.exitScreen('autoTB')
        }
    }

    r_sbf3t_srf2t(){
        
        if(this.step == 0 && this.moveTo(750,-1,1.8)){
            this.step +=1
            for (let i = 0; i < 5; i++) {
                this.scene.time.delayedCall(i * 150, () => {
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToTarget('blueSmallCircle', 2, 17,  this, rumia, 2) ;//shooting 
                });
            }
            this.scene.time.delayedCall(500, () => this.step +=1, [], this);//step2
        }
        
        if(this.step == 2 && this.moveTo(550,-1,2)){
            this.scene.shootingLogic.listType_ToTarget('redLongSemicircleBullet', 4, 300, this, rumia, 4);
            this.step +=1;
            this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2
        }
        if(this.step == 4){
            this.exitScreen('top',1,-1.5);
        }
    }
    t_sbf2t_srl1_b(){
        if(this.step == 0 && this.moveTo(-1,120,1.8)){
            this.step += 1
            this.scene.shootingLogic.fanShapedType_ToTarget('blueSmallCircle', 2, 17,  this, rumia, 2) ;//shooting 
        }
        if(this.step == 1 && this.moveTo(-1,240,1.8)){
            this.step += 1
            this.scene.shootingLogic.listType_ToTarget('redSmallCircle', 4, 300, this, rumia, 4);
        }
        if(this.step == 2 ){
            this.exitScreen('bottom', 1.8 ,0);
        }
    }
    b_sbf2t_srl1_t(){
        if(this.step == 0 && this.moveTo(-1,490,1.8)){
            this.step += 1
            this.scene.shootingLogic.fanShapedType_ToTarget('blueSmallCircle', 2, 17,  this, rumia, 2) ;//shooting 
        }
        if(this.step == 1 && this.moveTo(-1,370,1.8)){
            this.step += 1
            this.scene.shootingLogic.listType_ToTarget('redSmallCircle', 4, 300, this, rumia, 4);
        }
        if(this.step == 2 ){
            this.exitScreen('top', 1.8 ,0);
        }
    }

    dropOff(){
        this.anims.stop();
        if(!this.isDrop)
            this.setTexture('MaidFairy1_Hit');
        super.dropOff(3300,3,2);
        
    }

}