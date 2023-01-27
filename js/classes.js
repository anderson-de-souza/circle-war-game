class Player {
  
  constructor(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color;
    ctx.fill()
  }
  
}

class Projectile {
  
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color;
    ctx.fill()
  }
  
  update() {
    
    this.draw()
    
    this.x += this.velocity.x
    this.y += this.velocity.y
    
  }
  
}

class Enemy {
  
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color;
    ctx.fill()
  }
  
  update() {
    
    this.draw()
    
    this.x += this.velocity.x
    this.y += this.velocity.y
    
  }
  
}

class Particle {
  
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1
  }
  
  draw() {
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color;
    ctx.fill()
    ctx.restore()
  }
  
  update() {
    
    this.draw()
    
    this.x += this.velocity.x * 4
    this.y += this.velocity.y * 4
    this.alpha -= 0.01
  }
  
}