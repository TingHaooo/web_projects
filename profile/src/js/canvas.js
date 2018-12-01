import { randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    // init()
})

// create mainstar class
class MainStar {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
      x: randomIntFromRange(-8, 8),
      y: 30
    }
    this.friction = 0.5
    this.gravity = 0.54
  }

  draw() {
    c.save();
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.shadowColor = '#E3EAEF'
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
  }

  shatter() {
    for (let i = 0; i < 8; i++) {
      miniStars.push(new MiniStar(this.x, this.y, 2, '#E3EAEF'))
    }
    this.radius -= 3;
  }

  update() {
    this.draw()

    //control ball update
    if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
      this.velocity.y = -this.velocity.y * this.friction
      this.shatter()
    } else {
      this.velocity.y += this.gravity
    }
    if (
      this.x + this.radius + this.velocity.x > canvas.width ||
      this.x - this.radius + this.velocity.x < 0
    ){
      this.velocity.x = - this.velocity.x
    }

    this.x += this.velocity.x
    this.y += this.velocity.y
  }
}

// ministar class
class MiniStar extends (MainStar) {
  constructor(x, y, radius, color) {
    super(x, y, radius, color)
    this.velocity = {
      x: randomIntFromRange(-5, 5),
      y: randomIntFromRange(-30, 30)
    }
    this.friction = 0.88
    this.gravity = 0.9
    this.ttl = 100
    this.opacity = 1
  }

  draw() {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(227, 234, 239, ${this.opacity})`
    c.shadowColor = '#E3EAEF'
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {
    this.draw()

    if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
      this.velocity.y = -this.velocity.y * this.friction
    } else {
      this.velocity.y += this.gravity
    }

    this.x += this.velocity.x
    this.y += this.velocity.y
    this.ttl -= 1
    this.opacity -= 1 / this.ttl
  }
}

// Implementation
let mainStars = []
let miniStars = []
let backgroundStars = []
var ticker = 0;
let randomSpawnRate = 75;
let groundHeight = 20;

function createMainStar (radius) {
  let mainStar = new MainStar(
    randomIntFromRange(radius, canvas.width - radius),
    radius,
    radius,
    '#E3EAEF');
  mainStars.push(mainStar);

}

function init() {
  createMainStar(12);
  createMainStar(12);
  for (let i = 0; i < 3; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 3
    backgroundStars.push(new MainStar(x, y, radius, 'white'))
  }
}


// Animation Loop
function animate() {

    requestAnimationFrame(animate)
    c.fillStyle = 'transparent';
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.clearRect(0, 0, canvas.width, canvas.height)

    mainStars.forEach((mainStar, index) => {
      mainStar.update();
      if (mainStar.radius < 3) mainStars.splice(index, 1)
    })

    miniStars.forEach((miniStar, index) => {
      miniStar.update();
      if (miniStar.ttl < 0) miniStars.splice(index, 1)
    })

    ticker++

    if (ticker % randomSpawnRate === 0) {
      createMainStar(12)
      randomSpawnRate = randomIntFromRange(75, 200);
    }

}

init()
animate()
