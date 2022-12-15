import Phaser from "phaser";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";

export class Cartas extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  #language;
  constructor() {
    super("Cartas");
  }

  preload() {}

  init(data) {
    this.distancia = data.distancia;
    this.distancia2 = data.distancia2;
    this.audio2 = data.audio2;
    this.activo2 = data.activo2;
    this.turno = data.turno;
    this.movimiento = data.movimiento;
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
      "cuevaTablero"
    );

    this.add.image(
      this.cameras.main.centerX + 15,
      this.cameras.main.centerY - 140,
      "seleccionCarta"
    );

    this.TextoElige = this.add.text(
      this.cameras.main.centerX - 237,
      this.cameras.main.centerY - 138,
      getPhrase("Elige tu destino. . ."),
      {
        fontFamily: "Fuente",
        stroke: "black",
        strokeThickness: 6,
        fontSize: "23px",
        fill: "white",
      }
    );
    //aleatoriedad
    let salvado = Phaser.Math.Between(1, 3);

    this.card = this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY + 50, "carta")
      .setInteractive()

      .on("pointerdown", () => {
        if (salvado === 1) {
          this.cartaJungla();
        }

        if (salvado === 2) {
          this.cartaBuena();
        }

        if (salvado === 3) {
          this.cartaNoche();
        }
      })

      .on("pointerover", () => {
        this.card.setScale(1.1);
      })

      .on("pointerout", () => {
        this.card.setScale(1);
      });

    this.card2 = this.add
      .image(
        this.cameras.main.centerX - 170,
        this.cameras.main.centerY + 50,
        "carta"
      )
      .setInteractive()

      .on("pointerdown", () => {
        if (salvado === 2) {
          this.cartaNoche();
        }

        if (salvado === 1) {
          this.cartaBuena();
        }

        if (salvado === 3) {
          this.cartaJungla();
        }
      })

      .on("pointerover", () => {
        this.card2.setScale(1.1);
      })

      .on("pointerout", () => {
        this.card2.setScale(1);
      });

    this.card3 = this.add
      .image(
        this.cameras.main.centerX + 170,
        this.cameras.main.centerY + 50,
        "carta"
      )
      .setInteractive()

      .on("pointerdown", () => {
        if (salvado === 2) {
          this.cartaJungla();
        }

        if (salvado === 1) {
          this.cartaNoche();
        }

        if (salvado === 3) {
          this.cartaBuena();
        }
      })

      .on("pointerover", () => {
        this.card3.setScale(1.1);
      })

      .on("pointerout", () => {
        this.card3.setScale(1);
      });

    this.cameras.main.setZoom(2.5);
  }

  cartaBuena() {
    this.TextoElige.destroy();
    this.card.destroy();
    this.card2.destroy();
    this.card3.destroy();
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 50,
      "cartaBuena"
    );

    this.TextoCartaSuerte = this.add.text(
      this.cameras.main.centerX - 230,
      this.cameras.main.centerY - 140,
      getPhrase("La suerte te acompaña"),
      {
        fontFamily: "Fuente",
        stroke: "black",
        strokeThickness: 6,
        fontSize: "25px",
        fill: "white",
      }
    );

    setTimeout(() => {
      this.scene.start("Tablero", {
        distancia: this.distancia,
        distancia2: this.distancia2,
        turno: this.turno,
        movimiento: this.movimiento,
        audio2: this.audio2,
        activo2: this.activo2,
      });
    }, 3000);
  }

  cartaJungla() {
    this.TextoElige.destroy();
    this.card.destroy();
    this.card2.destroy();
    this.card3.destroy();
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 50,
      "cartaCorrer"
    );

    this.TextoCartaPeligro = this.add.text(
      this.cameras.main.centerX - 230,
      this.cameras.main.centerY - 138,
      getPhrase("Corre para sobrevivir"),
      {
        fontFamily: "Fuente",
        stroke: "black",
        strokeThickness: 6,
        fontSize: "26px",
        fill: "white",
      }
    );

    setTimeout(() => {
      this.audio2.stop();
      this.scene.start("Runner", {
        distancia: this.distancia,
        distancia2: this.distancia2,
        turno: this.turno,
        movimiento: this.movimiento,
        audio2: this.audio2,
        activo2: this.activo2,
        mapas: 1,
      });
    }, 3000);
  }

  cartaNoche() {
    this.TextoElige.destroy();
    this.card.destroy();
    this.card2.destroy();
    this.card3.destroy();
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 50,
      "cartaCorrer"
    );

    this.TextoCartaPeligro = this.add.text(
      this.cameras.main.centerX - 230,
      this.cameras.main.centerY - 138,
      getPhrase("Corre para sobrevivir"),
      {
        fontFamily: "Fuente",
        stroke: "black",
        strokeThickness: 6,
        fontSize: "26px",
        fill: "white",
      }
    );

    setTimeout(() => {
      this.audio2.stop();
      this.scene.start("Runner", {
        distancia: this.distancia,
        distancia2: this.distancia2,
        turno: this.turno,
        movimiento: this.movimiento,
        audio2: this.audio2,
        activo2: this.activo2,
        mapas: 2,
      });
    }, 3000);
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
      this.TextoCartaSuerte.setText(getPhrase("La suerte te acompaña"));
      this.TextoCartaPeligro.setText(getPhrase("Corre para sobrevivir"));
      this.TextoElige.setText(getPhrase("Elige tu destino. . ."));
    }
  }
}
