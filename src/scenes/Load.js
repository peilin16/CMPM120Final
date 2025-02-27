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
        this.load.image('rumiaflydown', './assets/character/rumia-fly-down.png');
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
        this.load.image('tree1', './assets/character/tree1.png');
        this.load.image('snow1', './assets/img/snow1.png');
        this.load.image('snow2', './assets/img/snow2.png');
        this.load.image('snow3', './assets/img/snow3.png');

        //pill load
        this.load.image('Kedama', './assets/img/Pill.png');
        this.load.image('KedamaHit', './assets/img/Pill-hit.png');
        this.load.image('KedamaRed', './assets/img/PillRed.png');
        this.load.image('KedamaRedHit', './assets/img/PillRed-Hit.png');
        //DivineSpiritBlue
        this.load.image('DivineSpiritBlue1', './assets/character/DivineSpiritBlue1.png');
        this.load.image('DivineSpiritBlue2', './assets/character/DivineSpiritBlue2.png');
        this.load.image('DivineSpiritBlue3', './assets/character/DivineSpiritBlue3.png');

        //Daiyousei load
        this.load.image('DaiyouseiNothing1', './assets/character/Daiyousei-nothing1.png');
        this.load.image('DaiyouseiNothing2', './assets/character/Daiyousei-nothing2.png');
        this.load.image('DaiyouseiScore1', './assets/character/Daiyousei-score1.png');
        this.load.image('DaiyouseiScore2', './assets/character/Daiyousei-score2.png');

        
//WriggleHit

        //flower fairy load
        this.load.image('sunflowerFairy1', './assets/character/sunflowerFairy1.png');
        this.load.image('sunflowerFairy2', './assets/character/sunflowerFairy2.png');
        this.load.image('sunflowerFairy3', './assets/character/sunflowerFairy3.png');
        this.load.image('sunflowerFairyHit', './assets/character/sunflowerFairy-hit1.png');
        
        this.load.image('dandelionFairy1', './assets/character/DandelionFairy1.png');
        this.load.image('dandelionFairy2', './assets/character/DandelionFairy2.png');
        this.load.image('dandelionFairy3', './assets/character/DandelionFairy3.png');
        this.load.image('dandelionFairyHit', './assets/character/DandelionFairy-hit.png');
        //maid fairy load
        this.load.image('MaidFairy1_1', './assets/character/MaidFairy1.png');
        this.load.image('MaidFairy1_2', './assets/character/MaidFairy2.png');
        this.load.image('MaidFairy1_3', './assets/character/MaidFairy3.png');
        this.load.image('MaidFairy1_Hit', './assets/character/MaidFairy1Hit.png');

        this.load.image('MaidFairy2_1', './assets/character/MaidFairy2_1.png');
        this.load.image('MaidFairy2_2', './assets/character/MaidFairy2_2.png');
        this.load.image('MaidFairy2_3', './assets/character/MaidFairy2_3.png');
        this.load.image('MaidFairy2_Hit', './assets/character/MaidFairy2_Hit.png');


        //boss load
        this.load.image('Wriggle1', './assets/character/Wriggle1.png');
        this.load.image('Wriggle2', './assets/character/Wriggle2.png');
        this.load.image('Wriggle3', './assets/character/Wriggle3.png');
        this.load.image('WriggleHit', './assets/character/WriggleHit.png');
        

        this.load.image('Crino1', './assets/character/crino-fly1.png');
        this.load.image('CrinoFront', './assets/character/crino.png');
        this.load.image('CrinoHit', './assets/character/CrinoHit.png');
        
        
        
        
        
        
        //bullet load
        this.load.image('blueSmallCircleBullet','./assets/img/blueSmallCircleBullet.png');
        this.load.image('blueMediumCircleBullet','./assets/img/blueMediumCircleBullet.png');
        this.load.image('blueLargeCircleBullet','./assets/img/blueLargeCircleBullet.png');
        
        this.load.image('redSmallCircleBullet','./assets/img/redSmallCircleBullet.png');
        this.load.image('redMediumCircleBullet','./assets/img/redMediumCircleBullet.png');
        this.load.image('redLargeCircleBullet','./assets/img/redLargeCircleBullet.png');

        this.load.image('blueCapsuleBullet','./assets/img/blueCapsuleBullet.png');
        this.load.image('redCapsuleBullet','./assets/img/redCapsuleBullet.png');

        this.load.image('blueLongSemicircleBullet','./assets/img/blueLongSemicircleBullet.png');
        this.load.image('redLongSemicircleBullet','./assets/img/redLongSemicircleBullet.png');
        this.load.image('redExtremeLongSemicircleBullet','./assets/img/redExtremeLongSemicircleBullet.png');
        
        this.load.image('blueArrowBullet','./assets/img/blueArrowBullet.png');
        this.load.image('redArrowBullet','./assets/img/redArrowBullet.png');
        this.load.image('bug','./assets/img/bug.png');
        this.load.image('ice','./assets/img/ice.png');
        this.load.image('iceTop','./assets/img/iceTop.png');
        //element load
        this.load.image('score','./assets/img/score.png');
        //test load
        //this.load.image('test',  'https://labs.phaser.io/assets/sprites/phaser3-logo.png');
//ExplosionSmall1_1
        this.load.image('ExplosionSmall1_1','./assets/img/ExplosionSmall1_1.png');
        this.load.image('ExplosionSmall1_2','./assets/img/ExplosionSmall1_2.png');
        this.load.image('ExplosionSmall1_3','./assets/img/ExplosionSmall1_3.png');
        this.load.image('ExplosionSmall1_4','./assets/img/ExplosionSmall1_4.png');
        this.load.image('ExplosionSmall1_5','./assets/img/ExplosionSmall1_5.png');
        this.load.image('ExplosionSmall1_6','./assets/img/ExplosionSmall1_6.png');
        this.load.image('ExplosionSmall1_7','./assets/img/ExplosionSmall1_7.png');

        this.load.image('ExplosionSmall2_1','./assets/img/ExplosionSmall2_1.png');
        this.load.image('ExplosionSmall2_2','./assets/img/ExplosionSmall2_2.png');
        this.load.image('ExplosionSmall2_3','./assets/img/ExplosionSmall2_3.png');
        this.load.image('ExplosionSmall2_4','./assets/img/ExplosionSmall2_4.png');
        this.load.image('ExplosionSmall2_5','./assets/img/ExplosionSmall2_5.png');
        this.load.image('ExplosionSmall2_6','./assets/img/ExplosionSmall2_6.png');
        this.load.image('ExplosionSmall2_7','./assets/img/ExplosionSmall2_7.png');

        this.load.image('ExplosionLarge1_1','./assets/img/ExplosionLarge1_1.png');
        this.load.image('ExplosionLarge1_2','./assets/img/ExplosionLarge1_2.png');
        this.load.image('ExplosionLarge1_3','./assets/img/ExplosionLarge1_3.png');
        this.load.image('ExplosionLarge1_4','./assets/img/ExplosionLarge1_4.png');
        this.load.image('ExplosionLarge1_5','./assets/img/ExplosionLarge1_5.png');
        this.load.image('ExplosionLarge1_6','./assets/img/ExplosionLarge1_6.png');
        this.load.image('ExplosionLarge1_7','./assets/img/ExplosionLarge1_7.png');
        this.load.image('ExplosionLarge1_8','./assets/img/ExplosionLarge1_8.png');

        this.load.audio('hitHurt1', './assets/audio/hitHurt1.wav');
        this.load.audio('hitHurt2', './assets/audio/hitHurt2.wav');
        this.load.audio('hitHurt3', './assets/audio/hitHurt3.wav');
        this.load.audio('pickUp1', './assets/audio/pickupCoin.wav');
        this.load.audio('background', './assets/audio/background1.wav');
        
        this.load.image('explosionTexture', './assets/img/explosionTexture1.png');
        
        
    }
    create() {

        //alert('aaa')
        // check for local storage browser support
        // create anims rumia fly
        //shootingLogic = new stgShootingLogic();
        
        
        
        this.scene.start('titleScene');
    }
    update(){

    }
}