import Phaser from "phaser";
import Parlante from "../objects/parlante";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { EN_US, ES_AR } from '../enums/languages'

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
    this.comienzo = data.comienzo;
  }

  create() {
    this.audio2 = this.sound.add("theme2", { loop: true });
    this.audio2.play();

    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "cuevaTablero"
    );
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY / 1.1,
      "pantallaIntro"
    );
    this.texttablero = this.add
      .text(
        this.cameras.main.centerX - 180,
        this.cameras.main.centerY - 335,
        getPhrase('TABLERO'),
        {
          fontFamily: "Fuente",
          stroke: "white",
          fill: "black",
          strokeThickness: 5,
          fontSize: "55px",
        }
      )
      this.instrucciones= this.add
      .text(
        this.cameras.main.centerX - 275,
        this.cameras.main.centerY - 450,
        getPhrase('INSTRUCCIONES'),
        {
          fontFamily: "Fuente",
          stroke: "white",
          fill: "black",
          strokeThickness: 10,
          fontSize: "48px",
        }
      )
      this.textelegircarta = this.add
      .text(
        this.cameras.main.centerX - 180,
        this.cameras.main.centerY - 180,
        getPhrase('ELEGIR UNA CARTA'),
        {
          fontFamily: "Fuente",
          stroke: "black",
          strokeThickness: 10,
          fontSize: "29px",
        }
      )
      this.texttirardados = this.add
      .text(
        this.cameras.main.centerX - 180,
        this.cameras.main.centerY - 134,
        getPhrase('TIRAR DADOS'),
        {
          fontFamily: "Fuente",
          stroke: "black",
          strokeThickness: 10,
          fontSize: "29px",
        }
      )
      this.textteclado = this.add
      .text(
        this.cameras.main.centerX - 140,
        this.cameras.main.centerY + 60,
        getPhrase('TECLADO'),
        {
          fontFamily: "Fuente",
          stroke: "white",
          fill: "black",
          strokeThickness: 10,
          fontSize: "40px",
        }
      )
      this.textteclaparasaltar = this.add
      .text(
        this.cameras.main.centerX - 240,
        this.cameras.main.centerY + 125,
        getPhrase('TECLA PARA SALTAR'),
        {
          fontFamily: "Fuente",
          stroke: "black",
          strokeThickness: 10,
          fontSize: "31px",
        }
      )
      
    this.intro = this.add
      .text(
        this.cameras.main.centerX - 410,
        this.cameras.main.centerY + 430,
        getPhrase('SALTAR INTRODUCCION'),
        {
          fontFamily: "Fuente",
          stroke: "black",
          strokeThickness: 10,
          fontSize: "60px",
        }
      )
      .setInteractive()

      .on("pointerdown", () => {
        if (this.activo) {
          this.activo2 = "music2";
        } else {
          this.activo2 = "mute2";
        }
        this.scene.start("Tablero", {
          distancia: 75,
          distancia2: 65,
          turno: this.comienzo,
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
      this.audio2.play();
    }
    //this.escena = 2;
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
    this.intro.setText(getPhrase("SALTAR INTRODUCCION"));
    this.texttablero.setText(getPhrase("TABLERO"));
    this.instrucciones.setText(getPhrase("INSTRUCCIONES"));
    this.textelegircarta.setText(getPhrase("ELEGIR UNA CARTA"));
    this.texttirardados.setText(getPhrase("TIRAR DADOS"));
    this.textteclado.setText(getPhrase("TECLADO"));
    this.textteclaparasaltar.setText(getPhrase("TECLA PARA SALTAR"));
    if (!this.activo) {
      this.audio2.pause();
    }
  }
}
