class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture,target,type= 'blueSmallCircleBullet') {
        super(scene, x, y, texture);

        
        // Bullet properties
        this.type =type
        this.speed = 5; // Default speed
        this.isRed = false; // If the bullet has been deflected
        this.target = target; // Target for homing bullets
        this.ableToReflect = true;
        this.shooter = null; // Who shoot this bullet
        this.atk = 7;
        // Add to scene and enable physics
        this.vx = 0;
        this.vy = 0;
        //if rotate
        this.isTwirl = false;
        //toward
        //this.orientationX = 0;
        //this.orientationY = 0;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.isReflected = false
        //this.body.setSize(10, 10);
    }
    moving() {
       
    }
        // Bullet movement logic
    // Behavior when bullet interacts with an object
    behavior(obj) {
        if (obj.isdefence) {
            this.isAfterDefence = true;
            this.body.setVelocityY(-this.speed * 0.8);
            this.setTint(0x00ff00); // Change color to indicate deflection
        }
    }
    setOrientation( oX, oY){
        this.rotation = Phaser.Math.Angle.Between(0, 0, oX, oY);
    }
    reflect(normalX = 0, normalY = -1, rate = 30) {
        if (!this.isReflected) {
            this.isReflected = true; // ✅ Mark as reflected
            this.setTint(0x00ff00); // ✅ Change color to indicate deflection
    
            let randomChance = Phaser.Math.Between(0, 100);
    
            if (randomChance < rate) {
                this.targetReflect(); // ✅ Target reflection
            } else {
                this.normalReflect(normalX, normalY); // ✅ Normal reflection
            }

            this.scene.physics.world.colliders.getActive().forEach(collider => {
                if (collider.object1 === this && collider.object2 === rumia) {
                    collider.destroy(); // ✅ Remove collider so Rumia isn't hit again
                }
            });
            this.target = this.shooter;
            this.shooter = rumia;
        }
    }
    


    normalReflect(normalX = 0, normalY = -1) {
        let normalVector = new Phaser.Math.Vector2(normalX, normalY).normalize();
        let reflectedVelocity = new Phaser.Math.Vector2(this.vx, this.vy).reflect(normalVector);
    
        let angleVariation = Phaser.Math.Between(-10, 10); // ✅ Randomize reflection angle
        reflectedVelocity.rotate(Phaser.Math.DEG_TO_RAD * angleVariation);
    
        this.vx = reflectedVelocity.x;
        this.vy = reflectedVelocity.y;
    }

    targetReflect() {
        if (!this.shooter) {
            this.normalReflect(); // ✅ Default to normal reflection if no shooter exists
            return;
        }
        
        // ✅ Bounce back directly toward shooter
        let direction = new Phaser.Math.Vector2(this.shooter.x - this.x, this.shooter.y - this.y).normalize();
        this.vx = direction.x;
        this.vy = direction.y;
    }




    dropOff() {
        // Create explosion effect at the bullet's position
        /*
        let explosionEmitter = this.scene.add.particles('explosionTexture').createEmitter({
            x: this.x,
            y: this.y,
            speed: { min: -100, max: 100 },
            lifespan: 500, // How long the particles last
            scale: { start: 0.5, end: 0 }, // Particles shrink over time
            quantity: 10, // Number of particles
            blendMode: 'ADD' // Bright effect
        });
    
        // Stop and remove the explosion effect after 0.7 seconds
        this.scene.time.delayedCall(600, () => {
            explosionEmitter.stop();  
            explosionEmitter.manager.emitters.remove(explosionEmitter);  
        });*/
        this.destroy();
    }

    
    // Update function to remove bullets when they go off-screen
    update() {
        this.x +=this.vx * this.speed
        this.y +=this.vy * this.speed
        this.checkDestory();
    }
    checkDestory(){
        if (this.y < -50) {
            this.destroy();
        }
        else if (this.y > boardheigh + 100) {
            this.destroy();
        }
        else if (this.x < -50) {
            this.destroy();
        }
        else if (this.x > boardwidth + 100) {
            this.destroy();
        }
    }
}