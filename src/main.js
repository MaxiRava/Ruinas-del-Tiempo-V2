import Phaser from 'phaser';
import FirebasePlugin from 'phaser3-rex-plugins/plugins/firebase-plugin.js';


import {Preloads} from './scenes/preloads';
import {MainMenu} from './scenes/mainmenu';
import {Instrucciones} from './scenes/instrucciones';
import {Tablero} from './scenes/tablero';
import {Cartas} from './scenes/cartas';
import {Creditos} from './scenes/creditos';
import {Runner} from './scenes/runner';


const config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		min: {
			width: 800,
			height: 600,
		},
		max: {
			width: 1920,
			height: 1080,
		},
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 450 },
			debug: false,
		}
	},

	
	plugins: {
        global: [{
            key: 'rexFirebase',
            plugin: FirebasePlugin,
            start: true,
        }]
    },

	
	scene: [Preloads, MainMenu, Instrucciones, Tablero, Cartas, Creditos, Runner],
};

export default new Phaser.Game(config);

