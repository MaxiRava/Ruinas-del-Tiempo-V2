import Phaser from "phaser";
import Jugador from "../objects/jugador";
import Dado from "../objects/dado";

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
    this.contar = data.contar;
    this.activo2 = data.activo2;
    this.audio2 = data.audio2;
    this.movimiento = data.movimiento;
    this.number = data.number;
    this.avance = data.avance;
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
    this.finalTablero = this.physics.add.sprite(
      spawnPoint.x,
      spawnPoint.y,
      "banderaTablero"
    );

    // creacion del jugador y collides

    this.player2 = new Jugador(this, this.distancia2, 862.83, "prota2", 1);
    this.player = new Jugador(this, this.distancia, 862.83, "prota", 0);

    this.avance = false;

    this.physics.add.collider(this.player, worldLayer);
    this.physics.add.collider(this.player2, worldLayer);
    this.physics.add.collider(this.finalTablero, worldLayer);

    this.physics.add.overlap(
      this.player,
      this.finalTablero,
      this.hitFinal,
      null,
      this
    );
    this.physics.add.overlap(
      this.player2,
      this.finalTablero,
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

    this.activo2 = "music2";
    if (!this.activo2) {
      this.activo2 = "mute2";
    }

    this.musica = this.add
      .image(1395, 310, this.activo2)
      .setInteractive()

      .on("pointerdown", () => {
        console.log(this.activo2);

        if (this.activo2) {
          this.audio2.pause();
        } else {
          if (!this.activo2) {
            this.audio2.resume();
          }
        }
        this.activo2 = !this.activo2;

        this.musica.setTexture(this.activo2 ? "music2" : "mute2");
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
          audio2: this.audio2,
          activo2: this.activo2,
          turno: this.turno,
          movimiento: 1,
        });
      }, 3000);
    }
  }

  cambiarLetreroJ1() {
    
    if (!this.gameOver) {
      setTimeout(() => {
        if (this.gameOver) {
          console.log("🚀 ~ file: tablero.js ~ line 168 ~ Tablero ~ setTimeout ~ this.gameOver", this.gameOver)
          return;
        }
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
        if (this.gameOver) {
          console.log("🚀 ~ file: tablero.js ~ line 189 ~ Tablero ~ setTimeout ~ this.gameOver", this.gameOver)
          return;
        }
        this.scene.start("Cartas", {
          distancia: this.player.x,
          distancia2: this.player2.x,
          audio2: this.audio2,
          activo2: this.activo2,
          turno: 0,
          movimiento: 1,
          valor: this.valor,
        });
      }, 8000);
    }
  }

  cambiarLetreroJ2() {
    

    setTimeout(() => {
      if (this.gameOver) {
        console.log("🚀 ~ file: tablero.js ~ line 210 ~ Tablero ~ setTimeout ~ this.gameOver", this.gameOver)
        return;
      }
      this.letrero = "Turno Jugador 2";
      this.cartelTurno.setText(this.letrero);

      this.cara = "cara2";
      this.pj.setTexture(this.cara);

      this.cameras.main.startFollow(this.player2);
      this.player2.setScale(1.1);
    }, 5000);
  }

  mostrarCartas2() {
    if (!this.gameOver) {
      setTimeout(() => {
        if (this.gameOver) {
          return;
        }
        this.scene.start("Cartas", {
          distancia: this.player.x,
          distancia2: this.player2.x,
          audio2: this.audio2,
          activo2: this.activo2,
          turno: 1,
          movimiento: 1,
          valor: this.valor,
        });
      }, 8000);
    }
  }

  updateTexto() {
    this.valor = Phaser.Math.Between(15, 15);
  }

  hitFinal(player, final) {
    this.gameOver = true;
    console.log("🚀 ~ file: tablero.js ~ line 233 ~ Tablero ~ hitFinal ~ this.gameOver", this.gameOver)
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
      console.log("🚀 ~ file: tablero.js ~ line 252 ~ Tablero ~ setTimeout ~ otro")
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
    this.gameOver === true;
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

  avanzar() {
    setTimeout(() => {
      this.number.destroy();
      if (this.turno === 0) {
        this.turno = 1;
        this.player.movimientoJ1();
        this.cambiarLetreroJ2();
        this.mostrarCartas2();
      } else {
        this.turno = 0;
        this.player.movimientoJ2();
        this.cambiarLetreroJ1();
        this.mostrarCartas();
      }
    }, 4000);
  }

  update() {}
}
