// Common styles for the application
export const commonStyles = {
  mainContainer: {
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
    WebkitOverflowScrolling: 'touch',
    touchAction: 'manipulation',
    maxWidth: '100vw',
    maxHeight: '100vh'
  },

  splineContainer: {
    width: '100vw',
    height: '100vh',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'block',
    touchAction: 'none',
    WebkitOverflowScrolling: 'touch',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    WebkitTransform: 'translateZ(0)',
    transform: 'translateZ(0)',
    overflow: 'hidden'
  },

  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px',
    minWidth: '44px',
    touchAction: 'manipulation'
  },

  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '20px',
    color: '#666',
    transition: 'all 0.2s ease',
    zIndex: 10,
  },

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