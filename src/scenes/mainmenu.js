import Phaser from "phaser";
import Parlante from "./parlante";
import { getTranslations, getPhrase } from '../services/translations'
import keys from '../enums/keys';
import { FETCHED, FETCHING, READY, TODO } from '../enums/status'

export class MainMenu extends Phaser.Scene {
  #parlante;
  #wasChangedLanguage = TODO
  #language;
  constructor() {
    super("MainMenu");
  }

  init(data) {
    //this.audio = data.audio;
    this.activo = data.activo;
    console.log(data);
    this.#language = data.language;
  }

  create() {
    let Jugar;
    const {width, height} = this.scale;
        const positionCenter = {
            x: width / 2,
            y: height / 2,
        }

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
    const buttonEn = this.add.rectangle(width * 0.1, height * 0.15, 150, 75, 0xffffff)
			.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.getTranslations('en-US')
			})

      const buttonEs = this.add.rectangle(width * 0.5, height * 0.15, 150, 75, 0xffffff)
			.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.getTranslations('es-US')
			})
    Jugar = this.add
      .text(
        this.cameras.main.centerX - 205,
        this.cameras.main.centerY + 230,
        "Jugar",
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

        this.txt = this.add.text(400, 400, getPhrase('Jugar'), {fontSize: 100})
  }

  updateWasChangedLanguage = () => {
    this.#wasChangedLanguage = FETCHED
};

  async getTranslations(language){
    this.#language = language;
    this.#wasChangedLanguage = FETCHING;
    
    await getTranslations(language, this.updateWasChangedLanguage)
}

  update() {
    this.activo = this.#parlante.activo;
    if(this.#wasChangedLanguage === FETCHED){
      this.#wasChangedLanguage = READY;
      this.txt.setText(getPhrase('Jugar'))
  }
  }
}
