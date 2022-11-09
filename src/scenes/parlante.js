class Parlante extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, activo = true){
      
    super(scene, x, y, activo ? 'music' : 'mute')
    this.scene = scene;

    this.activo = activo;

    scene.add.existing(this);

    this.setInteractive()
    .on('pointerdown', () => {

      

      if (this.activo) {
        this.scene.audio.pause()
      } else{
        this.scene.audio.resume()
      } 
      this.activo = !this.activo
      
      this.setTexture(this.activo ? 'music': 'mute')
    
    })
    
    .on('pointerover', () => {
      this.setScale(1.1)
    })
    
    .on('pointerout', () => {
      this.setScale(1)
    })

  }

}

export default Parlante;