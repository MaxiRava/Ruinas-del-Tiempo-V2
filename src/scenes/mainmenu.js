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
      "cueva"
    );
    this.add.image(
      this.cameras.main.centerX / 1,
      this.cameras.main.centerY / 1.8,
      "inicio"
    );

    this.Jugar = this.add
      .text(
        this.cameras.main.centerX - 210,
        this.cameras.main.centerY + 230,
        "JUGAR",
        {
          stroke: "black",
          strokeThickness: 6,
          fontSize: "100px Arial",
          fill: "white",
        }
      )
      .setInteractive()

      .on("pointerdown", () => {
        this.audio.stop();
        this.scene.start("Instrucciones", { activo: this.activo });
      })

      .on("pointerover", () => {
        this.Jugar.setScale(1.1);
      })

      .on("pointerout", () => {
        this.Jugar.setScale(1);
      });

    this.creditos = this.add
      .text(
        this.cameras.main.centerX - 210,
        this.cameras.main.centerY + 390,
        "CRÉDITOS",
        {
          stroke: "black",
          strokeThickness: 6,
          fontSize: "70px Arial",
          fill: "white",
        }
      )
      .setInteractive()

      .on("pointerdown", () => {
        console.log("pointerdown", this.activo);

        this.scene.start("Creditos", { audio: this.audio, activo: this.activo });
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
    this.activo=this.#parlante.activo
    
  }
}
