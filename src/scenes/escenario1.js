import Phaser from "phaser";
import Jugador from "./jugador";

export class Escenario1 extends Phaser.Scene {

  constructor() {
    super("Escenario1");
  }

  preload() {
    this.load.tilemapTiledJSON("map1", "assets/tilemaps/esc1.json");
    this.load.image("tilesBelow1", "assets/images/jungla-atlas.png");
    this.load.image("tilesPlatform1", "assets/images/plataforma.png");
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

    const tilesetBelow1 = map1.addTilesetImage("jungla-atlas", "tilesBelow1");

    const tilesetPlatform1 = map1.addTilesetImage(
      "plataforma",
      "tilesPlatform1"
    );

    const belowLayer = map1.createLayer("Fondo", tilesetBelow1, 0, 0);
    const worldLayer = map1.createLayer("Plataformas", tilesetPlatform1, 0, 0);
    const objectsLayer = map1.getObjectLayer("Objetos");

    worldLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map1.findObject("Objetos", (obj) => obj.name === "dude");

    this.player = new Jugador(this, spawnPoint.x, spawnPoint.y, "dude");
    this.player.correr();

    this.isJumping = false;

    const spawnPoint2 = map1.findObject(
      "Objetos",
      (obj) => obj.name === "final"
    );

    this.final = this.physics.add.sprite(spawnPoint2.x, spawnPoint2.y, "banderaEsc");

    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemys = this.physics.add.group();
    this.rooks = this.physics.add.group();
    this.snakes = this.physics.add.group();

    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "enemy": {
          const enemy = this.enemys.create(x, y, "roca");

          break;
        }
        case "snake": {
          const snake = this.snakes.create(x, y, "snake");

          break;
        }
        case "rook": {
          const rook = this.rooks.create(x, y, "roca2");

          break;
        }
      }
    });

    this.count = 0;
    

    this.physics.add.collider(this.player, worldLayer);
    this.physics.add.collider(this.enemys, worldLayer);
    this.physics.add.collider(this.rooks, worldLayer);
    this.physics.add.collider(this.snakes, worldLayer);
    this.physics.add.collider(this.final, worldLayer);

    this.physics.add.overlap(this.player, this.enemys, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.rooks, this.hitRook, null, this);
    this.physics.add.overlap(this.player, this.snakes, this.hitSnake, null, this);
    this.physics.add.overlap(this.player, this.final, this.hitFinal, null, this);

    this.texto2 = this.player.vida();

    this.gameOver = false;

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.cameras.main.setZoom(1.5);

    this.cameras.main.setBounds(0, 0, 3200, 960);

  }

  hitEnemy(player, enemy) {
    enemy.destroy();
    this.count = this.count + 1;
    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play("jump");

    setTimeout(() => {
      this.physics.resume();

      this.player.clearTint();

      this.player.anims.play("run");
      this.player.perderVida();

    }, 900);
  }

  hitRook(player, rook) {
    rook.destroy();
    this.count = this.count + 1;

    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play("jump");

    setTimeout(() => {
      this.physics.resume();

      this.player.clearTint();

      this.player.anims.play("run");
      this.player.perderVida();
   
    }, 900);
  }

  hitSnake(player, snake) {
    snake.destroy();
    this.count = this.count + 1;

    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play("jump");

    setTimeout(() => {
      this.physics.resume();

      this.player.clearTint();

      this.player.anims.play("run");
      this.player.perderVida();

    }, 900);
  }

  hitFinal(player, final) {

    this.physics.pause();
    this.player.anims.play("jump");
    let victory = this.add.image(
      this.cameras.main.midPoint.x - 6,
      this.cameras.main.midPoint.y,
      "victoria"
    );
    let boton = this.add
      .image(
        this.cameras.main.midPoint.x - 20,
        this.cameras.main.midPoint.y + 120,
        "botone"
      )
      .setInteractive()

      .on("pointerdown", () => {
        //this.audio3.stop()
        //this.audio2.play()
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
      if (this.player.isJumping && this.player.body.blocked.down) {
        this.player.correr();
      }
    }

    if (this.count === 3) {
      this.player.muerte();
    }
  }
}
