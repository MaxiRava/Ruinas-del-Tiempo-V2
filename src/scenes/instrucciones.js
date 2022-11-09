import Phaser from "phaser";
import Parlante from "../objects/parlante";

export class Instrucciones extends Phaser.Scene {

  #parlante;

  constructor() {
    super("Instrucciones");
  }

  init(data) {
    this.activo = data.activo;
    console.log(data);
  }

  create() {
    this.audio2 = this.sound.add("theme2", { loop: true });
    this.audio2.play();

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
    this.intro = this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 470,
        "intro",
      )

      .setInteractive()

      .on("pointerdown", () => {
        if (this.activo) {
          this.activo2 = "music2";
        }else{
          this.activo2 = "mute2";
        }
        this.scene.start("Tablero", {
          distancia: 75,
          distancia2: 65,
          turno: 0,
          movimiento: 0,
          activo2: this.activo2,
          audio2: this.audio2,
        });
      })

      .on("pointerover", () => {
        this.intro.setScale(1.1);
      })

      .on("pointerout", () => {
        this.intro.setScale(1);
      });

    this.#parlante = new Parlante(this, 1830, 80, this.activo);

    if (this.#parlante.activo) {
      console.log("🚀 ~ file: mainmenu.js ~ line 96 ~ MainMenu ~ create ~ this.#parlante", this.#parlante)
      this.audio2.play()
    } 

    this.escena = 2;
  }

  update() {
    this.activo = this.#parlante.activo;

    if (!this.activo) {
      this.audio2.pause();
    }
  }
}
