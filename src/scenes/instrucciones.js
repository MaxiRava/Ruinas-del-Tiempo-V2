import Phaser from "phaser";
import Parlante from "./parlante";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";

export class Instrucciones extends Phaser.Scene {
  #parlante;
  #wasChangedLanguage = TODO;
  #language;
  constructor() {
    super("Instrucciones");
  }

  init(data) {
    this.activo = data.activo;
    console.log(data);
    this.#language = data.language;
    console.log(this.#language);
  }

  create() {
    const { width, height } = this.scale;
    const positionCenter = {
      x: width / 2,
      y: height / 2,
    };

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
      .text(
        this.cameras.main.centerX - 380,
        this.cameras.main.centerY + 440,
        getPhrase("SALTAR INTRODUCCIÓN"),
        {
          stroke: "black",
          strokeThickness: 6,
          fontSize: "70px Arial",
          fill: "white",
        }
      )

      .setInteractive()

      .on("pointerdown", () => {
        this.scene.start("Tablero", {
          distancia: 75,
          distancia2: 65,
          turno: 0,
          movimiento: 0,
          activo: this.activo,
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

  updateWasChangedLanguage = () => {
    this.#wasChangedLanguage = FETCHED;
  };

  async getTranslations(language) {
    this.#language = language;
    this.#wasChangedLanguage = FETCHING;

    await getTranslations(language, this.updateWasChangedLanguage);
  }

  update() {
    this.activo = this.#parlante.activo;

    if (!this.activo) {
      this.audio2.pause();
    }

    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
      this.intro.setText(getPhrase("SALTAR INTRODUCCIÓN"));
    }
  }
}
