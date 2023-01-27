
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const scoreElement = document.getElementById('score')

canvas.width = innerWidth
canvas.height = innerHeight

const enemies = new Array()

let spawnEnemiesIntervalId;

function spawnEnemies() {
  
  spawnEnemiesIntervalId = setInterval(() => {
    
    const radius = Math.max(10,Math.random() * 35)
    
    let x, y
    
    if (Math.random() > 0.5) {
      x = Math.random() * canvas.width
      y = Math.random() > 0.5 ? 0 - radius : canvas.height + radius
    } else {
      x = Math.random() > 0.5 ? 0 - radius : canvas.width + radius
      y = Math.random() * canvas.height
    }
  
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`
    
    const angle = Math.atan2(
      canvas.height / 2 - y,
      canvas.width / 2 - x
    )
  
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }
    
    enemies.push(new Enemy(
      x, y, radius, color, velocity
    ))
    
    
  }, 1000)
  
}

const player = new Player(
  canvas.width / 2, canvas.height / 2, 10, 'white'
)

const projectiles = new Array()
const particles = new Array()


addEventListener('click', (info) => {
  
  const angle = Math.atan2(
    info.clientY - canvas.height / 2,
    info.clientX - canvas.width / 2
  )
  
  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5
  }
  
  const project = new Projectile(player.x, player.y, 5, 'snow', velocity)
  projectiles.push(project)
  
})

let animationId
let score = 0

function animate() {
  
  animationId = requestAnimationFrame(animate)
  
  ctx.fillStyle = 'rgba(0,0,0,0.05)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  player.draw()
  
  particles.forEach((particle, index) => {
    
    if (particle.alpha <= 0.1) {
      particles.splice(index, 1)
    }
    
    particle.update()
    
  })
  
  projectiles.forEach((project, index) => {
    
    project.update()
    
    if(
      project.x + project.radius < 0 || 
      project.x - project.radius > canvas.width ||
      project.y + project.radius < 0 ||
      project.y - project.radius > canvas.height
    ) {
      
        projectiles.splice(index, 1)
        
    }
    
  })

  enemies.forEach((enemy, enemyIndex) => {
    
    enemy.update()
    
    const distance = Math.hypot(
      player.x - enemy.x, 
      player.y - enemy.y
    )
    
    if (distance < (enemy.radius + player.radius)) {
      cancelAnimationFrame(animationId)
      clearInterval(spawnEnemiesIntervalId)
    }
    
    projectiles.forEach((project, projectIndex)=> {
      
      const distance = Math.hypot(
        project.x - enemy.x, 
        project.y - enemy.y
      )
      
      if (distance < (enemy.radius + project.radius)) {
        
        score += 100
        scoreElement.innerHTML = score
        
        if(enemy.radius > 20) {
          
            for (var index = 0; index < enemy.radius * 2; index++) {
              particles.push(new Particle(project.x, project.y, Math.random() * 3, enemy.color, { x: Math.random() - 0.5, y: Math.random() - 0.5 }))
            }
          
            gsap.to(enemy, {
              radius: enemy.radius - 10
            })
            
            projectiles.splice(projectIndex, 1)
            
            score += 100
            scoreElement.innerHTML = score
            
        } else {
          
            for (var index = 0; index < enemy.radius * 2; index++) {
              particles.push(new Particle(project.x, project.y, Math.random() * 3, enemy.color, { x: Math.random() - 0.5, y: Math.random() - 0.5 }))
            }
            
            enemies.splice(enemyIndex, 1)
            projectiles.splice(projectIndex, 1)
            
            score += 250
            scoreElement.innerHTML = score
          
        }
      }
    })
    
  })
  
}

spawnEnemies()
animate()
