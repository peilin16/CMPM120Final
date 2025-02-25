class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        // Background color (optional)
        this.cameras.main.setBackgroundColor('#000'); // Black background
//
        // Game title
        this.add.text(game.config.width / 2, 150, "Final ", {
            fontSize: '48px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(game.config.width / 2, 230, "Author:Peilin Huang ", {
            fontSize: '38px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);
        // Display current score (Global score variable from main.js)
        this.add.text(game.config.width / 2, 350, `Score: ${score}`, {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#FFFF00', // Yellow
            align: 'center'
        }).setOrigin(0.5);

        // Instructions
        this.add.text(game.config.width / 2, 400, "Press SPACE to Start", {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // Capture SPACE key
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Check if SPACE is pressed → Start the game
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            score = 0;
            ScoreRate = 1;
            this.scene.start('level1Scene'); // Start the Play scene
        }
    }
}