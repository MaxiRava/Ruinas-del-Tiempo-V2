class Dado extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture = "dado") {
    super(scene, x, y, (texture = "dado"));

    scene.add.existing(this);

    this.setInteractive()

      .on("pointerdown", () => {
        scene.musica.destroy();
        this.destroy();
        scene.updateTexto();

        scene.number = scene.add.text(
          scene.cameras.main.midPoint.x,
          scene.cameras.main.midPoint.y - 150,
          scene.valor,
          {
            stroke: "black",
            strokeThickness: 5,
            fontSize: "60px Arial",
            fill: "white",
          }
        );
        scene?.avanzar();
      })
      .on("pointerover", () => {
        this.setScale(1.1);
      })

      .on("pointerout", () => {
        this.setScale(1);
      });
  }
}

export default Dado;
