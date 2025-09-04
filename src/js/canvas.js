import {randomColor} from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const grid = 20
const scaleFactor = .5

canvas.width = innerWidth + grid*2
canvas.height = innerHeight + grid

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#24292eff']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})

// Planes
function Plane(x, y, color, scaleFactor) {
    this.x = x
    this.y = y
    this.color = color
    this.scaleFactor = scaleFactor
}

Plane.prototype.draw = function() {
    c.save() // Save the current transformation matrix
    
    // Calculate angle to mouse
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const angle = Math.atan2(dy, dx)

    // === Rotate about the plane's CENTER, not the nose ===
    // The nose is at local (0,0). Tail is around (-30,0).
    // Center ≈ halfway: (-15, 0) in local coords (scaled).
    const pivotX = -15 * this.scaleFactor
    
    // Translate to plane position and rotate
    c.translate(this.x + pivotX, this.y)
    c.rotate(angle)
    c.translate(-pivotX, 0)
    
    c.beginPath()
    
    // Draw a proper arrow shape with nose pointing right (0 degrees)
    // Nose at origin (0, 0)
    c.moveTo(0, 0)

    // Top right point
    c.lineTo(-30 * this.scaleFactor, -11 * this.scaleFactor)

    // Inner right point (arrow notch)
    c.lineTo(-26 * this.scaleFactor, 0)
    
    // Bottom right point
    c.lineTo(-30 * this.scaleFactor, 11 * this.scaleFactor)

    // Close back to nose
    c.lineTo(0, 0)

    // Line from inner right to nose
    c.moveTo(-26 * this.scaleFactor, 0)
    c.lineTo(1, 0)

    c.strokeStyle = this.color
    c.lineWidth = 1 * this.scaleFactor
    
    c.stroke()
    c.closePath()
    
    c.restore() // Restore the original transformation matrix
}

Plane.prototype.update = function() {
    this.draw()
}

// Implementation
let planes
function init() {
    planes = []
    // Create planes in grid
    for(let x = 1; x < canvas.width / grid; x++){
        for(let y = 1; y < canvas.height / grid; y++){
            console.log(`Next Plane at: ${x*grid}/${y*grid}`)
            planes.push( new Plane(x*grid-(grid/2), y*grid-(grid/2),  randomColor(colors), scaleFactor) )
        }
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    planes.forEach(plane => {
        plane.update()
    })
}

init()
animate()