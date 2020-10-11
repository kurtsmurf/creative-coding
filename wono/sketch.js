const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

random.setSeed(17)

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  const createGrid = () => {
    const points = []
    const count = 40

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        points.push({
          position: [u, v],
          radius: Math.abs(0.006 + random.gaussian() * 0.01)
        })
      }
    }

    return points
  }

  const points = createGrid().filter(() => random.value() > 0.5)
  console.log(points)

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    const margin = 200

    points.forEach(({ position, radius }) => {
      const [u,v] = position;
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, radius * width, 0, Math.PI * 2)

      context.fillStyle = 'black';
      context.fill()

      // context.strokeStyle = 'black'
      // context.lineWidth = 5
      // context.stroke()
    })
  };
};

canvasSketch(sketch, settings);
