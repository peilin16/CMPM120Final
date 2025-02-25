class Wriggle extends Character{
    constructor(scene, x, y,subtype , frame) {
        super(scene, x, y, 'Wriggle1','Wriggle'); // Start with the first texture
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('Wriggle_width'), data.getData('Wriggle_height'));
        this.anims.create({
            key: 'Wriggle1',
            frames: [
                { key: 'Wriggle1' },
                { key: 'Wriggle2' },
                { key: 'Wriggle3' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });
        this.subType = subtype;
        this.anims.play('Wriggle1');
        super.healthly = 15;
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(5, 6);
        this.healthly = 500;
        this.isDrop = false;
        this.kind = 'f'
        this.isEmeny = true;
        this.isDone = false;
        this.isFirst = true
        this.previousBehavior =this.behavior;
    }
    

    update(){
        super.update();
        if(this.isDrop)
            return
        if(this.isDone){
            this.behavior = this.getBehavior(this.previousBehavior);
            this.previousBehavior =this.behavior;
            this.step = 0;
        }
        if(this.isFirst){
            this.behavior = 'r_sbf4_srf1'
            this.previousBehavior =this.behavior;
            this.isFirst = false
        }
        
        switch(this.behavior){
            case 'r_sbf4_srf1':
                //this.r_sbf4_srf1();
                //this.r_bFr8_rFr8();
                this.r_bFr12_rA12();
                break;
                
        }
        

    }
    r_sbf4_srf1(){
        if( this.step == 0 &&this.moveTo(800,270,2) ){
            this.step +=1
            this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircle', 10, 0, 324, this, 2);//shooting 
            this.scene.time.delayedCall(300, () => {
                for (let i = 0; i < 6; i++) {
                    this.scene.time.delayedCall(i * 150, () => {
                        // ✅ Get a new bullet instance
                        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircle', 10, 0, 324, this, 2);//shooting 
                        this.scene.shootingLogic.fanShapedType_ToTarget('blueMediumCircle', 4,  10, this, rumia, 2)
                    });
                }

            }, [], this);//step2
            
            this.scene.time.delayedCall(1300, () => this.step +=1, [], this);//step2
        }
        else if(this.step == 2){
            this.step +=1
            
        }
        else if(this.step == 3 &&this.moveTo(600,170,2) ){
            this.step +=1
            this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircle', 10, 0, 324, this, 2);//shooting 
            this.scene.time.delayedCall(300, () => {
                for (let i = 0; i < 6; i++) {
                    this.scene.time.delayedCall(i * 150, () => {
                        // ✅ Get a new bullet instance
                        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircle', 10, 0, 324, this, 2);//shooting 
                        this.scene.shootingLogic.fanShapedType_ToTarget('redMediumCircle', 4,  15, this, rumia, 2)
                    });
                }

            }, [], this);//step2
            this.scene.time.delayedCall(1300, () => this.step +=1, [], this);//step2
        }
        else if(this.step == 5&&this.moveTo(700,520,2)){
            this.step +=1
            this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircle', 10, 0, 324, this, 2);//shooting 
            this.scene.time.delayedCall(300, () => {
                for (let i = 0; i < 6; i++) {
                    this.scene.time.delayedCall(i * 150, () => {
                        // ✅ Get a new bullet instance
                        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircle', 10, 0, 324, this, 2);//shooting 
                        this.scene.shootingLogic.fanShapedType_ToTarget('blueMediumCircle', 4,  15, this, rumia, 2)
                    });
                }

            }, [], this);//step2
            this.scene.time.delayedCall(1300, () => this.step +=1, [], this);//step2
        }else if(this.step == 7&&this.moveTo(650,320,2)){
            this.step +=1
            this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircle', 10, 0, 324, this, 2);//shooting 
            this.scene.time.delayedCall(300, () => {
                for (let i = 0; i < 6; i++) {
                    this.scene.time.delayedCall(i * 150, () => {
                        // ✅ Get a new bullet instance
                        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircle', 10, 0, 324, this, 2);//shooting 
                        this.scene.shootingLogic.fanShapedType_ToTarget('redMediumCircle', 4,  15, this, rumia, 2)
                    });
                }

            }, [], this);//step2
            this.scene.time.delayedCall(1300, () => this.step +=1, [], this);//step2
        }else if(this.step == 9){
            this.step +=1
            this.scene.time.delayedCall(1300, () => this.isDone = true, [], this);//step2
        }

    }
    r_bFr8_rFr8(){
        if( this.step == 0 &&this.moveTo(800,270,2) ){
            this.step +=1
            for (let i = 0; i < 66; i++) {
                this.scene.time.delayedCall(i * 320, () => {
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircle', 17, 0, 324, this, 1.5);//shooting 
                    this.scene.shootingLogic.randomfanShapedType_toDirection('redMediumCircle',8, 0, 324, this, 1.5);//shooting 
                });
            }
            this.scene.time.delayedCall(23100, () => this.isDone = true, [], this);//step2
        }
        
    }
    r_bFr12_rA12(){
        if( this.step == 0 &&this.moveTo(800,100,2) ){
            this.step +=1
            this.scene.shootingLogic.fanShapedType_ToTarget('redLongSemicircleBullet', 3,  2, this, rumia, 2)
            for (let i = 0; i < 6; i++) {
                this.scene.time.delayedCall(i * 250, () => {
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircle', 8, 0, 324, this, 2);//shooting 
                });
            }
        }
    }
    getBehavior(previous){
        return '';
    }

}