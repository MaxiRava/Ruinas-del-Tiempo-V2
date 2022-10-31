import Phaser from "phaser";

export class Cartas extends Phaser.Scene {
  constructor() {
    super("Cartas");
  }

  preload() {}

  init(data) {
    this.distancia = data.distancia;
    this.distancia2 = data.distancia2;
    this.contar = data.contar;
    this.audio2 = data.audio2;
    this.turno = data.turno;
    this.movimiento = data.movimiento;
  }
  create() {
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "cueva2"
    );

    this.add.image(
      this.cameras.main.centerX + 15,
      this.cameras.main.centerY - 140,
      "elegirCarta"
    );
    let texto = this.add.text(
      this.cameras.main.centerX - 180,
      this.cameras.main.centerY - 160,
      `Elige tu destino...`,
      {
        stroke: "black",
        strokeThickness: 5,
        fontSize: "54px Arial",
        fill: "white",
      }
    );

    let salvado = Phaser.Math.Between(1, 3);
    console.log(salvado);

     let card = this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY + 50, "carta")
      .setInteractive()

      .on("pointerdown", () => {
        if (salvado === 1) {
          texto.destroy();
          card.destroy();
          card2.destroy();
          card3.destroy();
          this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 50,
            "cartacorrer"
          );
          this.add.text(
            this.cameras.main.centerX - 230,
            this.cameras.main.centerY - 160,
            `Corre para sobrevivir`,
            {
              stroke: "black",
              strokeThickness: 5,
              fontSize: "54px Arial",
              fill: "white",
            }
          );
          setTimeout(() => {
            //this.audio2.stop();
            this.scene.start("Escenario1", {
              distancia: this.distancia,
              distancia2: this.distancia2,
              turno: this.turno,
              movimiento: this.movimiento,
              audio2: this.audio2,
              contar: this.contar,
            });
          }, 3000);
        }

        if (salvado === 2) {
          texto.destroy();
          card.destroy();
          card2.destroy();
          card3.destroy();
          this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 50,
            "cartabuena"
          );
          this.add.text(
            this.cameras.main.centerX - 240,
            this.cameras.main.centerY - 160,
            `La suerte te acompaña`,
            {
              stroke: "black",
              strokeThickness: 5,
              fontSize: "54px Arial",
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
              contar: this.contar,
            });
          }, 3000);
        }

        if (salvado === 3) {
          texto.destroy();
          card.destroy();
          card2.destroy();
          card3.destroy();
          this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 50,
            "cartacorrer"
          );
          this.add.text(
            this.cameras.main.centerX - 230,
            this.cameras.main.centerY - 160,
            `Corre para sobrevivir`,
            {
              stroke: "black",
              strokeThickness: 5,
              fontSize: "54px Arial",
              fill: "white",
            }
          );

          setTimeout(() => {
            this.scene.start("Escenario2", {
              distancia: this.distancia,
              distancia2: this.distancia2,
              turno: this.turno,
              movimiento: this.movimiento,
              audio2: this.audio2,
              contar: this.contar,
            });
          }, 3000);
        }
      })

      .on("pointerover", () => {
        card.setScale(1.1);
      })

      .on("pointerout", () => {
        card.setScale(1);
      });

    let card2 = this.add
      .image(
        this.cameras.main.centerX - 170,
        this.cameras.main.centerY + 50,
        "carta"
      )
      .setInteractive()

      .on("pointerdown", () => {
        if (salvado === 2) {
          texto.destroy();
          card.destroy();
          card2.destroy();
          card3.destroy();
          this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 50,
            "cartacorrer"
          );
          this.add.text(
            this.cameras.main.centerX - 230,
            this.cameras.main.centerY - 160,
            `Corre para sobrevivir`,
            {
              stroke: "black",
              strokeThickness: 5,
              fontSize: "54px Arial",
              fill: "white",
            }
          );

          setTimeout(() => {
            //this.audio2.stop();
            this.scene.start("Escenario2", {
              distancia: this.distancia,
              distancia2: this.distancia2,
              turno: this.turno,
              movimiento: this.movimiento,
              audio2: this.audio2,
              contar: this.contar,
            });
          }, 3000);
        }

        if (salvado === 1) {
          texto.destroy();
          card.destroy();
          card2.destroy();
          card3.destroy();
          this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 50,
            "cartabuena"
          );
          this.add.text(
            this.cameras.main.centerX - 240,
            this.cameras.main.centerY - 160,
            `La suerte te acompaña`,
            {
              stroke: "black",
              strokeThickness: 5,
              fontSize: "54px Arial",
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
              contar: this.contar,
            });
          }, 3000);
        }

        if (salvado === 3) {
          texto.destroy();
          card.destroy();
          card2.destroy();
          card3.destroy();
          this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 50,
            "cartacorrer"
          );
          this.add.text(
            this.cameras.main.centerX - 230,
            this.cameras.main.centerY - 160,
            `Corre para sobrevivir`,
            {
              stroke: "black",
              strokeThickness: 5,
              fontSize: "54px Arial",
              fill: "white",
            }
          );

          setTimeout(() => {
            this.scene.start("Escenario1", {
              distancia: this.distancia,
              distancia2: this.distancia2,
              turno: this.turno,
              movimiento: this.movimiento,
              audio2: this.audio2,
              contar: this.contar,
            });
          }, 3000);
        }
      })

      .on("pointerover", () => {
        card2.setScale(1.1);
      })

      .on("pointerout", () => {
        card2.setScale(1);
      });

    let card3 = this.add
      .image(
        this.cameras.main.centerX + 170,
        this.cameras.main.centerY + 50,
        "carta"
      )
      .setInteractive()

      .on("pointerdown", () => {
        if (salvado === 2) {
          texto.destroy();
          card.destroy();
          card2.destroy();
          card3.destroy();
          this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 50,
            "cartacorrer"
          );
          this.add.text(
            this.cameras.main.centerX - 230,
            this.cameras.main.centerY - 160,
            `Corre para sobrevivir`,
            {
              stroke: "black",
              strokeThickness: 5,
              fontSize: "54px Arial",
              fill: "white",
            }
          );

          setTimeout(() => {
            //this.audio2.stop();
            this.scene.start("Escenario1", {
              distancia: this.distancia,
              distancia2: this.distancia2,
              turno: this.turno,
              movimiento: this.movimiento,
              audio2: this.audio2,
              contar: this.contar,
            });
          }, 3000);
        }

        if (salvado === 1) {
          texto.destroy();
          card.destroy();
          card2.destroy();
          card3.destroy();
          this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 50,
            "cartacorrer"
          );
          this.add.text(
            this.cameras.main.centerX - 230,
            this.cameras.main.centerY - 160,
            `Corre para sobrevivir`,
            {
              stroke: "black",
              strokeThickness: 5,
              fontSize: "54px Arial",
              fill: "white",
            }
          );

          setTimeout(() => {
            this.scene.start("Escenario2", {
              distancia: this.distancia,
              distancia2: this.distancia2,
              turno: this.turno,
              movimiento: this.movimiento,
              audio2: this.audio2,
              contar: this.contar,
            });
          }, 3000);
        }
        
        if (salvado === 3) {
          texto.destroy();
          card.destroy();
          card2.destroy();
          card3.destroy();
          this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 50,
            "cartabuena"
          );
          this.add.text(
            this.cameras.main.centerX - 240,
            this.cameras.main.centerY - 160,
            `La suerte te acompaña`,
            {
              stroke: "black",
              strokeThickness: 5,
              fontSize: "54px Arial",
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
              contar: this.contar,
            });
          }, 3000);
        }
      })

      .on("pointerover", () => {
        card3.setScale(1.1);
      })

      .on("pointerout", () => {
        card3.setScale(1);
      });

    this.cameras.main.setZoom(2.5);
  }

  update() {}
}
