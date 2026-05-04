export default function ShinyIcon({ active, size = 24 }) {
  const color = active ? '#fbbf24' : 'rgba(255,255,255,0.45)'
  const inner = active ? '#fbbf24' : 'transparent'

  return (
    <svg width={size} height={size} viewBox="0 0 28 28" shapeRendering="crispEdges">
      <rect x="12" y="0" width="4" height="3" fill={inner} stroke={color} strokeWidth="1" />
      <rect x="12" y="25" width="4" height="3" fill={inner} stroke={color} strokeWidth="1" />
      <rect x="0" y="12" width="3" height="4" fill={inner} stroke={color} strokeWidth="1" />
      <rect x="25" y="12" width="3" height="4" fill={inner} stroke={color} strokeWidth="1" />

      <rect x="3" y="3" width="4" height="4" fill={inner} stroke={color} strokeWidth="1" />
      <rect x="21" y="3" width="4" height="4" fill={inner} stroke={color} strokeWidth="1" />
      <rect x="3" y="21" width="4" height="4" fill={inner} stroke={color} strokeWidth="1" />
      <rect x="21" y="21" width="4" height="4" fill={inner} stroke={color} strokeWidth="1" />

      <rect x="11" y="11" width="6" height="6" fill={inner} stroke={color} strokeWidth="1" />
    </svg>
  )
}
