import Phaser from 'phaser'

import {Cartas} from './scenes/cartas'
import {Creditos} from './scenes/creditos'
import {Escenario1} from './scenes/escenario1'
import {Escenario2} from './scenes/escenario2'
import {Instrucciones} from './scenes/instrucciones'
import {MainMenu} from './scenes/mainmenu'
import {Preloads} from './scenes/preloads'
import {Tablero} from './scenes/tablero'


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
	scene: [Preloads, MainMenu, Instrucciones, Escenario1, Escenario2, Tablero, Cartas, Creditos]
}

export default new Phaser.Game(config)

