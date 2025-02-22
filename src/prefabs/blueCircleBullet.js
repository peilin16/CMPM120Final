class BlueCircleBullet extends Bullet {
    constructor(scene, x, y, target , speed = 80, isRed = false,subtype = 'm') {

        super(scene, x, y, 'blueSmallCircleBullet',target); // Uses 'blueBullet' texture
        //this.target = target; // Set the target (Rumia)
        this.subtype = subtype
        this.isRed = isRed;
        this.speed = speed;  
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

    
    



}