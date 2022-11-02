import Phaser from "phaser";
import Jugador from "./jugador";

export class Escenario2 extends Phaser.Scene {

  constructor() {
    super("Escenario2");
  }

  preload() {
    this.load.tilemapTiledJSON("map1", "assets/tilemaps/esc2.json");
    this.load.image("tilesBelow1", "assets/images/fondonoche - atlas.png");
    this.load.image(
      "tilesPlatform1",
      "assets/images/plataforma noche - atlas.png"
    );
  }
  init(data) {
    this.distancia = data.distancia;
    this.distancia2 = data.distancia2;
    this.turno = data.turno;
    this.movimiento = data.movimiento;
    this.contar = data.contar;
    //this.audio2=data.audio2;
  }
  create() {
    //this.audio3 = this.sound.add('theme3', {loop: true});
    //this.audio3.play();

    const map1 = this.make.tilemap({ key: "map1" });

    const tilesetBelow1 = map1.addTilesetImage(
      "fondonoche - atlas",
      "tilesBelow1"
    );

    const tilesetPlatform1 = map1.addTilesetImage(
      "plataforma noche - atlas",
      "tilesPlatform1"
    );

    const belowLayer = map1.createLayer("Fondo", tilesetBelow1, 0, 0);
    const worldLayer = map1.createLayer("Plataformas", tilesetPlatform1, 0, 0);
    const objectsLayer = map1.getObjectLayer("Objetos");

    worldLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map1.findObject("Objetos", (obj) => obj.name === "dude");

    this.player = new Jugador(this, spawnPoint.x, spawnPoint.y, "dude2");

    this.player.correr();  

    this.isJumping = false;

    const spawnPoint2 = map1.findObject(
      "Objetos",
      (obj) => obj.name === "final"
    );
    this.final = this.physics.add.sprite(
      spawnPoint2.x,
      spawnPoint2.y,
      "banderaEsc"
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.tachos = this.physics.add.group();
    this.gatos = this.physics.add.group();

    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "tacho": {
          this.tacho = this.tachos.create(x, y, "tacho");

          break;
        }
        case "gato": {
          this.gato = this.gatos.create(x, y, "gato");

          break;
        }
      }
    });

    this.count = 0;
    
    this.physics.add.collider(this.player, worldLayer);
    this.physics.add.collider(this.tachos, worldLayer);
    this.physics.add.collider(this.gatos, worldLayer);
    this.physics.add.collider(this.final, worldLayer);

    this.physics.add.overlap(this.player, this.tachos, this.hitTacho, null, this);
    this.physics.add.overlap(this.player, this.gatos, this.hitGato, null, this);
    this.physics.add.overlap(this.player, this.final, this.hitFinal, null, this);

    this.player.vida();

    this.gameOver = false;

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.cameras.main.setZoom(1.5);

    this.cameras.main.setBounds(0, 0, 3200, 960);
  }

  hitTacho(player, tacho) {
    this.tacho.destroy();
    this.count = this.count + 1;
    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play("jump2");

    setTimeout(() => {
      this.physics.resume();

      this.player.clearTint();

      this.player.anims.play("run2");

      this.player.perderVida();
    }, 900);
  }

  hitGato(player, gato) {
    this.gato.destroy();
    this.count = this.count + 1;

    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play("jump2");

    setTimeout(() => {
      this.physics.resume();

      this.player.clearTint();

      this.player.anims.play("run2");

      this.player.perderVida();
    }, 900);
  }

  hitFinal(player, final) {

    this.physics.pause();
    this.player.anims.play("jump2");
    let victory = this.add.image(
      this.cameras.main.midPoint.x - 6,
      this.cameras.main.midPoint.y - 45,
      "victoria2"
    );
    let boton = this.add
      .image(
        this.cameras.main.midPoint.x - 19,
        this.cameras.main.midPoint.y + 118,
        "botone2"
      )
      .setInteractive()

      .on("pointerdown", () => {
        /* this.audio3.stop()
        this.audio2.play() */
        this.scene.start("Tablero", {
          distancia: this.distancia,
          distancia2: this.distancia2,
          turno: this.turno,
          movimiento: 1,
          //audio2: this.audio2,
          contar: this.contar,
        });
      })
      .on("pointerover", () => {
        boton.setScale(1.1);
      })

      .on("pointerout", () => {
        boton.setScale(1);
      });
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.saltar();
    } else {
      if (this.isJumping && this.player.body.blocked.down) {
        this.player.correr();
      }
    }

    if (this.count === 3) {
      this.player.muerte();
    }
  }
}
