import Phaser from "phaser";
import Parlante from "../objects/parlante";

export class Creditos extends Phaser.Scene {
  #parlante;
  constructor() {
    super("Creditos");
  }

  preload() {}

  init(data) {
    this.audio = data.audio;
    this.activo = data.activo;
    console.log(data);
  }

  create() {
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "cuevaInicio"
    );
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "creditosMenu"
    );

    let retroceso = this.add
      .image(
        this.cameras.main.centerX / 1.372,
        this.cameras.main.centerY / 4.09,
        "botonRetroceso"
      )
      .setInteractive()

      .on("pointerdown", () => {
        this.scene.start("MainMenu", {
          audio: this.audio,
          activo: this.activo,
        });
      })

      .on("pointerover", () => {
        retroceso.setScale(1.1);
      })

      .on("pointerout", () => {
        retroceso.setScale(1);
      });

    console.log("parlante", this.activo);
    this.activo ? "music" : "mute";
    this.#parlante = new Parlante(this, 1830, 80, this.activo);
    this.escena = 1;
  }

  update() {
    this.activo = this.#parlante.activo;
  }
}

export default Creditos;
