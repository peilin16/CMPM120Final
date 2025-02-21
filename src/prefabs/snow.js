class Snow extends Phaser.GameObjects.Sprite{
    constructor(scene) {
        // Pick a random X position within the screen width
        let x = Phaser.Math.Between(50, scene.physics.world.bounds.width + 130);
        let y = -50; // Start slightly above the screen

        // Randomly select one of the snow textures
        let snowTexture = Phaser.Utils.Array.GetRandom(['snow1', 'snow2', 'snow3']);

        super(scene, x, y, snowTexture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //this.setVelocityY(2); // Set falling speed

        this.setScale(Phaser.Math.FloatBetween(0.3, 1)); // Random scale for variety
        this.setAlpha(Phaser.Math.FloatBetween(0.5, 1)); // Random transparency

        // Destroy the snowflake when it moves off the screen
        
    }

    update() {
        this.y +=1;
        this.x -= 1;

    }
}