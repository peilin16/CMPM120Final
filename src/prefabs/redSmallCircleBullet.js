class RedSmallCircleBullet extends Bullet {
    constructor(scene, x, y, target) {
        super(scene, x, y, 'redBullet'); // Uses 'redBullet' texture
        this.target = target; // The target (e.g., `Rumia`)
        this.speed = 300;
    }

    moving() {
        if (this.isAfterDefence && this.target) {
            // If the bullet is deflected, home in on the target
            this.scene.physics.moveToObject(this, this.target, this.speed);
        } else {
            this.body.setVelocityY(-this.speed); // Move upwards normally
        }
    }
}