import Phaser from "phaser";
import Jugador from "../objects/jugador";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";

export class Escenario2 extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  #language;
  constructor() {
    super("Escenario2");
  }

  preload() {
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
    console.log(data);
    this.#language = data.language;
    console.log(this.#language);
    // recibir mapa a usar
  }
  create() {
    const { width, height } = this.scale;
    const positionCenter = {
      x: width / 2,
      y: height / 2,
    };
    this.audio4 = this.sound.add("theme4", { loop: true });
    this.audio4.play();

    const map2 = this.make.tilemap({ key: "map2" });

    const tilesetBelow2 = map2.addTilesetImage(
      "fondonoche - atlas",
      "tilesBelow2"
    );

    const tilesetPlatform2 = map2.addTilesetImage(
      "plataformas-ladrillos",
      "tilesPlatform2"
    );

    const belowLayer = map2.createLayer("Fondo", tilesetBelow2, 0, 0);
    const worldLayer = map2.createLayer("Plataformas", tilesetPlatform2, 0, 0);
    const objectsLayer = map2.getObjectLayer("Objetos");

    worldLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map2.findObject("Objetos", (obj) => obj.name === "dude");

    this.player = new Jugador(this, spawnPoint.x, spawnPoint.y, "callejero");

    this.player.correr();

    this.isJumping = false;

    const spawnPoint2 = map2.findObject(
      "Objetos",
      (obj) => obj.name === "final"
    );
    this.final = this.physics.add.sprite(
      spawnPoint2.x,
      spawnPoint2.y,
      "banderaCiudad"
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.tachos = this.physics.add.group();
    this.gatos = this.physics.add.group();

    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "tacho": {
          const tacho = this.tachos.create(x, y, "tacho");

          break;
        }
        case "gato": {
          this.gato = this.gatos.create(x, y, "gato");
          this.gato.play("gatoAnimacion");
          this.gato.setBodySize(56, 70);

          break;
        }
      }
    });
    this.count = 0;

    this.physics.add.collider(this.player, worldLayer);
    this.physics.add.collider(this.tachos, worldLayer);
    this.physics.add.collider(this.gatos, worldLayer);
    this.physics.add.collider(this.final, worldLayer);

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

    this.player.vida();

    this.gameOver = false;

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.cameras.main.setZoom(1.5);

    this.cameras.main.setBounds(0, 0, 3200, 960);
  }

  hitTacho(player, tacho) {
    tacho.destroy();
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
    gato.destroy();
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
    this.gato.anims.play("gatoStop");
    player.anims.play("jump2");

    this.textVictoria = this.add
    .image(
      this.cameras.main.midPoint.x - 6,
      this.cameras.main.midPoint.y,
      "victoria2"
    );

    // this.Victoria = this.add
    // .text(
    //   this.cameras.main.midPoint.x - 180,
    //   this.cameras.main.midPoint.y - 165,
    //   "Victoria", 
    //   {
    //     fontSize: "70px",
    //   }
    // );
    let boton = this.add
      .image(
        this.cameras.main.midPoint.x - 10,
        this.cameras.main.midPoint.y + 120,
        "botonCiudad"
      )
      .setInteractive()

      .on("pointerdown", () => {
        this.audio4.stop();
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
      this.audio4.stop();
      this.player.muerte();
    }

    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
      //this.Victoria.setText(getPhrase("Victoria"));
      
    }
  }
}
