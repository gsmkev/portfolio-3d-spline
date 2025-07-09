// Estilos comunes para la aplicación
export const commonStyles = {
  mainContainer: {
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
    // Mejoras para mobile
    WebkitOverflowScrolling: 'touch',
    touchAction: 'manipulation',
    // Prevenir zoom en mobile
    maxWidth: '100vw',
    maxHeight: '100vh'
  },

  splineContainer: {
    width: '100vw',
    height: '100vh',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'block',
    // Mejoras específicas para mobile
    touchAction: 'none',
    WebkitOverflowScrolling: 'touch',
    // Prevenir selección de texto
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    // Optimizar para mobile
    WebkitTransform: 'translateZ(0)',
    transform: 'translateZ(0)',
    // Prevenir scroll horizontal
    overflow: 'hidden'
  },

  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    // Mejoras para mobile
    minHeight: '44px', // Tamaño mínimo recomendado para touch
    minWidth: '44px',
    touchAction: 'manipulation'
  },

  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#666',
    padding: '5px',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
    // Mejoras para mobile
    minHeight: '44px',
    minWidth: '44px',
    touchAction: 'manipulation',
    zIndex: 1001
  },

  // Estilos específicos para mobile
  mobileStyles: {
    mainContainer: {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      touchAction: 'none',
      WebkitOverflowScrolling: 'touch'
    },

    splineContainer: {
      width: '100vw',
      height: '100vh',
      touchAction: 'none',
      WebkitOverflowScrolling: 'touch',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0
    }
  }
}; 