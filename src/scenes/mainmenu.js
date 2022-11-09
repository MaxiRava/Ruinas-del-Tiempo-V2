import Phaser from "phaser";
import Parlante from "./parlante";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";

export class MainMenu extends Phaser.Scene {
  #parlante;
  #wasChangedLanguage = TODO;
  #language;
  constructor() {
    super("MainMenu");
  }

  init(data) {
    this.audio = data.audio;
    this.activo = data.activo;
    console.log(data);
    this.#language = data.language;
  }

  create() {
    const { width, height } = this.scale;
    const positionCenter = {
      x: width / 2,
      y: height / 2,
    };

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
        getPhrase("JUGAR"),
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
        getPhrase("CRÉDITOS"),
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
      
    this.activo ? "music" : "mute"
    this.#parlante = new Parlante(this, 1830, 80, this.activo);

    this.escena = 1;

    const buttonEn = this.add
      .image(180, 80, "eng")
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.getTranslations("en-US");
      })
      .on("pointerover", () => {
        buttonEn.setScale(1.1);
      })

      .on("pointerout", () => {
        buttonEn.setScale(1);
      });

    const buttonEs = this.add
      .image(70, 80, "arg")
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.getTranslations("es-US");
      })
      .on("pointerover", () => {
        buttonEs.setScale(1.1);
      })

      .on("pointerout", () => {
        buttonEs.setScale(1);
      });
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
    
    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
      this.Jugar.setText(getPhrase("JUGAR"));
      this.creditos.setText(getPhrase("CRÉDITOS"));
    }
  }
}
