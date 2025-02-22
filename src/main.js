//  
//  
//  
// Barrier prefab adapted from Travis Faas, An Introduction to HTML5 Game Development with Phaser.js (2017)
// Original: 4/20/17 (Phaser CE version)
// Updated: 5/1/23 (Phaser 3.55)

// define globals
let boardwidth = 1040;
let boardheigh = 600;
// define and configure main Phaser game object

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: boardheigh,
    width: boardwidth,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, Title, Mainlevel,Level1]
}

// uncomment the following line if you need to purge local storage data
//localStorage.clear();
let data = new dataRecord();
let score = 0;
let ScoreRate = 1;
let treeSpeed = 2;
let keyA,keyS,keyD,keyW,keyK,keyJ,keyShift,keyESC,keySpace
let emenySpeed = 3;
let shootingLogic // tool class
let rumia
// define game
let game = new Phaser.Game(config);




