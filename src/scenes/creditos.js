import Phaser from "phaser";
import Parlante from "../objects/parlante";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { EN_US, ES_AR } from '../enums/languages'

export class Creditos extends Phaser.Scene {
  #parlante;
  #wasChangedLanguage = TODO;
  #language;
  constructor() {
    super("Creditos");
  }

  preload() {}

  init(data) {
    this.audio = data.audio;
    this.activo = data.activo;
    this.#language = data.language;
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
   
      this.creditos = this.add
      .text(
        this.cameras.main.centerX - 250, 
        this.cameras.main.centerY - 370,
        getPhrase("CREDITOS"),
        {
          fontFamily: "Fuente",
          stroke: "white",
          fill: "black",
          strokeThickness: 10,
          fontSize: "75px",
        }
      )

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
    this.creditos.setText(getPhrase("CREDITOS"));
  }
}

export default Creditos;
