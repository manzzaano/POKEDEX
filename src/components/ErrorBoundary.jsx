import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100dvh',
          background: '#0a0a0a',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          textAlign: 'center',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(239,68,68,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20, fontSize: 28,
          }}>
            !
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>
            Algo salió mal
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 24px', maxWidth: 400 }}>
            Ocurrió un error inesperado al cargar la aplicación.
          </p>
          <details style={{ maxWidth: 500, width: '100%', textAlign: 'left' }}>
            <summary style={{
              cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.4)',
              marginBottom: 12, userSelect: 'none',
            }}>
              Detalles del error
            </summary>
            <pre style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 14,
              fontSize: 11, lineHeight: 1.6, color: '#ef4444',
              overflow: 'auto', maxHeight: 200, whiteSpace: 'pre-wrap',
              wordBreak: 'break-word', margin: 0,
            }}>
              {this.state.error?.message || 'Error desconocido'}
              {'\n\n'}
              {this.state.info?.componentStack || ''}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 24, padding: '12px 28px',
              borderRadius: 9999, border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.08)',
              color: '#fff', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            Reintentar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
