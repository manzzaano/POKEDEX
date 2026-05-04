import usePokedexStore from '../store/usePokedexStore'
import useTypes from '../hooks/useTypes'
import { TYPE_COLORS, TYPE_NAMES } from './ui/TypeBadge'

export default function TypeFilter() {
  const selectedType = usePokedexStore((s) => s.selectedType)
  const setSelectedType = usePokedexStore((s) => s.setSelectedType)
  const { data: types = [] } = useTypes()

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <span
        onClick={() => setSelectedType('')}
        style={{
          padding: '6px 16px',
          borderRadius: 9999,
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          border: '1px solid rgba(255,255,255,0.12)',
          transition: 'all .2s',
          background: selectedType === '' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
          color: selectedType === '' ? '#fff' : 'rgba(255,255,255,0.6)',
          userSelect: 'none',
        }}
      >
        Todos
      </span>
      {types.map((t) => {
        const active = selectedType === t.name
        const color = TYPE_COLORS[t.name] || '#888'
        return (
          <span
            key={t.name}
            onClick={() => setSelectedType(active ? '' : t.name)}
            style={{
              padding: '6px 16px',
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              border: active
                ? `1px solid ${color}55`
                : '1px solid rgba(255,255,255,0.12)',
              transition: 'all .2s',
              background: active ? `${color}44` : 'rgba(255,255,255,0.06)',
              color: active ? color : 'rgba(255,255,255,0.6)',
              userSelect: 'none',
            }}
          >
            {TYPE_NAMES[t.name] || t.name}
          </span>
        )
      })}
    </div>
  )
}
