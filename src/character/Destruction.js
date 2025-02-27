class Destruction extends Character {
    constructor(scene, x, y,subtype , frame) {
        if(subtype == 'ice'){
            super(scene, x, y, 'ice', frame)
            
            this.healthly = 60;
            this.body.setSize(data.getData('ice_width') , data.getData('ice_height'), true); // Adjust hitbox size
            this.body.setOffset(0, 2); 
            //this.speed = data.getData('sunflowerFairy_speed') 
        }else if(subtype == 'iceTop'){
            super(scene, x, y, 'iceTop', frame)
            
            this.healthly = 60;
            this.body.setSize(data.getData('ice_height') , data.getData('ice_width'), true); // Adjust hitbox size
            this.body.setOffset(0, 2); 
            //this.speed = data.getData('sunflowerFairy_speed') 
        }
        this.subtype = subtype
        this.type = 'distruction'
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.healthly = 55;
        this.isDrop = false;
        this.kind = 'f'
        //this.speed = emenySpeed; 
        this.master;
        this.ableToDefence = false; 
        this.isEmeny = true;
    }
    update() {
        super.update();
        if(this.isDrop)
            return
        let posX
        let posY
        switch(this.behavior){
            case 'iceSelfDestructX1':
                posX= [950,900,800,750,600]
                this.iceSelfDestructBulletX(posX);
                break;
            case 'iceSelfDestructX2':
                posX= [980,890,800,780,690]
                this.iceSelfDestructBulletX(posX);
                break;
            case 'iceSelfDestructX3':
                posX= [750,690,600,570,500]
                this.iceSelfDestructBulletX(posX);
                break;    
            case 'iceSelfDestructY1':
                posX= [90,190,280,400,500]
                this.iceSelfDestructBulletY(posX);
                break;
            case 'iceSelfDestructY2':
                posX= [160,290,300,440,590]
                this.iceSelfDestructBulletY(posX);
                break;
            case 'iceSelfDestructY3':
                posX = [140,300,390,440,510]
                this.iceSelfDestructBulletY(posX);
                break;
            case 'iceSelfDestructY4':
                posX = [500, 400, 280, 190, 90];
                this.iceSelfDestructBulletY(posX);
                break;
            case 'iceSelfDestructY5':
                posX = [590, 440, 300, 290, 160];
                this.iceSelfDestructBulletY(posX);
                break;
            case 'iceSelfDestructY6':
                posX = [520, 450, 400, 300, 140];
                this.iceSelfDestructBulletY(posX);
                break;   
        }
        
    }
    iceSelfDestructBulletX(posX){
        if( this.step == 0 &&this.moveTo(posX[0], -1, 3) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueCapsuleBullet', 17, 0, 324, this ,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_130'));//shooting 
        }else if( this.step == 1 &&this.moveTo(posX[1], -1, 3) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueCapsuleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_150'));//shooting 
        }else if( this.step == 2 &&this.moveTo(posX[2], -1, 3) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('redCapsuleBullet', 15, 0, 324,  this,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_150'));//shooting 
        }else if( this.step == 3 &&this.moveTo(posX[3], -1, 3) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('redCapsuleBullet', 12, 0, 324,  this,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_150'));//shooting 
        }else if( this.step == 4 &&this.moveTo(posX[4], -1, 3) ){
            this.step +=1;
            this.healthly = 0;
        }
    }
    iceSelfDestructBulletY(posY){
        if( this.step == 0 &&this.moveTo(-1, posY[0], 3) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueCapsuleBullet', 17, 0, 324, this ,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_130'));//shooting 
        }else if( this.step == 1 &&this.moveTo(-1, posY[1], 3) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueCapsuleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_150'));//shooting 
        }else if( this.step == 2 &&this.moveTo(-1, posY[2], 3) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('redCapsuleBullet', 15, 0, 324,  this,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_150'));//shooting 
        }else if( this.step == 3 &&this.moveTo(-1, posY[3], 3) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('redCapsuleBullet', 12, 0, 324,  this,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_150'));//shooting 
        }else if( this.step == 4 &&this.moveTo(-1, posY[4], 3) ){
            this.step +=1;
            this.healthly = 0;
        }
    }
    dropOff(){
        switch(this.behavior){
            case 'iceSelfDestructX1':
            case 'iceSelfDestructX2':
            case 'iceSelfDestructX3':
            case 'iceSelfDestructY1':
            case 'iceSelfDestructY2':
            case 'iceSelfDestructY3':
            case 'iceSelfDestructY4':
            case 'iceSelfDestructY5':
            case 'iceSelfDestructY6':            
                this.iceSelfDestruct();
                break;
            
        }
        super.destoryCharacter();
    }
    iceSelfDestruct(){
        new Explosion(this.scene, this.x, this.y, 'Large');
        this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324, this ,data.getData('Bullet_speed_120'));//shooting 
        this.scene.shootingLogic.randomfanShapedType_toDirection('blueCapsuleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_130'));//shooting 
        this.scene.shootingLogic.randomfanShapedType_toDirection('redCapsuleBullet', 9, 0, 324, this ,data.getData('Bullet_speed_150'));//shooting 
        this.scene.shootingLogic.randomfanShapedType_toDirection('redLongSemicircleBullet', 5, 0, 324, this ,data.getData('Bullet_speed_180'));//shooting 
    }
    moving() {
        if (this.target) {
            this.scene.physics.moveToObject(this, this.target, this.speed);
        }
    }
}