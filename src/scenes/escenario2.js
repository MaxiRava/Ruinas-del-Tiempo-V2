import Phaser from "phaser";
import Jugador from "../objects/jugador";

export class Escenario2 extends Phaser.Scene {

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
    this.audio2=data.audio2;
    // recibir mapa a usar
    
  }
  create() {
    this.audio4 = this.sound.add('theme4', {loop: true});
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

    this.player = new Jugador(this, spawnPoint.x, spawnPoint.y, "dude2");

    this.player.correr();  

    this.isJumping = false;

    const spawnPoint2 = map2.findObject(
      "Objetos",
      (obj) => obj.name === "final"
    );
    this.final = this.physics.add.sprite(
      spawnPoint2.x,
      spawnPoint2.y,
      "banderaciudad"
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
          const gato = this.gatos.create(x, y, "gato");
          console.log("🚀 ~ file: escenario2.js ~ line 83 ~ Escenario2 ~ objectsLayer.objects.forEach ~ this.gato", this.gatos)
          

          break;
        }
      }
    });
    console.log("🚀 ~ file: escenario2.js ~ line 72 ~ Escenario2 ~ create ~ this.gatos", this.gatos)

    //this.gatos.children.each(gato=>gato.anims.play("gatoAnims"))
    /* this.gatos.getChildren().forEach(gato => {
      console.log("🚀 ~ file: escenario2.js ~ line 95 ~ Escenario2 ~ create ~ gato", gato)
      gato.anims.play("gatoAnims")
      
    }) */
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
    //this.gato.anims.play("gatoStop");

    setTimeout(() => {
      this.physics.resume();

      this.player.clearTint();

      this.player.anims.play("run2");

      this.player.perderVida();
    }, 900);
  }

  hitFinal(player, final) {

    this.physics.pause();
    player.anims.play("jump2");
    let victory = this.add.image(
      this.cameras.main.midPoint.x,
      this.cameras.main.midPoint.y ,
      "victoria2"
    );
    let boton = this.add
      .image(
        this.cameras.main.midPoint.x -10,
        this.cameras.main.midPoint.y +120,
        "botone2"
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
