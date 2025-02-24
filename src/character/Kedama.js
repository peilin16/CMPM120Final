

class Kedama extends Character{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture,'Kedama', frame)
        
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

        if(!this.isDrop)
            this.moving();
        if(this.healthly <= 0){
            this.dropOff();
        }
    }
    dropOff(){
        this.setTexture('KedamaHit');
        
        super.dropOff();
    }

    moving(){
       this.exitScreen('left',2)
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