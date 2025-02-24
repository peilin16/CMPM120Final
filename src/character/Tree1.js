class Tree1 extends Character {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, 'tree1','tree', frame)
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.isEmeny = true;
        this.kind = 't'
        this.body.setSize(60, 160, true); // Adjust hitbox size
        this.body.setOffset(70, 65);  
        this.ableToDefence = false; 
    }

    update() {
        this.x += this.Xspeed;
        
        // Destroy tree when it moves off-screen
        if (this && this.x < -150) {
            this.destroy();
        }
    }
    dropOff(){
        //Nothing !
    }
    reset(){
        this.x = game.config.width
    }
}