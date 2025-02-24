class LongSemicircleBullet extends Bullet {
    constructor(scene, x, y, target, speed = 2, subtype = 'bls') {
        let texture = '';
        let bulletType = '';

        if (subtype === 'bls') {
            texture = 'blueLongSemicircleBullet';
            bulletType = 'blueLongSemicircleBullet';
        } else if (subtype === 'rls') {
            texture = 'redLongSemicircleBullet';
            bulletType = 'redLongSemicircleBullet';
        }

        super(scene, x, y, texture, target, bulletType);

        // ✅ Set properties
        this.subtype = subtype;
        this.speed = speed;
        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        this.body.setVelocity(0, 0);
        this.body.setSize(30,17)
        this.setDepth(10);

        // ✅ If red, mark as non-reflectable
        if (subtype === 'rls') {
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