import { Github, Linkedin } from 'lucide-react'

const LINKS = [
  {
    href: 'https://github.com/manzzaano',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://www.linkedin.com/in/ismael-manzano-leon/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
]

export default function SocialLinks({ compact = false }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: compact ? 8 : 12,
        flexWrap: 'wrap',
      }}
    >
      {LINKS.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: compact ? '6px 10px' : '8px 14px',
            borderRadius: 9999,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'none',
            fontSize: compact ? 11 : 12,
            fontWeight: 600,
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            transition: 'all .2s',
            minHeight: compact ? 36 : 44,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
          }}
        >
          <Icon size={compact ? 14 : 16} />
          <span className={compact ? 'hidden sm:inline' : ''}>{label}</span>
        </a>
      ))}
    </div>
  )
}
