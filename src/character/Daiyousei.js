class Daiyousei extends Character{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        this.anims.create({
            key: 'DaiyouseiNothing',
            frames: [
                { key: 'DaiyouseiNothing1' },
                { key: 'DaiyouseiNothing2' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });

        this.anims.create({
            key: 'DaiyouseiScore',
            frames: [
                { key: 'DaiyouseiScore1' },
                { key: 'DaiyouseiScore2' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.play('DaiyouseiScore'); // Play the 'rumiaFly' animation

        
        this.isEmeny = false;
        this.isDrop = false;
        this.kind = 'd'
        this.Speed = -2.5;
        this.ableToDefence = false; 
        this.body.setSize(75, 75, true); // Adjust hitbox size
        this.body.setOffset(0, 5);  
    }
    update() {
        this.x -= 2;
        if(this.isTouch){
            this.y -= 1;
        }

        // Destroy when off-screen
        if (this.x < -100 || this.y > 700 || this.y < -50) {
            this.destroy();
        }
    }
    /*
    behavior(key){
        if(!this.isTouch){
            this.isTouch = true
            score += 20 + (ScoreRate * 10);
            ScoreRate += 1
        }
        
    }*/
    dropOff(){
        this.setTexture('DaiyouseiNothing1')
        this.anims.stop();
        this.play('DaiyouseiNothing'); // Play the 'rumiaFly' animation
    }
    collide(){
        
    }


}