import Phaser from "phaser";
import Jugador from "../objects/jugador";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";

export class Runner extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  #language;
  constructor() {
    super("Runner");
  }

  preload() {
    this.load.tilemapTiledJSON("map1", "assets/tilemaps/esc1.json");
    this.load.image("tilesBelow1", "assets/images/jungla-atlas.png");
    this.load.image("tilesPlatform1", "assets/images/plataforma.png");

    this.load.tilemapTiledJSON("map2", "assets/tilemaps/esc2.json");
    this.load.image("tilesBelow2", "assets/images/fondonoche - atlas.png");
    this.load.image(
      "tilesPlatform2",
      "assets/images/plataformas-ladrillos.png"
    );
  }

  init(data) {
    this.distancia = data.distancia;
    this.distancia2 = data.distancia2;
    this.turno = data.turno;
    this.movimiento = data.movimiento;
    this.activo2 = data.activo2;
    this.audio2 = data.audio2;
    this.#language = data.language;
    this.mapas = data.mapas;
  }

  create() {
    const { width, height } = this.scale;
    const positionCenter = {
      x: width / 2,
      y: height / 2,
    };

    if ((this.mapas === 1)) {
      this.run = "run";
      this.jump = "jump";

      this.audio = this.sound.add("theme3", { loop: true });
      this.audio.play();

      this.key = "map1";
      this.tilesBelows = "jungla-atlas", 
      this.tilesBelows1 = "tilesBelow1";
      this.tilesPlatform = "plataforma";
      this.tilesPlatform1 = "tilesPlatform1";
      this.jugador = "explorador";
      this.bandera = "banderaJungla";
      this.cartelVictoria = "victoria";
      this.aspectoBoton = "botonJungla";
    }

    if ((this.mapas === 2)) {
      this.run = "run2";
      this.jump = "jump2";

      this.audio = this.sound.add("theme4", { loop: true });
      this.audio.play();

      this.key = "map2";
      this.tilesBelows = "fondonoche - atlas";
      this.tilesBelows1= "tilesBelow2";
      this.tilesPlatform = "plataformas-ladrillos";
      this.tilesPlatform1= "tilesPlatform2";
      this.jugador = "callejero";
      this.bandera = "banderaCiudad";
      this.cartelVictoria = "victoria2";
      this.aspectoBoton = "botonCiudad";
    }

    const map = this.make.tilemap({ key: this.key });

    const tilesetBelow = map.addTilesetImage(this.tilesBelows, this.tilesBelows1);

    const tilesetPlatform = map.addTilesetImage(this.tilesPlatform, this.tilesPlatform1);

    const belowLayer = map.createLayer("Fondo", tilesetBelow, 0, 0);
    const worldLayer = map.createLayer("Plataformas", tilesetPlatform, 0, 0);
    const objectsLayer = map.getObjectLayer("Objetos");

    worldLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map.findObject("Objetos", (obj) => obj.name === "dude");

    this.player = new Jugador(this, spawnPoint.x, spawnPoint.y, this.jugador);
    this.player.correr();

    this.isJumping = false;

    const spawnPoint2 = map.findObject(
      "Objetos",
      (obj) => obj.name === "final"
    );

    this.final = this.physics.add.sprite(
      spawnPoint2.x,
      spawnPoint2.y,
      this.bandera
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemys = this.physics.add.group();
    this.rooks = this.physics.add.group();
    this.snakes = this.physics.add.group();
    this.tachos = this.physics.add.group();
    this.gatos = this.physics.add.group();

    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "enemy": {
          const enemy = this.enemys.create(x, y, "roca");

          break;
        }
        case "snake": {
          const snake = this.snakes.create(x, y, "snake");
          snake.play("snakeAnimacion");
          snake.setBodySize(80, 80);

          break;
        }
        case "rook": {
          const rook = this.rooks.create(x, y, "roca2");

          break;
        }
        case "tacho": {
          const tacho = this.tachos.create(x, y, "tacho");

          break;
        }
        case "gato": {
          const gato = this.gatos.create(x, y, "gato");
          gato.play("gatoAnimacion");
          gato.setBodySize(56, 70);

          break;
        }
      }
    });
    this.count = 0;

    this.physics.add.collider(this.player, worldLayer);
    this.physics.add.collider(this.enemys, worldLayer);
    this.physics.add.collider(this.rooks, worldLayer);
    this.physics.add.collider(this.snakes, worldLayer);
    this.physics.add.collider(this.tachos, worldLayer);
    this.physics.add.collider(this.gatos, worldLayer);
    this.physics.add.collider(this.final, worldLayer);

    this.physics.add.overlap(
      this.player,
      this.enemys,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(this.player, this.rooks, this.hitRook, null, this);
    this.physics.add.overlap(
      this.player,
      this.snakes,
      this.hitSnake,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.final,
      this.hitFinal,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.tachos,
      this.hitTacho,
      null,
      this
    );
    this.physics.add.overlap(this.player, this.gatos, this.hitGato, null, this);
    this.physics.add.overlap(
      this.player,
      this.final,
      this.hitFinal,
      null,
      this
    );

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

    this.player.anims.play(this.jump);

    setTimeout(() => {
      this.physics.resume();

      this.player.clearTint();

      this.player.anims.play(this.run);
      this.player.perderVida();
    }, 900);
  }

  hitRook(player, rook) {
    rook.destroy();
    this.count = this.count + 1;

    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play(this.jump);

    setTimeout(() => {
      this.physics.resume();

      this.player.clearTint();

      this.player.anims.play(this.run);
      this.player.perderVida();
    }, 900);
  }

  hitSnake(player, snake) {
    snake.destroy();
    this.count = this.count + 1;

    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play(this.jump);
    setTimeout(() => {
      this.physics.resume();

      this.player.clearTint();

      this.player.anims.play(this.run);
      this.player.perderVida();
    }, 900);
  }

  hitTacho(player, tacho) {
    tacho.destroy();
    this.count = this.count + 1;
    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play(this.jump);

    setTimeout(() => {
      this.physics.resume();

      this.player.clearTint();

      this.player.anims.play(this.run);

      this.player.perderVida();
    }, 900);
  }

  hitGato(player, gato) {
    gato.destroy();
    this.count = this.count + 1;

    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play(this.jump);

    setTimeout(() => {
      this.physics.resume();

      this.player.clearTint();

      this.player.anims.play(this.run);

      this.player.perderVida();
    }, 900);
  }

  hitFinal(player, final) {
    this.physics.pause();
    //this.snake.anims.play("snakeStop");
    player.anims.play(this.jump);

    let victoria = this.add.image(
      this.cameras.main.midPoint.x - 6,
      this.cameras.main.midPoint.y,
      this.cartelVictoria
    );

    this.TextoVictoria = this.add
    .text(
      this.cameras.main.midPoint.x - 180,
      this.cameras.main.midPoint.y - 145,
      getPhrase('Victoria'),
      {
        fontFamily: "Fuente",
          stroke: "black",
          strokeThickness: 10,
          fontSize: "55px",
      }
    );

    let boton = this.add
      .image(
        this.cameras.main.midPoint.x - 20,
        this.cameras.main.midPoint.y + 120,
        this.aspectoBoton
      )
      .setInteractive()

      .on("pointerdown", () => {
        this.audio.stop();
        this.audio2.play();
        this.scene.start("Tablero", {
          distancia: this.distancia,
          distancia2: this.distancia2,
          turno: this.turno,
          movimiento: 1,
          audio2: this.audio2,
          activo2: this.activo2,
        });
      })
      .on("pointerover", () => {
        boton.setScale(1.1);
      })

      .on("pointerout", () => {
        boton.setScale(1);
      });
  }

  updateWasChangedLanguage = () => {
    this.#wasChangedLanguage = FETCHED;
  };

  async getTranslations(language) {
    this.#language = language;
    this.#wasChangedLanguage = FETCHING;

    await getTranslations(language, this.updateWasChangedLanguage);
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
      this.audio.stop();
      this.player.muerte();
    }

    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
      this.TextoVictoria.setText(getPhrase("Victoria"));
    }
  }
}
