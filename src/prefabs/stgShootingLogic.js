//A TOOL class use to generate different shooting Type of Bullet

class stgShootingLogic{

    //Basic bullet method
    // ✅ Shoots a bullet in a fixed direction
    NormalBullet(bullet, direction) {
        // Convert direction to a normalized vector
        let moveDirection = new Phaser.Math.Vector2(direction.x, direction.y).normalize();

        // Set bullet velocity
        bullet.body.setVelocity(moveDirection.x * bullet.speed, moveDirection.y * bullet.speed);
    }

    // ✅ Shoots a bullet toward a target (homing projectile)
    //offset [No,Top,Down]
    sniperBullet(bullet, target, offset = 'No' ) {
        if (!target) return; // Ensure target exists
        // Calculate direction from bullet to target
        let direction = new Phaser.Math.Vector2(target.x - bullet.x, target.y - bullet.y).normalize();

        // Set bullet velocity toward the target
        bullet.body.setVelocity(direction.x * bullet.speed, direction.y * bullet.speed);
    }
  

    //advanced bullet method



}