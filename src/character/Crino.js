class Crino extends Character{
    constructor(scene, x, y,subtype , frame) {
        super(scene, x, y, 'Crino1','Crino'); // Start with the first texture
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('Crino_width'), data.getData('Crino_height'));
        
        this.subType = subtype;
        //this.anims.play('Wriggle1');
        super.healthly = 15;
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(5, 6);
        this.healthly = 1460;
        this.isDrop = false;
        this.isDestory = false;
        this.isEmeny = true;
        this.isDone = false;
        this.isFirst = true
        this.previousBehavior =this.behavior;
    }

    update(){
        super.update();
        if(this.isDrop)
            return

        if(this.isFirst){
            this.behavior = 'r_i1_f360'
            this.previousBehavior =this.behavior;
            if(this.moveTo(800,270,2))
                this.isFirst = false
            return;
        }
        else if(this.isDone){
            if(this.healthly <= 360)
                this.behavior = 'r_i2_f360'
            else
                this.behavior = this.getBehavior(this.previousBehavior);
            this.previousBehavior =this.behavior;
            this.step = 0;
        }
       
            
        



        this.isDone = false;

        switch(this.behavior){
            case 'r_sTf9_sTf8':
                this.r_sTf9_sTf8();
                break;
            case 'r_i1_f360':
                this.r_i1_f360();
                break;
            case 'r_bfr4_rfl4':
                this.r_bfr4_rfl4();
                break;
            case 'r_i2_f360':
                this.r_i2_f360();
                break;
        }
        

    }
    dropOff(){
        if(!this.isDrop){
            this.setTexture('CrinoHit');
            new Explosion(this.scene, this.x, this.y, 'Large');
            new Explosion(this.scene, this.x +20, this.y+20, 'Large');
            this.isDrop = true;
            this.scene.time.delayedCall(1000, () => {
                this.isDestory = true;
            }, [], this);//step2
        }
        if(this.isDestory){
            super.dropOff(1600,4,  1);
        }

        

        
    }
    getBehavior(previous) {
        

        let behaviors = ['r_sTf9_sTf8', 'r_bfr4_rfl4', 'r_i1_f360'];
        
        if (behaviors.length <= 1) return behaviors[0]; // ✅ Avoid infinite loops if only one element
    
        let newBehavior;
        
        do {
            newBehavior = Phaser.Math.RND.pick(behaviors); // ✅ Randomly select from the list
        } while (newBehavior === previous); // ✅ Ensure it's not the same as before

        return newBehavior;
    }
    r_sTf9_sTf8(){
        if( this.step == 0 &&this.moveTo(800,270,2) ){
            this.step +=1
            //(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter,speed)
            this.scene.shootingLogic.twirlFanType_ToDirection('blueMediumCircleBullet', 9, 0, 2060, 140, 4,10, 50,   this, data.getData('Bullet_speed_130'));//shooting 
            this.scene.time.delayedCall(1500, () => {
                this.scene.shootingLogic.twirlFanType_ToDirection('redMediumCircleBullet', 9, 0, 2060, 140, 4,10, 50,   this, data.getData('Bullet_speed_130'));//shooting 
            }, [], this);//step2
            this.scene.time.delayedCall(30800, () => this.isDone = true, [], this);//step2
        }
    }
    r_bfr4_rfl4(){
        if( this.step == 0 &&this.moveTo(800,270,5) ){
            this.r_bfr4_rfl4_help1()
        }else if( this.step == 2 &&this.moveTo(700,130,5) ){
            this.r_bfr4_rfl4_help1()
        }else if( this.step == 4 &&this.moveTo(700,530,5) ){
            this.r_bfr4_rfl4_help2()
        }else if( this.step == 6 &&this.moveTo(500,530,5) ){
            this.r_bfr4_rfl4_help1()
        }else if( this.step == 8 &&this.moveTo(640,430,5) ){
            this.r_bfr4_rfl4_help2()
        }else if( this.step == 10 &&this.moveTo(440,230,5) ){
            this.r_bfr4_rfl4_help1()
        }else if( this.step == 12 &&this.moveTo(600,330,5) ){
            this.r_bfr4_rfl4_help2()
        }else if( this.step == 14 &&this.moveTo(800,330,5) ){
            this.r_bfr4_rfl4_help1()
            this.scene.time.delayedCall(3000, () => this.isDone = true, [], this);//step2
        }

        
    }
    r_i1_f360(){
        if( this.step == 0 &&this.moveTo(800,270,5) ){
            this.setTexture('CrinoFront')
            // create a ice object
            this.step +=1
            let destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX1',440);
            destructionIce.master =this;
            //destructionIce.behavior = 'iceSelfDestruct1';
            this.scene.time.delayedCall(2400, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX3',170);
                destructionIce.master =this;
            }, [], this);//step2
            
            this.scene.time.delayedCall(5400, () => {

                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY1',-60, 620);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(8400, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY2',-60, 820);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(11400, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY1',-60, 920);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(14000, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX2',500);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(16000, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX1',300);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(18400, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY3',-60, 580);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(20400, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY2',-60, 900);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(23400, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX3',300);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(26400, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY2',-60, 720);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(30800, () =>{ this.setTexture('Crino1'); this.isDone = true}, [], this);//step2
        }
        

    }
    r_i2_f360(){
        if( this.step == 0 &&this.moveTo(690,270,5) ){
            this.setTexture('CrinoFront')
            // create a ice object
            this.step +=1
            let destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY4',660, 900);
            destructionIce.master =this;
            //destructionIce.behavior = 'iceSelfDestruct1';
            this.scene.time.delayedCall(2000, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX3',170);
                destructionIce.master =this;
            }, [], this);//step2
            
            this.scene.time.delayedCall(4800, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY1',-60, 620);
                destructionIce.master =this;
            }, [], this);//step2

            this.scene.time.delayedCall(7800, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY2',-60, 520);
                destructionIce.master =this;
            }, [], this);//step2
            
            this.scene.time.delayedCall(9800, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY6',660, 920);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(13600, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY5',660, 720);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(16800, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX2',420);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(19800, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX3',120);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(22000, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX1',220);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(24000, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY1',-60, 620);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(27000, () => {
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY5',660, 820);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(30800, () =>{ this.setTexture('Crino1'); this.isDone = true}, [], this);//step2
        }
    }

    r_bfr4_rfl4_help1(){
        this.step +=1
        //(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter,speed)
        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 20, 0, 324, this, data.getData('Bullet_speed_100'));//shooting 
        this.scene.time.delayedCall(300, () => {

            for (let i = 0; i < 5; i++) {
                this.scene.time.delayedCall(i * 90, () => {
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToTarget('redLongSemicircleBullet', 3,  10, this, rumia, data.getData('Bullet_speed_180'))
                });
            }

        }, [], this);//step2
        this.scene.time.delayedCall(1000, () => {
            this.scene.shootingLogic.fanShapedType_ToDirection('blueSmallCircleBullet', 20, 0, 324, this, data.getData('Bullet_speed_130'));//shooting 
        }, [], this);//step2
        this.scene.time.delayedCall(1400, () => {
            this.scene.shootingLogic.fanShapedType_ToDirection('redSmallCircleBullet', 16, 0, 324, this, data.getData('Bullet_speed_150'));//shooting 
        }, [], this);//step2
        this.scene.time.delayedCall(1600, () => this.step +=1, [], this);//step2
    }
    r_bfr4_rfl4_help2(){
        this.step +=1
        //(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter,speed)
        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 20, 0, 324, this, data.getData('Bullet_speed_100'));//shooting 
        this.scene.time.delayedCall(300, () => {

            for (let i = 0; i < 5; i++) {
                this.scene.time.delayedCall(i * 90, () => {
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToTarget('blueLongSemicircleBullet', 3,  10, this, rumia, data.getData('Bullet_speed_180'))
                });
            }

        }, [], this);//step2
        this.scene.time.delayedCall(1000, () => {
            this.scene.shootingLogic.fanShapedType_ToDirection('blueSmallCircleBullet', 20, 0, 324, this, data.getData('Bullet_speed_130'));//shooting 
        }, [], this);//step2
        this.scene.time.delayedCall(1400, () => {
            this.scene.shootingLogic.fanShapedType_ToDirection('redSmallCircleBullet', 16, 0, 324, this, data.getData('Bullet_speed_150'));//shooting 
        }, [], this);//step2
        this.scene.time.delayedCall(1600, () => this.step +=1, [], this);//step2
    }
}