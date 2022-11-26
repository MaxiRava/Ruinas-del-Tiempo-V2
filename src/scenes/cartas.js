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
<<<<<<< HEAD
    console.log(data);
    this.#language = data.language;
    console.log(this.#language);
    
=======
>>>>>>> 42f5281dc6d38ffe96e35c5202623b05c50320c5
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

      this.Eligetudestino = this.add
    .text(
      this.cameras.main.centerX - 230,
      this.cameras.main.centerY - 160,
      getPhrase("Elige tu destino..."),
      {
        stroke: "black",
        strokeThickness: 6,
        fontSize: "45px Arial",
        fill: "white",
      }
    )

    let salvado = Phaser.Math.Between(1, 3);
    console.log(salvado);

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
    this.Eligetudestino.destroy();
    this.card.destroy();
    this.card2.destroy();
    this.card3.destroy();
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 50,
      "cartaBuena"
    );
  
      
      this.Lasuerteteacompaña = this.add
       .text(
      this.cameras.main.centerX - 230,
      this.cameras.main.centerY - 160,
      getPhrase("La suerte te acompaña"),
      {
        stroke: "black",
        strokeThickness: 6,
        fontSize: "54px Arial",
        fill: "white",
      }
    )
    
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
    this.Eligetudestino.destroy();
    this.card.destroy();
    this.card2.destroy();
    this.card3.destroy();
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 50,
      "cartaCorrer"
    );
    
      

      this.CorreparaSobrevivir = this.add
      .text(
        this.cameras.main.centerX - 230,
        this.cameras.main.centerY - 160,
        getPhrase("Corre para sobrevivir"),
        {
          stroke: "black",
          strokeThickness: 6,
          fontSize: "54px Arial",
          fill: "white",
        }
      )
      
    setTimeout(() => {
      this.audio2.stop();
      this.scene.start("Escenario1", {
        distancia: this.distancia,
        distancia2: this.distancia2,
        turno: this.turno,
        movimiento: this.movimiento,
        audio2: this.audio2,
        activo2: this.activo2,
      });
    }, 3000);
  }

  cartaNoche() {
    this.Eligetudestino.destroy();
    this.card.destroy();
    this.card2.destroy();
    this.card3.destroy();
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 50,
      "cartaCorrer"
    );
    
    this.CorreparaSobrevivir = this.add
    .text(
      this.cameras.main.centerX - 230,
      this.cameras.main.centerY - 160,
      getPhrase("Corre para sobrevivir"),
      {
        stroke: "black",
        strokeThickness: 6,
        fontSize: "54px Arial",
        fill: "white",
      }
    )

    setTimeout(() => {
      this.audio2.stop();
      this.scene.start("Escenario2", {
        distancia: this.distancia,
        distancia2: this.distancia2,
        turno: this.turno,
        movimiento: this.movimiento,
        audio2: this.audio2,
        activo2: this.activo2,
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
      this.Lasuerteteacompaña.setText(getPhrase("La suerte te acompaña"));
      this.CorreparaSobrevivir.setText(getPhrase("Corre para sobrevivir"));
     
      this.Eligetudestino .setText(getPhrase("Elige tu destino..."));
    }
  }
}
