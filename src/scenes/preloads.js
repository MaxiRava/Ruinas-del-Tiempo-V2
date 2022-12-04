export class Preloads extends Phaser.Scene {
  constructor() {
    super("Preloads");
  }

  preload() {
    this.load.image("cuevaInicio", "assets/images/cuevaInicio.png");
    this.load.image("cuevaTablero", "assets/images/cuevaTablero.png");
    this.load.image("inicio", "assets/images/Ruinas_del_tiempo.png");
    //this.load.image("jugar", "assets/images/jugar.png");
    //this.load.image("creditos", "assets/images/credi.png");
    this.load.image("creditosMenu", "assets/images/pantallacreditos.png");
    this.load.image("music", "assets/images/sonido.png");
    this.load.image("mute", "assets/images/mute.png");
    this.load.image("music2", "assets/images/sonido2.png");
    this.load.image("mute2", "assets/images/mute2.png");
    this.load.image("botonRetroceso", "assets/images/retroceso.png");
    this.load.image("pantallaIntro", "assets/images/Intrucciones.png");
    //this.load.image("intro", "assets/images/saltar intro.png");
    this.load.image("dado", "assets/images/dados.png");
    this.load.image("turnoJugador", "assets/images/turnoJugador.png");
    this.load.image("carta", "assets/images/carta.png");
    this.load.image("seleccionCarta", "assets/images/seleccionCarta.png");
    this.load.image("cara1", "assets/images/cara.png");
    this.load.image("cara2", "assets/images/cara2.png");
    this.load.image("cartaBuena", "assets/images/cartaBuena.png");
    this.load.image("cartaCorrer", "assets/images/cartaCorrer.png");
    this.load.image("juegoCompleto1", "assets/images/juegoCompletoJ1.png");
    this.load.image("juegoCompleto2", "assets/images/juegoCompletoJ2.png");
    this.load.image("ARG", "assets/images/ARGENTINA.png");
    this.load.image("ING", "assets/images/INGLES.png");
    this.load.image(
      "victoria",
      "assets/images/pop ups victoria derrota/vic.png"
    );
    this.load.image(
      "derrota",
      "assets/images/pop ups victoria derrota/der.png"
    );
    this.load.image(
      "victoria2",
      "assets/images/pop ups victoria derrota/vicc.png"
    );
    this.load.image(
      "derrota2",
      "assets/images/pop ups victoria derrota/derc.png"
    );
    this.load.image(
      "boton",
      "assets/images/pop ups victoria derrota/botonTablero.png"
    );
    this.load.image(
      "botonCiudad",
      "assets/images/pop ups victoria derrota/botonCiudad.png"
    );
    this.load.image(
      "botonJungla",
      "assets/images/pop ups victoria derrota/botonJungla.png"
    );
    this.load.image("banderaTablero", "assets/images/victoriaTablero.png");
    this.load.image("banderaJungla", "assets/images/victoriaJungla.png");
    this.load.image("banderaCiudad", "assets/images/victoriaCiudad.png");
    this.load.image("roca", "assets/images/piedras.png");
    this.load.image("roca2", "assets/images/piedras2.png");
    this.load.image("tacho", "assets/images/tacho.png");

    this.load.image("prota", "assets/images/prota.png");
    this.load.image("prota2", "assets/images/prota2.png");

    this.load.spritesheet("snakeA", "assets/images/snakeA.png", {
      frameWidth: 80,
      frameHeight: 80,
    });

    this.load.spritesheet("gatoA", "assets/images/gatoA.png", {
      frameWidth: 56,
      frameHeight: 70,
    }); 

    this.load.spritesheet("explorador", "assets/images/personajeJunglaA.png", {
      frameWidth: 150,
      frameHeight: 155,
    });

    this.load.spritesheet("callejero", "assets/images/personajeCiudadA.png", {
      frameWidth: 116,
      frameHeight: 155,
    });

    this.load.audio("theme", "assets/sounds/musica.mp3");
    this.load.audio("theme2", "assets/sounds/tablero.mp3");
    this.load.audio("theme3", "assets/sounds/jungla.mp3");
    this.load.audio("theme4", "assets/sounds/noche.mp3");
  }

  create() {
    this.anims.create({
      key: "snakeAnimacion",
      frames: this.anims.generateFrameNumbers("snakeA", { start: 0, end: 2 }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "snakeStop",
      frames: [{ key: "skaneA", frame: 2 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "gatoAnimacion",
      frames: this.anims.generateFrameNumbers("gatoA", { start: 0, end: 2 }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "gatoStop",
      frames: [{ key: "gatoA", frame: 1 }],
      frameRate: 20,
    });
  
  
    this.audio = this.sound.add('theme', {loop: true});

    this.audio.play();

    this.scene.start("MainMenu", {
      distancia: 75,
      distancia2: 75,
      turno: 0,
      contar: 0,
      audio: this.audio,
    });
  }
}
