import { useState } from 'react'

const VERSION_ORDER = ['red', 'gold', 'ruby', 'diamond', 'x', 'sword']

export default function FlavorTextSection({ entries = [] }) {
  const byVersion = {}
  for (const e of entries) {
    const v = e.version?.name || 'unknown'
    if (!byVersion[v]) byVersion[v] = e.flavor_text.replace(/[\n\f]/g, ' ')
  }

  const versions = VERSION_ORDER.filter((v) => byVersion[v])
  const available = versions.length > 0 ? versions : Object.keys(byVersion)

  const [active, setActive] = useState(available[0] || null)

  if (!active || !byVersion[active]) return null

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em' }}>
          DESCRIPCIÓN
        </h3>
        <div style={{ display: 'flex', gap: 6 }}>
          {available.map((v) => (
            <button
              key={v}
              onClick={() => setActive(v)}
              style={{
                width: 18, height: 18, borderRadius: '50%',
                border: '2px solid',
                borderColor: v === active ? '#ef4444' : 'rgba(255,255,255,0.3)',
                background: v === active ? '#ef4444' : 'transparent',
                cursor: 'pointer', transition: 'all .2s', padding: 0,
              }}
            />
          ))}
        </div>
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0, fontStyle: 'italic' }}>
        {byVersion[active]}
      </p>
    </div>
  )
}
