export function MaleIcon({ size = 14, color = '#60a5fa' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="14" r="7" />
      <line x1="15" y1="9" x2="22" y2="2" />
      <polyline points="16,2 22,2 22,8" />
    </svg>
  )
}

export function FemaleIcon({ size = 14, color = '#f472b6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="7" />
      <line x1="12" y1="16" x2="12" y2="22" />
      <line x1="9" y1="19" x2="15" y2="19" />
    </svg>
  )
}

export default function GenderDisplay({ genderRate }) {
  if (genderRate === -1) {
    return <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Sin género</span>
  }

  const femalePct = (genderRate / 8) * 100
  const malePct = 100 - femalePct

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <MaleIcon />
      <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex', minWidth: 60 }}>
        <div style={{ width: `${malePct}%`, height: '100%', background: '#60a5fa', transition: 'width .5s' }} />
        <div style={{ width: `${femalePct}%`, height: '100%', background: '#f472b6', transition: 'width .5s' }} />
      </div>
      <FemaleIcon />
    </div>
  )
}
