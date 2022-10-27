import Phaser from 'phaser';
import Jugador from "./jugador";

let player;
let enemys;
let rooks;
let snakes;
let final;
let cursors;
let gameOver;
let count;
let number;
let isJumping;
let distancia;
let distancia2;
let turno;
//let audio3;
//let audio2;
var texto;


export class Escenario1 extends Phaser.Scene {

  player
  cursors
  isJumping
  
  
    constructor() {

      super("Escenario1");
    }

    preload() {
      this.load.tilemapTiledJSON("map1", "assets/tilemaps/esc1.json");
      this.load.image("tilesBelow1", "assets/images/jungla-atlas.png");
      this.load.image("tilesPlatform1", "assets/images/plataforma.png");
    
    }
    init(data) {

      distancia = data.distancia;
      distancia2 = data.distancia2;
      turno = data.turno;
      this.movimiento = data.movimiento;
      this.contar=data.contar;
      //audio2=data.audio2;
      
  
    }
    create() {
      //audio3 = this.sound.add('theme3', {loop: true});
      //audio3.play();
  
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

      player = new Jugador(this, spawnPoint.x, spawnPoint.y,'dude')
      player.correr(); 
      
      isJumping = false;

      const spawnPoint2 = map1.findObject("Objetos", (obj) => obj.name === "final");
      final = this.physics.add.sprite(spawnPoint2.x, spawnPoint2.y, "banderaEsc");

      cursors = this.input.keyboard.createCursorKeys();
    

      enemys = this.physics.add.group();
      rooks = this.physics.add.group();
      snakes = this.physics.add.group();
      

      objectsLayer.objects.forEach((objData) => {

      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "enemy": {

          const enemy = enemys.create(x, y, "roca");
          
          break;
        }
        case "snake": {

          const snake = snakes.create(x, y, "snake");
          
          break;
        }
        case "rook": {

          const rook = rooks.create(x, y, "roca2");
          
          break;
        }
      } 
    });
    
      count = 0;
      number= 3;
       
      this.physics.add.collider(player, worldLayer);
      this.physics.add.collider(enemys, worldLayer);
      this.physics.add.collider(rooks, worldLayer);
      this.physics.add.collider(snakes, worldLayer);
      this.physics.add.collider(final, worldLayer);
  
      this.physics.add.overlap(player, enemys, this.hitEnemy, null, this);
      this.physics.add.overlap(player, rooks, this.hitRook, null, this);
      this.physics.add.overlap(player, snakes, this.hitSnake, null, this);
      this.physics.add.overlap(player, final, this.hitFinal, null, this);
  
      texto = this.add.text(330 ,200, `Vidas: ${number}`, { stroke: 'black', strokeThickness: 5, fontSize: '54px Arial', fill: 'white' });
      
      texto.setScrollFactor(0);
     

      gameOver = false;

      this.cameras.main.startFollow(player, true, 0.08, 0.08);
    
      this.cameras.main.setZoom(1.5);
      
      this.cameras.main.setBounds(0, 0, 3200, 960);
    }

    hitEnemy(player,enemy) {
      enemy.destroy();
      count = count + 1;
      this.physics.pause();
  
      player.setTint(0xff0000);
    
      player.anims.play("jump");
      

      setTimeout(() => {
        
        this.physics.resume();
  
        player.clearTint();
        
        player.anims.play("run");
        
        number = 3 - count;
        texto.setText(`Vidas: ${number}`);
        

      }, 900); 
    }

    hitRook(player,rook) {
      rook.destroy();
      count = count + 1;
      
      this.physics.pause();
  
      player.setTint(0xff0000);
    
      player.anims.play("jump");
      

      setTimeout(() => {
        
        this.physics.resume();
  
        player.clearTint();
        
        player.anims.play("run");

        number = 3 - count;
        texto.setText(`Vidas: ${number}`);
       

      }, 900); 
    }

    hitSnake(player,snake) {
      snake.destroy();
      count = count + 1;
      
      this.physics.pause();
  
      player.setTint(0xff0000);
    
      player.anims.play("jump");
      

      setTimeout(() => {
        this.physics.resume();
  
        player.clearTint();
        
        player.anims.play("run");
        
        number = 3 - count;
        texto.setText(`Vidas: ${number}`);
        

      }, 900); 
    }

    hitFinal(player,final) {
      texto.destroy();
      
      
      this.physics.pause();
      player.anims.play("jump");
      let victory=this.add.image(this.cameras.main.midPoint.x - 6 ,this.cameras.main.midPoint.y, "victoria");
      let boton=this.add.image(this.cameras.main.midPoint.x - 20,this.cameras.main.midPoint.y + 120, "botone").setInteractive()

      .on('pointerdown', () => {
        //audio3.stop()
        //audio2.play()
        this.scene.start("Tablero", { distancia : distancia, distancia2:distancia2, turno:turno, movimiento : 1, audio2:null, contar:this.contar }
      )
      })
      .on('pointerover', () => {
        boton.setScale(1.1)
      })
  
    .on('pointerout', () => {
        boton.setScale(1)
      })

    }

  update(){
    

    //player.setVelocityX(100);

    if (gameOver) {
      return;
    };

    if (cursors.up.isDown && player.body.blocked.down) {
      player.saltar();
    } else {
      if (player.isJumping && player.body.blocked.down) {
        player.correr();
      }
    } 


    if (count === 3){
    
      setTimeout(() => {
        gameOver= true; 
        
        this.cameras.main.stopFollow();
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play("jump");

        let derrota =this.add.image(this.cameras.main.midPoint.x ,this.cameras.main.midPoint.y, "derrota")
        let boton =this.add.image(this.cameras.main.midPoint.x -6,this.cameras.main.midPoint.y + 120, "botone").setInteractive()
        .on('pointerdown', () => {

          //audio3.stop()
          //audio2.play()
          
          if (turno === 1) {
            turno= 0
          }else{
            if (turno === 0){
              turno = 1
            } 
          }
      
          this.scene.start("Tablero", {distancia : distancia, distancia2:distancia2, turno:turno, movimiento: 0, audio2:null, contar:this.contar})
        })
        .on('pointerover', () => {
          boton.setScale(1.1)
        })
    
      .on('pointerout', () => {
          boton.setScale(1)
        })

      }, 900); 
      
    }
    
  }
}