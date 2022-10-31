class Dado extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture = "dado") {
    super(scene, x, y, (texture = "dado"));

    scene.add.existing(this);

    this.setInteractive()

      .on("pointerdown", () => {
        scene.musica.destroy();
        this.destroy();
        scene.updateTexto();

        if (scene.turno === 0) {
          let number = scene.add.text(
            scene.cameras.main.midPoint.x,
            scene.cameras.main.midPoint.y - 100,
            scene.valor,
            {
              stroke: "black",
              strokeThickness: 5,
              fontSize: "75px Arial",
              fill: "white",
            }
          );
          setTimeout(() => {
            number.destroy();
            scene.player.setX(scene.distancia + 128 * scene.valor);
            scene.player.setScale(1);
            scene.turno === 1;
            setTimeout(() => {
              scene.cambiarLetreroJ2();
              scene.mostrarCartas2();
            }, 2000);
          }, 3000);
        }

        if (scene.turno === 1) {
          let number = scene.add.text(
            scene.cameras.main.midPoint.x,
            scene.cameras.main.midPoint.y - 100,
            scene.valor,
            {
              stroke: "black",
              strokeThickness: 5,
              fontSize: "75px Arial",
              fill: "white",
            }
          );

          setTimeout(() => {
            number.destroy();
            scene.player2.setX(scene.distancia2 + 128 * scene.valor);
            scene.player2.setScale(1);
            scene.turno === 0;
            setTimeout(() => {
              scene.cambiarLetreroJ1();
              scene.mostrarCartas();
            }, 2000);
          }, 3000);
        }
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
