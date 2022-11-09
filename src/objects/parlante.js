class Parlante extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, activo = true){
      
    super(scene, x, y, activo ? 'music' : 'mute')

    this.activo = activo;

    scene.add.existing(this);

    this.setInteractive()
    .on('pointerdown', () => {

      this.activo = !this.activo

      if (this.activo == true) {
        scene.audio.pause()
      } else{
        scene.audio.resume()
      } 
      
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