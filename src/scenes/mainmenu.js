import Phaser from "phaser";
import Parlante from "./parlante";

export class MainMenu extends Phaser.Scene {
  #parlante;
  constructor() {
    super("MainMenu");
  }

  init(data) {
    //this.audio = data.audio;
    this.activo = data.activo;
    console.log(data);
  }

  create() {
    let Jugar;

    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "cueva"
    );
    this.add.image(
      this.cameras.main.centerX / 1,
      this.cameras.main.centerY / 1.8,
      "inicio"
    );

    Jugar = this.add
      .text(
        this.cameras.main.centerX - 205,
        this.cameras.main.centerY + 230,
        "JUGAR",
        {
          stroke: "black",
          strokeThickness: 6,
          fontSize: "100px Arial",
          fill: "white",
        }
      )
      .setInteractive()

      .on("pointerdown", () => {
        //this.audio.stop();
        this.scene.start("Instrucciones", { activo: this.activo });
      })

      .on("pointerover", () => {
        Jugar.setScale(1.1);
      })

      .on("pointerout", () => {
        Jugar.setScale(1);
      });

    let creditos = this.add
      .text(
        this.cameras.main.centerX - 215,
        this.cameras.main.centerY + 390,
        "CRÉDITOS",
        {
          stroke: "black",
          strokeThickness: 6,
          fontSize: "70px Arial",
          fill: "white",
        }
      )
      .setInteractive()

      .on("pointerdown", () => {
        console.log("pointerdown", this.activo);
        this.scene.start("Creditos", { audio: null, activo: this.activo });
      })

      .on("pointerover", () => {
        creditos.setScale(1.1);
      })

      .on("pointerout", () => {
        creditos.setScale(1);
      });

    this.#parlante = new Parlante(this, 1830, 80, this.activo);

    /*
      
  
        let musica = this.add.image(1830,80,iconoSonido).setInteractive()
  
        .on('pointerdown', () => {
          
          if(this.activo===0){
            iconoSonido= "mute"
            this.contar = 1
            //this.audio.pause()
          }else{
            if (this.contar === 1){
              iconoSonido= "music"
              this.contar = 0
              //this.audio.resume()
            }
          }
          
        })
    
        .on('pointerover', () => {
          musica.setScale(1.1)
          //sonido.setScale(1.1)
        })
    
        .on('pointerout', () => {
          musica.setScale(1)
          //sonido.setScale(1)
        })
        */
  }
  update() {
    this.activo = this.#parlante.activo;
  }
}
