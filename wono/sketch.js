const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

console.log(palettes)

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 6)
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount)

  const createGrid = () => {
    const points = []
    const count = 40

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)

        const radius = (random.noise2D(u, v) * 0.5 + 0.5) * .03

        points.push({
          color: random.pick(palette),
          position: [u, v],
          radius
        })
      }
    }

    return points
  }

  const points = createGrid().filter(() => random.value() > 0.5)

  const unicodeL = random.rangeFloor(1, 65533);
  const unicodeR = unicodeL + 3

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    const margin = 200

    points.forEach(({ position, radius, color }) => {
      const [u, v] = position;
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, radius * width, 0, Math.PI * 2)

      // context.fillStyle = color;
      // context.fill()

      // context.strokeStyle = color
      // context.lineWidth = 5
      // context.stroke()

      const fontSize = Math.floor(radius * width * 8)
      const font = `${fontSize}px helvetica`
      // console.log(font)

      const text = String.fromCharCode(random.rangeFloor(unicodeL, unicodeR))


      context.fillStyle = color;
      context.font = font
      context.fillText(text, x,y)

    })
  };
};

canvasSketch(sketch, settings);
