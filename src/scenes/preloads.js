export class Preloads extends Phaser.Scene {
  constructor() {
    super("Preloads");
  }

  preload() {
    this.load.image("cueva", "assets/images/cueva1.png");
    this.load.image("cueva2", "assets/images/cueva22.png");
    this.load.image("inicio", "assets/images/Ruinas_del_tiempo.png");
    this.load.image("jugar", "assets/images/jugar.png");
    this.load.image("creditos", "assets/images/credi.png");
    this.load.image("creditosMenu", "assets/images/Creditos.png");
    this.load.image("music", "assets/images/sonido.png");
    this.load.image("mute", "assets/images/sin sonido.png");
    this.load.image("music2", "assets/images/sonido2.png");
    this.load.image("mute2", "assets/images/sin sonido2.png");
    this.load.image("volver", "assets/images/retroceso.png");
    this.load.image("dale", "assets/images/Intrucciones.png");
    this.load.image("pantallaIntro", "assets/images/introduccion.png");
    this.load.image("intro", "assets/images/saltar intro.png");
    this.load.image("dado", "assets/images/dados.png");
    this.load.image("turnoJugador", "assets/images/Turno_jugador.png");
    this.load.image("carta", "assets/images/carta.png");
    this.load.image("elegirCarta", "assets/images/Elige_tu_destino.png");
    this.load.image("cara1", "assets/images/cara_de_costado.png");
    this.load.image("cara2", "assets/images/cara_2_de_costado.png");
    this.load.image("cartabuena", "assets/images/carta buena.png");
    this.load.image("cartacorrer", "assets/images/carta correr.png");
    this.load.image("juegoCompleto1", "assets/images/juegoCompletoJ1.png");
    this.load.image("juegoCompleto2", "assets/images/juegoCompletoJ2.png");
    this.load.image(
      "victoria",
      "assets/images/pop ups victoria derrota/Victoria Jungla.png"
    );
    this.load.image(
      "derrota",
      "assets/images/pop ups victoria derrota/Derrota Jungla.png"
    );
    this.load.image(
      "victoria2",
      "assets/images/pop ups victoria derrota/Victoria Ciudad.png"
    );
    this.load.image(
      "derrota2",
      "assets/images/pop ups victoria derrota/Derrota Ciudad.png"
    );
    this.load.image(
      "botone",
      "assets/images/pop ups victoria derrota/boton2.png"
    );
    this.load.image(
      "botone2",
      "assets/images/pop ups victoria derrota/boton_de_ciudad.png"
    );
    this.load.image(
      "Botonejungla",
      "assets/images/pop ups victoria derrota/boton_jungla.png"
    );
    this.load.image("banderaTablero", "assets/images/Victoria tablero.png");
    this.load.image("banderaEsc", "assets/images/Victoria jungla.png");
    this.load.image("banderaciudad", "assets/images/victoriaciudad.png");
    this.load.image("roca", "assets/images/PIEDRAS2.png");
    this.load.image("roca2", "assets/images/PIEDRAS3.png");
    this.load.image("tacho", "assets/images/tacho.png");
    this.load.image("snake", "assets/images/snake.png");
    this.load.image("gato", "assets/images/gato.png");

    this.load.image("prota", "assets/images/prota.png");
    this.load.image("prota2", "assets/images/prota2.png");

    this.load.spritesheet("dude", "assets/images/spritesheet (5).png", {
      frameWidth: 150,
      frameHeight: 155,
    });
    this.load.spritesheet("dude2", "assets/images/sheet.png", {
      frameWidth: 116,
      frameHeight: 155,
    });

    this.load.audio("theme", "assets/sounds/musica.mp3");
    this.load.audio("theme2", "assets/sounds/tablero.mp3");
    this.load.audio("theme3", "assets/sounds/jungla.mp3");
    this.load.audio("theme4", "assets/sounds/noche.mp3");
  }

  create() {
    this.audio = this.sound.add("theme", { loop: true });
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
