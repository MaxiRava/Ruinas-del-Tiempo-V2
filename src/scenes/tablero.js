import Phaser from "phaser";
import Jugador from "./jugador";
import Dado from "./dado";

export class Tablero extends Phaser.Scene {

  constructor() {
    super("Tablero");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "assets/tilemaps/tablero.json");
    this.load.image("tilesBelow", "assets/images/cueva-atlas.png");
    this.load.image("tilesPlatform", "assets/images/casilas atlas.png");
  }

  init(data) {
    this.distancia = data.distancia;
    this.distancia2 = data.distancia2;
    this.turno = data.turno;
    this.activo = data.activo;
    this.audio2 = data.audio2;
    this.movimiento = data.movimiento;
    this.contar = data.contar;
  }

  create() {
    this.gameOver = false;

    const map = this.make.tilemap({ key: "map" });

    const tilesetBelow = map.addTilesetImage("cueva-atlas", "tilesBelow");

    const tilesetPlatform = map.addTilesetImage(
      "casilas atlas",
      "tilesPlatform"
    );

    const belowLayer = map.createLayer("Fondo", tilesetBelow, 0, 0);
    const worldLayer = map.createLayer("Plataformas", tilesetPlatform, 0, 0);
    const objectsLayer = map.getObjectLayer("Objetos");

    worldLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map.findObject("Objetos", (obj) => obj.name === "final");
    this.final = this.physics.add.sprite(
      spawnPoint.x,
      spawnPoint.y,
      "banderaTablero"
    );

    // creacion del jugador y collides

    this.player2 = new Jugador(this, this.distancia2, 862.83, "prota2", 1);
    this.player = new Jugador(this, this.distancia, 862.83, "prota", 0);

    this.physics.add.collider(this.player, worldLayer);
    this.physics.add.collider(this.player2, worldLayer);
    this.physics.add.collider(this.final, worldLayer);

    this.physics.add.overlap(
      this.player,
      this.final,
      this.hitFinal,
      null,
      this
    );
    this.physics.add.overlap(
      this.player2,
      this.final,
      this.hitFinal2,
      null,
      this
    );

    if (this.turno === 0) {
      console.log("jugador a seguir 1");
      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
      this.player.setScale(1.1);
      this.letrero = "Turno Jugador 1";
      this.cara = "cara1";
    } else {
      console.log("jugador a seguir 2");
      this.cameras.main.startFollow(this.player2, true, 0.08, 0.08);
      this.player2.setScale(1.1);
      this.letrero = "Turno Jugador 2";
      this.cara = "cara2";
    }

    this.cameras.main.setZoom(2);

    this.cameras.main.setBounds(0, 0, 1952, 1080);

    //parlante distinto
    this.activo = true ? "music2" : "mute2";

    this.musica = this.add
      .image(1395, 310, this.activo)
      .setInteractive()

      .on("pointerdown", () => {
        this.activo = !this.activo;
        this.musica.setTexture(this.activo ? "music2" : "mute2");
      })

      .on("pointerover", () => {
        this.musica.setScale(1.1);
      })

      .on("pointerout", () => {
        this.musica.setScale(1);
      });

    this.musica.setScrollFactor(0);

    this.add.image(960, 320, "turnoJugador").setScrollFactor(0);
    this.pj = this.add.image(1150, 320, this.cara).setScrollFactor(0);
    this.cartelTurno = this.add.text(790, 290, this.letrero, {
      stroke: "black",
      strokeThickness: 5,
      fontSize: "50px Arial",
      fill: "white",
    });
    this.cartelTurno.setScrollFactor(0);

    this.dado = new Dado(this, 535, 320, "dado");
    this.dado.setScrollFactor(0);

    if (this.movimiento === 0) {
      this.dado.destroy();

      setTimeout(() => {
        this.scene.start("Cartas", {
          distancia: this.player.x,
          distancia2: this.player2.x,
          audio2: null,
          turno: this.turno,
          movimiento: 1,
          valor: this.valor,
        });
      }, 3000);
    }
  }
  cambiarLetreroJ1() {
    console.log("cambiarLetreroJ1", this.gameOver);
    if (!this.gameOver) {
      setTimeout(() => {
        this.letrero = "Turno Jugador 1";
        this.cartelTurno.setText(this.letrero);

        this.cara = "cara1";
        this.pj.setTexture(this.cara);

        this.cameras.main.startFollow(this.player);
        this.player.setScale(1.1);
      }, 5000);
    }
  }

  mostrarCartas() {
    if (!this.gameOver) {
      setTimeout(() => {
        this.scene.start("Cartas", {
          distancia: this.player.x,
          distancia2: this.player2.x,
          audio2: this.audio2,
          contar: this.contar,
          turno: 0,
          movimiento: 1,
          valor: this.valor,
        });
      }, 8000);
    }
  }

  cambiarLetreroJ2() {
    console.log("cambiarLetreroJ1", this.gameOver);
    if (!this.gameOver) {
      setTimeout(() => {
        this.letrero = "Turno Jugador 2";
        this.cartelTurno.setText(this.letrero);

        this.cara = "cara2";
        this.pj.setTexture(this.cara);

        this.cameras.main.startFollow(this.player2);
        this.player2.setScale(1.1);
      }, 5000);
    }
  }

  mostrarCartas2() {
    if (!this.gameOver) {
      setTimeout(() => {
        this.scene.start("Cartas", {
          distancia: this.player.x,
          distancia2: this.player2.x,
          audio2: this.audio2,
          contar: this.contar,
          turno: 1,
          movimiento: 1,
          valor: this.valor,
        });
      }, 8000);
    }
  }

  updateTexto() {
    this.valor = Phaser.Math.Between(1, 6);
  }

  hitFinal(player, final) {
    this.gameOver = true;
    this.physics.pause();
    this.cameras.main.startFollow(this.player);
    this.dado.destroy();
    this.musica.destroy();

    setTimeout(() => {
      this.cameras.main.stopFollow();
      this.add.image(
        this.cameras.main.midPoint.x,
        this.cameras.main.midPoint.y,
        "completo"
      );
      let otro = this.add
        .image(
          this.cameras.main.midPoint.x,
          this.cameras.main.midPoint.y,
          "botone"
        )
        .setInteractive()

        .on("pointerdown", () => {
          this.scene.start("Preloads");
        })

        .on("pointerover", () => {
          otro.setScale(1.1);
        })

        .on("pointerout", () => {
          otro.setScale(1);
        });
    }, 3000);
  }

  hitFinal2(player2, final) {
    this.gameOver = true;
    this.physics.pause();
    this.cameras.main.startFollow(this.player2);
    this.dado.destroy();
    this.musica.destroy();

    setTimeout(() => {
      this.cameras.main.stopFollow();

      this.add.image(
        this.cameras.main.midPoint.x,
        this.cameras.main.midPoint.y,
        "completo"
      );
      let otro = this.add
        .image(
          this.cameras.main.midPoint.x,
          this.cameras.main.midPoint.y,
          "botone"
        )
        .setInteractive()

        .on("pointerdown", () => {
          this.scene.start("Preloads");
        })

        .on("pointerover", () => {
          otro.setScale(1.1);
        })

        .on("pointerout", () => {
          otro.setScale(1);
        });
    }, 3000);
  }

  update() {}
}
