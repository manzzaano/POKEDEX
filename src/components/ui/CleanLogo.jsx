import { useEffect, useRef } from 'react'

export default function CleanLogo({ src, width = 320, style = {} }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src
    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const ratio = width / img.width
      canvas.width = width
      canvas.height = img.height * ratio
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2]
        const brightness = (r + g + b) / 3
        if (brightness > 200) {
          const factor = (brightness - 200) / 55
          data[i + 3] = Math.round(data[i + 3] * (1 - factor))
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }
  }, [src, width])

  return (
    <div ref={containerRef} style={{ ...style, display: 'inline-block' }}>
      <canvas ref={canvasRef} style={{ width, height: 'auto', display: 'block' }} />
    </div>
  )
}
