class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }
    preload() {
        //rumia load
        //this.load.image('rumiaStart', './assets/character/rumia1.png');
        this.load.image('rumiafly1', './assets/character/rumia-fly1.png');
        this.load.image('rumiafly2', './assets/character/rumia-fly2.png');
        this.load.image('rumiafly3', './assets/character/rumia-fly3.png');
        //hit
        this.load.image('rumiaflyhit', './assets/character/rumia-fly-hit.png');
        //defence
        this.load.image('rumiaDefence1', './assets/character/rumia-fly-defence1.png');
        this.load.image('rumiaDefence2', './assets/character/rumia-fly-defence2.png');
        this.load.image('rumiaDefence3', './assets/character/rumia-fly-defence3.png');
        this.load.image('rumiaDefence4', './assets/character/rumia-fly-defence4.png');
        //this.load.image('rumiaDefence5', './assets/img/rumia-defence5.png');
        // background load
        this.load.image('backgroundtop', './assets/img/background.png');
        this.load.image('backgrounddown', './assets/img/background-down.png');
        //state assets load
        this.load.image('tree1', './assets/img/tree1.png');
        this.load.image('snow1', './assets/img/snow1.png');
        this.load.image('snow2', './assets/img/snow2.png');
        this.load.image('snow3', './assets/img/snow3.png');

        //pill load
        this.load.image('Kedama', './assets/img/Pill.png');
        this.load.image('KedamaHit', './assets/img/Pill-hit.png');
        this.load.image('Kedama', './assets/img/PillRed.png');
        this.load.image('KedamaHit', './assets/img/PillRed-Hit.png');
        //Daiyousei load
        this.load.image('DaiyouseiNothing1', './assets/character/Daiyousei-nothing1.png');
        this.load.image('DaiyouseiNothing2', './assets/character/Daiyousei-nothing2.png');
        this.load.image('DaiyouseiScore1', './assets/character/Daiyousei-score1.png');
        this.load.image('DaiyouseiScore2', './assets/character/Daiyousei-score2.png');
        //flower fairy load
        this.load.image('sunflowerFairy1', './assets/img/sunflowerFairy1.png');
        this.load.image('sunflowerFairy2', './assets/img/sunflowerFairy2.png');
        this.load.image('sunflowerFairy3', './assets/img/sunflowerFairy3.png');
        this.load.image('sunflowerFairyHit', './assets/img/sunflowerFairy-hit1.png');
        
        
        //bullet load
        this.load.image('blueSmallCircleBullet','./assets/img/blueSmallCircleBullet.png');
        this.load.image('blueMediumCircleBullet','./assets/img/blueMediumCircleBullet.png');
        this.load.image('blueLargeCircleBullet','./assets/img/blueLargeCircleBullet.png');

        this.load.image('redCircleBullet','./assets/img/redCircleBullet.png');
        this.load.image('bug','./assets/img/bug.png');
        //test load
        //this.load.image('test',  'https://labs.phaser.io/assets/sprites/phaser3-logo.png');

        
        this.load.audio('hitHurt1', './assets/audio/hitHurt1.wav')
        this.load.audio('hitHurt2', './assets/audio/hitHurt2.wav')
        this.load.audio('hitHurt3', './assets/audio/hitHurt3.wav')
        this.load.audio('pickUp1', './assets/audio/pickupCoin.wav')
        this.load.audio('background', './assets/audio/background1.wav');
        
        this.load.image('explosionTexture', './assets/img/explosionTexture1.png');
        

    }
    create() {
        //alert('aaa')
        // check for local storage browser support
        // create anims rumia fly


        
        
        this.scene.start('titleScene');
    }
    update(){

    }
}