// Estilos comunes para la aplicación
export const commonStyles = {
  // Contenedor principal
  mainContainer: {
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    position: 'relative'
  },

  // Estilos para el contenedor de Spline
  splineContainer: {
    width: '100vw',
    height: '100vh',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'block'
  },

  // Estilos para botones
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },

  // Estilos para el botón de cerrar modal
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
    transition: 'background-color 0.2s ease'
  }
}; 