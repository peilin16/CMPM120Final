class Bug extends Character {
    constructor(scene, x, y, target, speed = 2, subtype = 'bc') {
        let texture = '';
        let bulletType = '';

        if (subtype === 'bc') {
            texture = 'blueCapsuleBullet';
            bulletType = 'blueCapsuleBullet';
            
        } else if (subtype === 'rc') {
            texture = 'redCapsuleBullet';
            bulletType = 'redCapsuleBullet';
        }
        
        super(scene, x, y, texture, target, bulletType);

        // ✅ Set properties
        this.subtype = subtype;
        this.speed = speed;
        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        this.body.setVelocity(0, 0);
        this.body.setSize(27,15)
        this.setDepth(10);
        this.isTwirl = true;
        // ✅ If red, mark as non-reflectable
        if (subtype === 'rc') {
            this.isRed = true;
            this.ableToReflect = false;
        }
    }

    moving() {
        if (this.target) {
            this.scene.physics.moveToObject(this, this.target, this.speed);
        }
    }
}