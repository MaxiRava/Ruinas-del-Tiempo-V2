import Phaser from "phaser";
import Parlante from "./parlante";

export class Instrucciones extends Phaser.Scene {
  #parlante;
  constructor() {
    super("Instrucciones");
  }

  preload() {
    //imagenes
  }

  init(data) {
    this.contar = data.contar;
    this.activo = data.activo;
    console.log(data);
  }

  create() {
    //let audio2 = this.sound.add('theme2', {loop: true});
    //audio2.play();

    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "cueva2"
    );
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY / 1.1,
      "dale"
    );
    let intro = this.add
      .text(
        this.cameras.main.centerX- 380,
        this.cameras.main.centerY +440,
        "SALTAR INTRODUCCIÓN",
        {
          stroke: "black",
          strokeThickness: 6,
          fontSize: "70px Arial",
          fill: "white",
        })

      .setInteractive()

      .on("pointerdown", () => {
        this.scene.start("Tablero", {
          distancia: 75,
          distancia2: 65,
          turno: 0,
          movimiento: 0,
          contar: this.contar,
          activo: true,
        });
      })

      .on("pointerover", () => {
        intro.setScale(1.1);
      })

      .on("pointerout", () => {
        intro.setScale(1);
      });

    let iconoSonido = "music";

    if (this.contar === 1) {
      iconoSonido = "mute";
      //audio2.play();
      //audio2.pause();
    }

    this.#parlante = new Parlante(this, 1830, 80, this.activo);
  }

  update() {
    this.activo = this.#parlante.activo;
  }
}
