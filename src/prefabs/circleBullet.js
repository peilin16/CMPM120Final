class CircleBullet extends Bullet {
    constructor(scene, x, y, target , speed = 2, subtype = 'bm') {
        if(subtype == 'bm'){
             super(scene, x, y, 'blueMediumCircleBullet',target,'blueMediumCircleBullet'); // Uses 'blueBullet' texture
             this.body.setCircle(10);
        }else if(subtype == 'bs'){
            super(scene, x, y, 'blueSmallCircleBullet',target,'blueSmallCircleBullet'); // Uses 'blueBullet' texture
            this.body.setCircle(5);
        }else if(subtype == 'bl'){
            super(scene, x, y, 'blueLargeCircleBullet',target,'blueLargeCircleBullet'); // Uses 'blueBullet' texture
            this.body.setCircle(15);
        }else if(subtype == 'rm'){
            super(scene, x, y, 'redMediumCircleBullet',target,'redMediumCircleBullet'); // Uses 'blueBullet' texture
            this.body.setCircle(10);
            this.isRed = true;
        }else if(subtype == 'rs'){
            super(scene, x, y, 'redSmallCircleBullet',target,'redSmallCircleBullet'); // Uses 'blueBullet' texture
            this.body.setCircle(5);
            this.isRed = true;
        }else if(subtype == 'rl'){
            super(scene, x, y, 'redLargeCircleBullet',target,'redLargeCircleBullet'); // Uses 'blueBullet' texture
            this.body.setCircle(15);
            this.isRed = true;
        }
        //this.target = target; // Set the target (Rumia)
        this.subtype = subtype
        //this.isRed = isRed;
        this.speed = speed;  
        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true); // ✅ Prevents movement from collisions
        this.body.setVelocity(0, 0);  // ✅ Ensures Rumia stays in place
        this.setDepth(10); // Ensure bullets are on top
        
    }

    moving() {
        //alert(super.target.x)
        if (this.target) {
            this.scene.physics.moveToObject(this, this.target, this.speed);
        }
    }

    
    



}