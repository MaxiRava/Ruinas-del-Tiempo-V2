class Jugador extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, turno) {
    super(scene, x, y, texture, turno);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scene = scene;

    if (texture === "dude2") {

      this.run= "run2"
      this.jump= "jump2"

      this.texture,
        {
          frameWidth: 116,
          frameHeight: 155,
        };

      this.anims.create({
        key: "run2",
        frames: this.anims.generateFrameNumbers("dude2", { start: 0, end: 2 }),
        frameRate: 7,
        repeat: -1,
      });

      this.anims.create({
        key: "jump2",
        frames: [{ key: "dude2", frame: 3 }],
        frameRate: 20,
      });
      this.setCircle(50, 40, 40);
    }

      if (texture === "dude") {
        this.run= "run"
        this.jump= "jump"

        this.texture,
          {
            frameWidth: 150,
            frameHeight: 155,
          };
  
        this.anims.create({
          key: "run",
          frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 2 }),
          frameRate: 7,
          repeat: -1,
        });
  
        this.anims.create({
          key: "jump",
          frames: [{ key: "dude", frame: 1 }],
          frameRate: 20,
        });
      //this.anims.play("run");
      this.setCircle(50, 40, 40);
    }

    
    // or en if ( == || ==)
}
  saltar() {
    this.setVelocityY(-520);
    this.setVelocityX(200);
    this.anims.play(this.jump);
    this.isJumping = true;
  }

  correr() {
    this.anims.play(this.run);
    this.setVelocityX(100);
    this.isJumping = false;
  }

  vida(){
    this.number = 3;
    this.texto = this.scene.add.text(330, 200, `Vidas: ${this.number}`, {
      stroke: "black",
      strokeThickness: 5,
      fontSize: "54px Arial",
      fill: "white",
    });
    this.texto.setScrollFactor(0);
  }

  perderVida(){
    this.number = 3 - this.scene.count;
    this.texto.setText(`Vidas: ${this.number}`);
  }

  muerte(){
    setTimeout(() => {
      this.scene.gameOver = true;

      this.scene.cameras.main.stopFollow();
      this.scene.physics.pause();
      this.scene.player.setTint(0xff0000);
      this.scene.player.anims.play(this.jump);

      let derrota = this.scene.add.image(
        this.scene.cameras.main.midPoint.x,
        this.scene.cameras.main.midPoint.y,
        "derrota"
      );
      let boton = this.scene.add
        .image(
          this.scene.cameras.main.midPoint.x - 6,
          this.scene.cameras.main.midPoint.y + 120,
          "botone"
        )
        .setInteractive()
        .on("pointerdown", () => {
          //audio3.stop()
          //audio2.play()
          if (this.scene.turno === 1) {
            this.scene.turno = 0;
          } else {
            if (this.scene.turno === 0) {
              this.scene.turno = 1;
            }
          }
          //error
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
  
}

export default Jugador;
