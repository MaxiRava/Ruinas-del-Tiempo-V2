import Phaser from "phaser";
import Parlante from "../objects/parlante";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { EN_US, ES_AR } from "../enums/languages";
import { getData } from "../services/firebase";
import { sharedInstance as events } from "../scenes/EventCenter";

export class MainMenu extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  #language;
  #parlante;

  constructor() {
    super("MainMenu");
  }

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
      this.cameras.main.centerX + 50,
      this.cameras.main.centerY - 210,
      "inicio"
    );

    //botones de traduccion

    let argentina = this.add
      .image(100, 100, "ARG")
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.getTranslations(ES_AR);
      })
      .on("pointerover", () => {
        argentina.setScale(1.1);
      })

      .on("pointerout", () => {
        argentina.setScale(1);
      });

    let ingles = this.add
      .image(200, 100, "ING")
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.getTranslations(EN_US);
      })
      .on("pointerover", () => {
        ingles.setScale(1.1);
      })

      .on("pointerout", () => {
        ingles.setScale(1);
      });

    //boton para ir a la siguente escena de juego

    this.BotonJugar = this.add
      .text(
        this.cameras.main.centerX - 140,
        this.cameras.main.centerY + 320,
        getPhrase("JUGAR"),
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
        this.scene.start("Instrucciones", {
          activo: this.activo,
          comienzo: this.comienzo,
        });
      })

      .on("pointerover", () => {
        this.BotonJugar.setScale(1.1);
      })

      .on("pointerout", () => {
        this.BotonJugar.setScale(1);
      });

    this.BotonCreditos = this.add
      .text(
        this.cameras.main.centerX - 190,
        this.cameras.main.centerY + 450,
        getPhrase("CREDITOS"),
        {
          fontFamily: "Fuente",
          stroke: "black",
          strokeThickness: 10,
          fontSize: "60px",
        }
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
        this.BotonCreditos.setScale(1.1);
      })

      .on("pointerout", () => {
        this.BotonCreditos.setScale(1);
      });

    this.activo ? "music" : "mute";
    this.#parlante = new Parlante(this, 1830, 80, this.activo);
    this.escena = 1;

    getData();
    events.on("dato-recibido", this.dato, this);
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
    
    this.BotonJugar.setText(getPhrase("JUGAR"));
    this.BotonCreditos.setText(getPhrase("CREDITOS"));
  }

  dato(data) {
    this.comienzo = data;
  }
}
