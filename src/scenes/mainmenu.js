import Phaser from "phaser";
import Parlante from "../objects/parlante";

export class MainMenu extends Phaser.Scene {
  #parlante;

  constructor() {
    super("MainMenu");
  }

  init(data) {
    this.audio = data.audio;
    this.activo = data.activo;
  }

  create() {
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "cuevaInicio"
    );
    this.add.image(
      this.cameras.main.centerX + 50,
      this.cameras.main.centerY - 210,
      "inicio"
    );

    this.botonJugar = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 320,
        "JUGAR",
        {
          fontFamily: "Fuente",
          stroke: "black",
          strokeThickness: 10,
          fontSize: "60px",
        }
      )
      .setInteractive()

      .on("pointerdown", () => {
        this.audio.stop();
        this.scene.start("Instrucciones", { activo: this.activo });
      })

      .on("pointerover", () => {
        this.botonJugar.setScale(1.1);
      })

      .on("pointerout", () => {
        this.botonJugar.setScale(1);
      });

    this.creditos = this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 450,
        "creditos"
      )
      .setInteractive()

      .on("pointerdown", () => {
        console.log("pointerdown", this.activo);

        this.scene.start("Creditos", {
          audio: this.audio,
          activo: this.activo,
        });
      })

      .on("pointerover", () => {
        this.creditos.setScale(1.1);
      })

      .on("pointerout", () => {
        this.creditos.setScale(1);
      });

    this.activo ? "music" : "mute";
    this.#parlante = new Parlante(this, 1830, 80, this.activo);

    this.escena = 1;
  }

  update() {
    this.activo = this.#parlante.activo;
  }
}
