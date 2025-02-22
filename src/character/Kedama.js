

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
        this.ableToDefence = true; //decide the object able to defence
        this.isRebound = false; // if object in rebound state
        this.heigh = 45;
        this.width = 45;
    }

    update() {
        this.moving();
    }
    dropOff(){
        this.setTexture('KedamaHit');
        super.dropOff();
    }

    moving(){
        this.x -= emenySpeed;
        if (this && this.x < -100) {
            this.destroy();
        }
        if (this && this.y > boardheigh + 60) {
            this.destroy();
        }
        if(this.isDrop){
            this.y += 3;
        }
    }
    collideToBullet(bullet){
        
    } 
    collide(obj) {
        if(obj.type == 'player'){
            this.dropOff();
        }
        
    }
    reset(){
        this.x = game.config.width
    }
    
}