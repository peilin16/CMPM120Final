

class Kedama extends Character{
    constructor(scene, x, y, type, frame) {
        super(scene, x, y, 'Kedama','Kedama', frame)
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.isEmeny = true;
        this.isDrop = false;
        this.subType = 'Kedama-White'; 
        this.body.setSize(data.getData('kedama_width'), data.getData('kedama_height'), true); // Adjust hitbox size
        this.body.setOffset(0, 5); 
        this.Xspeed = data.getData('kedama_speed')
        this.ableToDefence = true; //decide the object able to defence
        this.isRebound = false; // if object in rebound state
        this.heigh = 45;
        this.width = 45;
    }

    update() {
        //super.update();
        if(this.healthly <= 0){
            this.dropOff();
        }
        if(!this.isDrop){
            if(this.behavior == 'l2'){
                this.l2();
            }else if(this.behavior == 'hp_3o6'){
                this.hp_3o6();
            }
        }
    }
    dropOff(){
        this.setTexture('KedamaHit');
        
        super.dropOff();
    }

    l2(){
        this.exitScreen('left',2)
    }
    hp_3o6(){
        if(this.step == 0) {
            if(this.moveToTarget(rumia,4.5,0 ) || rumia.isDrop || rumia.isHit)
                this.step +=1
        }
        if(this.step == 1)
            this.exitScreen('left')
    }

    
    collide(obj) {
        if(obj.type == 'player'){
            this.healthly -=5;
        }
    }
    reset(){
        this.x = game.config.width
    }
    
}