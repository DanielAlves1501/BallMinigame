import platformImage from '/img/bg.png'
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let gravity = 1;
let keysPressed = {
    left: false,
    right: false
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const bgImage = new Image()
bgImage.src = platformImage

class Ball {
    constructor(posX,posY,dy,dx,radius,color){
        this.posX = posX;
        this.posY = posY
        this.dy = dy
        this.dx = dx
        this.radius = radius
        this.color= color

    }

    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.posX,this.posY,this.radius,0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
    }

    update(){

        this.posY += this.dy;
        this.posX += this.dx;

        if(this.posY + this.radius + this.dy <= canvas.height){
            this.dy += gravity
        } else{
            this.dy = 0;
        }



        this.draw()

    }

    jump(){
        this.dy -= 30      
    }

    moveRight(){
        this.dx = 6;
    }

    moveLeft(){
            this.dx = -6;

    }


}

class Platform{
    constructor(posX,posY, width,height, color){
        this.posX = posX
        this.posY = posY
        this.width = width;
        this.height = height;
        this.color = color
}

    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.posX,this.posY,this.width,this.height)
    }

    update(){
        this.draw()
        this.checkCollisions()
    }

    checkCollisions(){

    if(ball.posY + ball.radius <= this.posY && ball.posY + ball.radius + ball.dy >= this.posY && ball.posX + ball.radius >= this.posX && ball.posX <= this.posX + this.width){
        ball.dy = 0;
    } 

    }

}

const ball = new Ball(100,100,5,0,40,'red')
const platform = new Platform(300,500,300,50,'red')
const platform2 = new Platform(800,500,300,50,'blue')


window.addEventListener('keydown',({keyCode})=>{
    console.log(keyCode);
        if(keyCode === 87){
            ball.jump()
        } else if(keyCode === 68){
            keysPressed.left = false;
            keysPressed.right = true;
        } else if(keyCode === 65){
            keysPressed.right = false;
            keysPressed.left = true;
        }
    

})

window.addEventListener('keyup',({keyCode})=>{

    if(keyCode === 68){
        keysPressed.right = false;
        ball.dx = 0
    } else if(keyCode === 65){
        keysPressed.left = false;
        ball.dx = 0;
    }
})

const animate = ()=>{
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,innerWidth, innerHeight)
    ctx.drawImage(bgImage,0,0,innerWidth,innerHeight)
    ball.update()
    platform.update()
    platform2.update()

    //Ball movement
    if(keysPressed.right){
        ball.moveRight()
    } else if(keysPressed.left){
        if(ball.posX - ball.radius -ball.dx <= 0){
            ball.dx = 0;
        }else{
            ball.moveLeft()

        }
    }

    //Horizontal Scrolling

    if(ball.posX >= 600 && keysPressed.right){
        platform.posX -= 3
        platform2.posX -= 3
        ball.dx = 0
    } else if(ball.posX <= 300 && keysPressed.left){
        platform.posX += 3
        platform2.posX += 3
        ball.dx = 0
    }



}

animate()
