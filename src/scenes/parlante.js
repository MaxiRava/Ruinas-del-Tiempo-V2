class Parlante extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, activo = true) {
    super(scene, x, y, activo ? "music" : "mute");

    this.scene = scene;

    this.activo = activo;

    scene.add.existing(this);

    this.setInteractive()
      .on("pointerdown", () => {
        if (this.activo && this.scene.escena === 1) {
          this.scene.audio.pause();
        }else{
          if (!this.activo && this.scene.escena === 1) {
            this.scene.audio.resume();
          }
        }

        if (this.activo && this.scene.escena === 2) {
          this.scene.audio2.pause();
        }else{
          if (!this.activo && this.scene.escena === 2) {
            this.scene.audio2.resume();
          }
        }

        this.activo = !this.activo;

        this.setTexture(this.activo ? "music" : "mute");
      })

      .on("pointerover", () => {
        this.setScale(1.1);
      })

      .on("pointerout", () => {
        this.setScale(1);
      });
  }
}

export default Parlante;
