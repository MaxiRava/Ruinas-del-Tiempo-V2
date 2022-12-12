import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
class Jugador extends Phaser.Physics.Arcade.Sprite {
  #wasChangedLanguage = TODO;
  #language;
  constructor(scene, x, y, texture, turno) {
    super(scene, x, y, texture, turno);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    if (texture === "prota" || texture === "prota2") {
      this.setCollideWorldBounds(true);
    }

    if (texture === "callejero") {
      this.run = "run2";
      this.jump = "jump2";
      this.derrota = "derrota2";
      this.boton = "botonCiudad";

      this.texture,
        {
          frameWidth: 116,
          frameHeight: 155,
        };

      this.anims.create({
        key: "run2",
        frames: this.anims.generateFrameNumbers("callejero", { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1,
      });

      this.anims.create({
        key: "jump2",
        frames: [{ key: "callejero", frame: 4 }],
        frameRate: 20,
      });
      this.setCircle(50, 10, 40);
    }

    if (texture === "explorador") {
      this.run = "run";
      this.jump = "jump";
      this.derrota = "derrota";
      this.boton = "botonJungla";

      this.texture,
        {
          frameWidth: 150,
          frameHeight: 155,
        };

      this.anims.create({
        key: "run",
        frames: this.anims.generateFrameNumbers("explorador", { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1,
      });

      this.anims.create({
        key: "jump",
        frames: [{ key: "explorador", frame: 1 }],
        frameRate: 20,
      });

      this.setCircle(50, 40, 40);
    }

    // or en if ( == || ==)
}

init(data){

  console.log(data);
  this.#language = data.language;
  console.log(this.#language);

}
create(){
  
    const { width, height } = this.scale;
    const positionCenter = {
      x: width / 2,
      y: height / 2,
    };
}

  saltar() {
    this.setVelocityY(-520);
    this.setVelocityX(120);
    this.anims.play(this.jump);
    this.isJumping = true;
  }

  correr() {
    this.anims.play(this.run);
    this.setVelocityX(100);
    this.isJumping = false;
  }

  vida() {
    this.number = 3;
    
    this.TextoVida = this.scene.add.text(330, 200, getPhrase(('Vidas: ')) + this.number , {
      fontFamily: "Fuente",
      stroke: "black",
      strokeThickness: 5,
      fontSize: "35px",
      fill: "white",
    });
    this.TextoVida.setScrollFactor(0);
  }


  perderVida(){
    this.number = 3 - this.scene.count;
    this.TextoVida.setText(getPhrase(('Vidas: ')) + this.number);
  }

  muerte() {
    setTimeout(() => {
      this.scene.gameOver = true;

      this.scene.cameras.main.stopFollow();
      this.scene.physics.pause();
      this.scene.player.setTint(0xff0000);
      this.scene.player.anims.play(this.jump);

      this.CartelDerrota = this.scene.add.image(
        this.scene.cameras.main.midPoint.x,
        this.scene.cameras.main.midPoint.y,
        this.derrota
      );

      this.TextoDerrota = this.scene.add.text(
        this.scene.cameras.main.midPoint.x - 180,
        this.scene.cameras.main.midPoint.y - 140,
        getPhrase('Derrota'), {
          fontFamily: "Fuente",
          stroke: "black",
          strokeThickness: 10,
          fontSize: "55px",
        }
      )
      let boton = this.scene.add
        .image(
          this.scene.cameras.main.midPoint.x - 6,
          this.scene.cameras.main.midPoint.y + 120,
          this.boton
        )
        .setInteractive()
        .on("pointerdown", () => {
          this.scene.audio2.play();
          if (this.scene.turno === 1) {
            this.scene.turno = 0;
          } else {
            if (this.scene.turno === 0) {
              this.scene.turno = 1;
            }
          }

          this.scene.scene.start("Tablero", {
            distancia: this.scene.distancia,
            distancia2: this.scene.distancia2,
            turno: this.scene.turno,
            movimiento: 0,
            audio2: this.scene.audio2,
            contar: this.scene.contar,
          });
        })
        .on("pointerover", () => {
          boton.setScale(1.1);
        })

        .on("pointerout", () => {
          boton.setScale(1);
        });
    }, 900);
  }

  movimientoJ1() {
    this.scene.player.setX(this.scene.distancia + 128 * this.scene.valor);
    this.scene.player.setScale(1);
  }

  movimientoJ2() {
    this.scene.player2.setX(this.scene.distancia2 + 128 * this.scene.valor);
    this.scene.player2.setScale(1);
  }
  updateWasChangedLanguage = () => {
    this.#wasChangedLanguage = FETCHED;
  };

  async getTranslations(language) {
    this.#language = language;
    this.#wasChangedLanguage = FETCHING;

    await getTranslations(language, this.updateWasChangedLanguage);
  }

  update(){
    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
      this.TextoVida.setText(getPhrase('Vidas: '));
      this.TextoDerrota.setText(getPhrase("Derrota"));
  }
  //https://labs.phaser.io/edit.html?src=src/game%20objects/text/align%20text.js&v=3.55.2
  //https://phaser.io/examples/v3/view/game-objects/text/word-wrap-by-width
}
}

export default Jugador;
