class BlueCircleBullet extends Bullet {
    constructor(scene, x, y,target,type) {

        super(scene, x, y, 'blueSmallCircleBullet',target); // Uses 'blueBullet' texture
        //this.target = target; // Set the target (Rumia)
        this.speed = 80;  
        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true); // ✅ Prevents movement from collisions
        this.body.setVelocity(0, 0);  // ✅ Ensures Rumia stays in place
        this.setDepth(10); // Ensure bullets are on top
                // Adjust hitbox
        this.body.setCircle(5);
    }

    moving() {
        //alert(super.target.x)
        if (this.target) {
            this.scene.physics.moveToObject(this, this.target, this.speed);
        }
    }

    reflect(normalX = 0, normalY = -1) {
        if (!this.isReflected) {
            this.isReflected = true; // ✅ Mark as reflected
            this.setTint(0x00ff00); // ✅ Change color to indicate deflection
    
            // Get current velocity
            let velocityX = this.body.velocity.x;
            let velocityY = this.body.velocity.y;
    
            // ✅ Calculate reflection vector using Phaser’s built-in physics vector
            let normalVector = new Phaser.Math.Vector2(normalX, normalY).normalize();
            let reflectedVelocity = new Phaser.Math.Vector2(velocityX, velocityY).reflect(normalVector);
    
            // ✅ Introduce a slight variation to the reflection angle
            let angleVariation = Phaser.Math.Between(-15, 15); // Random angle variation in degrees
            reflectedVelocity.rotate(Phaser.Math.DEG_TO_RAD * angleVariation); // ✅ Apply variation
    
            // ✅ Apply the new velocity after reflection
            this.body.setVelocity(reflectedVelocity.x, reflectedVelocity.y);
    
            // ✅ Increase speed slightly after reflection
            this.body.velocity.scale(1.2); // Makes the bullet move slightly faster
    
            // ✅ Ensure it doesn't collide with Rumia again
            this.scene.physics.world.colliders.getActive().forEach(collider => {
                if (collider.object1 === this && collider.object2 === rumia) {
                    collider.destroy(); // ✅ Remove collider so Rumia isn't hit again
                }
            });
        }
    }
    



}