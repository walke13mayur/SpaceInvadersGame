// selecting canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

  
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// creating player
class Player {
    constructor(){
    //  reletive position on x and y axis.
       
     this.velocity = {
      X:0,
      Y:0
    }
    this.rotation = 0 

const image = new Image()
image.src = './Img/spaceship.png'
image.onload =()=>{
    const scale = 0.15
    this.image = image
    this.width = image.width * scale
    this.height = image.height* scale
    this.position = {
        // x axis left to right from bottom
        X:canvas.width/2 - this.width /2,
        //  y axis starts from above 
         Y:canvas.height - this.height - 20
     }
}

    }
    draw(){
        // c.fillStyle = 'red'
        // c.fillRect(this.position.X, this.position.Y, this.width, this.height)
        c.save()
        c.translate(
            //player.position.X + player.width/2,
                        player.position.X + player.width/2,
                        player.position.Y + player.height/2
        )
        c.rotate(this.rotation)
        c.translate(
           // player.position.X + player.width/2,
                       -player.position.X - player.width/2,
                       -player.position.Y - player.height/2
        )
        c.drawImage(this.image , this.position.X, this.position.Y, this.height, this.width)
        c.restore()
    }
    update(){
        if (this.image)
         {
            this.draw()
            this.position.X += this.velocity.X
         }
    }
}
class Projectile{
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }
    draw(){
        c.beginPath()
        c.arc(this.position.X , this.position.Y, this.radius, 0, Math.PI*2)
        c.fillStyle ='red'
        c.fill()
        c.closePath()
    }
    update(){
        this.draw()
        this.position.X += this.velocity.X
        this.position.Y += this.velocity.Y
    }
}

class Invader {
    constructor(){
    //  reletive position on x and y axis.
       
     this.velocity = {
      X:0,
      Y:0
    }

const image = new Image()
image.src = './Img/Invader.png'
image.onload =()=>{
    const scale = 1
    this.image = image
    this.width = image.width * scale
    this.height = image.height* scale
    this.position = {
        // x axis left to right from bottom
        X:canvas.width/2 - this.width /2,
        //  y axis starts from above 
         Y:canvas.height /2
     }
}

    }
    draw(){
        // c.fillStyle = 'red'
        // c.fillRect(this.position.X, this.position.Y, this.width, this.height)
       
        c.drawImage(this.image , this.position.X, this.position.Y, this.height, this.width)
    }
    update(){
        if (this.image)
         {
            this.draw()
            this.position.X += this.velocity.X
            this.position.Y += this.velocity.Y
         }
    }
}

class Grid{
constructor(){
    this.position = {
        X : 0,
        Y:0
    }
    this.velocity = {
        X : 0,
        Y:0 
    }
    this.invaders[ new Invader()]
}
update(){}
}

const player = new Player()
const projectiles = []
const grids = [new Grid()]



const keys = {
    a:{
        pressed : false
    },  
    d:{
        pressed : false
    },  
    space:{
        pressed : false
    },        
}
//player.draw()

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle ='black'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    projectiles.forEach((projectile,index) =>{
        if(projectile.position.Y + projectile.radius <=0){
            setTimeout(() => {
                projectiles.splice(index , 1)
            }, 0)
        }
        else{
            projectile.update()
        }
    })
    // 55 minutes
    grids.forEach((grid) =>{
        grid.update()
        grid.invaders.forEach(invader =>{
            invader.update()
        })
    })
    if(keys.a.pressed && player.position.X >=0){
        player.velocity.X = -10
        player.rotation = -0.20
    }else if (keys.d.pressed &&
        player.position.X + player.width <= canvas.width){
        player.velocity.X = 10
        player.rotation = 0.20

    }else {
        player.velocity.X = 0
        player.rotation = 0


    }
    
}

animate()
addEventListener('keydown',({key}) =>{
   // console.log(Event.key);
   switch(key){
       case 'a':
          // console.log('left');
           keys.a.pressed = true
           break

        case 'd':
            //console.log('right');
            keys.d.pressed = true
            break    
         case ' ':
           //  console.log('space');
            // keys.space.pressed = true
            projectiles.push(
                new Projectile({
                    position:{
                        X:player.position.X + player.width/4 ,
                        Y:player.position.Y
                    },
                    velocity:{
                        X:0 ,
                        Y:-15
                    }
                  })
            )
            // console.log(projectiles)
             break    
   }
})

addEventListener('keyup',({key}) =>{
    // console.log(Event.key);
    switch(key){
        case 'a':
           // console.log('left');
            keys.a.pressed = false
            break
 
         case 'd':
            // console.log('right');
             keys.d.pressed = false
             break    
          case ' ':
             // console.log('space');
              //keys.space.pressed = true
              break    
    }
 }
)