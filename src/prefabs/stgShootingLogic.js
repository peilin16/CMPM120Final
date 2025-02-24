//A TOOL class use to generate different shooting Type of Bullet

class stgShootingLogic{
    constructor(scene) {
        this.scene = scene; // Attach the scene
        scene.shootingLogic = this; // ✅ Allow direct access from any scene
    }
    // ✅ Attach to Phaser's scene system
    static install(scene) {
        scene.shootingLogic = new stgShootingLogic(scene);
    }




    //Basic bullet method
    
    // ✅ Shoots a bullet in a fixed direction
    NormalBullet(bulletType, angle,shooter,speed) {
            // ✅ Get a new bullet instance from `getBullet()`
        let bullet = this.getBullet(bulletType, shooter, speed);
        if (!bullet) return;

        // ✅ Convert angle (0° = left, 90° = up, 180° = right, 270° = down) to radians
        let angleRad = Phaser.Math.DegToRad(angle);

        // ✅ Calculate velocity based on the angle
        let velocityX = Math.cos(angleRad) * speed;
        let velocityY = Math.sin(angleRad) * speed;

        // ✅ Apply velocity to the bullet
        //bullet.body.setVelocity(velocityX, velocityY);
        bullet.vx = velocityX
        bullet.vy = velocityY
        // ✅ Add the bullet to the bullet group
        return bullet
    }

    sniperBullet(bulletType, shooter, target, speed, offset = 'No') {
        if (!target) return; // Ensure target exists
        let bullet = this.getBullet(bulletType, shooter, speed);
        // Calculate direction from bullet to target
        let direction = new Phaser.Math.Vector2(target.x - bullet.x, target.y - bullet.y).normalize();
    
        // ✅ Apply offset adjustments
        switch (offset) {
            case 'Top':
                direction.y -= 0.1; // Slightly move upward
                break;
            case 'Down':
                direction.y += 0.1; // Slightly move downward
                break;
        }
    
        direction.normalize(); // Re-normalize after applying offset
        bullet.vx = direction.x
        bullet.vy = direction.y
        return bullet
        // ✅ Set bullet velocity toward the target
       // bullet.body.setVelocity(direction.x * bullet.speed, direction.y * bullet.speed);
    }
    //setUp bullet
    getBullet(key, shooter, speed) {
        let bullet;
        switch (key) {
            case 'blueSmallCircle':
                bullet = new CircleBullet(this.scene, shooter.x, shooter.y, null, 'bs');
                break;
            case 'blueMediumCircle':
                bullet = new CircleBullet(this.scene, shooter.x, shooter.y, null, 'bm');
                break;
            case 'blueLargeCircle':
                bullet = new CircleBullet(this.scene, shooter.x, shooter.y, null, 'bl');
                break;
            case 'redSmallCircle':
                bullet = new CircleBullet(this.scene, shooter.x, shooter.y, null, 'rs');
                break;
            case 'redMediumCircle':
                bullet = new CircleBullet(this.scene, shooter.x, shooter.y, null, 'rm');
                break;
            case 'redLargeCircle':
                bullet = new CircleBullet(this.scene, shooter.x, shooter.y, null, 'rl');
                break;
            case 'blueCapsuleBullet':
                bullet = new CapsuleBullet(this.scene, shooter.x, shooter.y, null, 'bc');
                break;
            case 'redCapsuleBullet':
                bullet = new CapsuleBullet(this.scene, shooter.x, shooter.y, null, 'rc');
                break;
            case 'blueLongSemicircleBullet':
                bullet = new LongSemicircleBullet(this.scene, shooter.x, shooter.y, null, 'bls');
                break;
            case 'redLongSemicircleBullet':
                bullet = new LongSemicircleBullet(this.scene, shooter.x, shooter.y, null, 'rls');
                break;

            default:
                console.warn(`Unknown bullet key: ${key}`);
                return null;
        }
        //test
        //bullet.isRed = true;

        bullet.shooter = shooter;//set shooter
        bullet.speed = speed; // ✅ Assign custom speed
        this.scene.physics.add.overlap(rumia, bullet, (rumia, bullet) => {
            if (!rumia.isHit && !bullet.isReflected) { 
                this.scene.bulletCollision(rumia, bullet);
            }
        });
        return bullet;
    }

    //advanced bullet method
    listType_ToTarget(bulletType, num, sperate, shooter, target, speed, offset = 'No') { 
        for (let i = 0; i < num; i++) {
            this.scene.time.delayedCall(i * sperate, () => {
                // ✅ Get a new bullet instance
                let bullet =this.sniperBullet(bulletType, shooter, target, speed, offset); // ✅ Shoot at target with optional offset
                this.scene.bulletGroup.add(bullet);
                
            });
        }
    }
    listType_ToDirection(bulletType,num, sperateMinute, shooter ,angle,speed){
        for (let i = 0; i < num; i++) {
            this.scene.time.delayedCall(i * sperateMinute, () => {
                this.scene.bulletGroup.add(bullet);
                let bullet = this.NormalBullet(bulletType, angle, shooter, speed);
                this.scene.bulletGroup.add(bullet);
            });
        }
    }

    fanShapedType_ToDirection(bulletType, num, angleStart, angleEnd, shooter, speed) {
        // ✅ If only one bullet, place it at the center of the range
        if (num === 1) {
            this.NormalBullet(bulletType, (angleStart + angleEnd) / 2, shooter, speed);
            return;
        }
    
        // ✅ Calculate the angle step to evenly distribute bullets
        let angleStep = (angleEnd - angleStart) / (num - 1);
    
        for (let i = 0; i < num; i++) {
            let angle = angleStart + i * angleStep; // ✅ Calculate each bullet's angle
            let bullet = this.NormalBullet(bulletType, angle, shooter, speed); // ✅ Shoot each bullet
            this.scene.bulletGroup.add(bullet);
        }
    }

    fanShapedType_ToTarget(bulletType, num, target, offsetAngle, shooter, speed) {
        if (!target) return;

        // ✅ Calculate the central angle to the target
        let centerAngle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(shooter.x, shooter.y, target.x, target.y));
    
        let angles = [];
    
        if (num === 1) {
            angles.push(centerAngle); // ✅ If only 1 bullet, shoot directly at the target
        } else {
            let step = (offsetAngle * 2) / (num - 1); // ✅ Step size for bullet spread
    
            for (let i = 0; i < num; i++) {
                let angle = centerAngle - offsetAngle + (i * step); // ✅ Distribute evenly
                angles.push(angle);
            }
        }
    
        // ✅ Fire bullets at calculated angles
        angles.forEach(angle => {
            //let bullet = this.getBullet(bulletType, shooter, speed);
            
            let bullet
            if (num === 1) {
                bullet = this.sniperBullet(bulletType, shooter, target, speed); // ✅ Single bullet directly at target
            } else {
                bullet = this.NormalBullet(bulletType, angle, shooter, speed); // ✅ Fan-shaped bullets
            }
            this.scene.bulletGroup.add(bullet);
        });
    }

    
    rightArrowSniperType_ToTarget(bullet,num,target){
        let middle = Math.floor(num / 2);

        for (let i = 0; i < num; i++) {
            this.scene.time.delayedCall(i * 100, () => { // Slight delay for each bullet
                let offsetY = (i - middle) * 10; // Space between bullets
                this.scene.bulletGroup.add(bullet);
                this.sniperBullet(bullet, target);
            });
        }
    }
    leftArrowSniperType_ToTarget(bullet,num, target){
        let middle = Math.floor(num / 2);

        for (let i = 0; i < num; i++) {
            this.scene.time.delayedCall(i * 100, () => { // Slight delay for each bullet
                let offsetY = (middle - i) * 10; // Space between bullets
                this.scene.bulletGroup.add(bullet);
                this.sniperBullet(bullet, target);
            });
        }
    }

    //special bullet method
    
}

Phaser.Scene.prototype.shootingLogic = null;
Phaser.Scene.prototype.installShootingLogic = function () {
    stgShootingLogic.install(this);
};