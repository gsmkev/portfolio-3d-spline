// Nombres de objetos interactivos en la escena Spline
export const INTERACTIVE_OBJECTS = {
  EDUCATION: 'education',
  CERTIFICATIONS: 'certifications',
  CONTACT: 'contact',
  ABOUT: 'about',
  DEVELOPMENT: 'development',
  RESEARCH: 'research',
  GUITAR: 'guitar',
  COURSES: 'courses'
};

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  LEVITATION_HEIGHT: 20,
  ANIMATION_DURATION: 400
};

// Configuración del modal
export const MODAL_CONFIG = {
  MAX_WIDTH: '500px',
  MAX_HEIGHT: '400px',
  OVERLAY_OPACITY: 0.7
};

// Contenido de los diálogos
export const DIALOG_CONTENT = {
  [INTERACTIVE_OBJECTS.EDUCATION]: {
    title: 'Educación',
    content: 'Aquí irá tu información educativa...'
  },
  [INTERACTIVE_OBJECTS.CERTIFICATIONS]: {
    title: 'Certificaciones',
    content: 'Aquí irán tus certificaciones...'
  },
  [INTERACTIVE_OBJECTS.CONTACT]: {
    title: 'Contacto',
    content: 'Aquí irá tu información de contacto...'
  },
  [INTERACTIVE_OBJECTS.ABOUT]: {
    title: 'Acerca de mí',
    content: 'Aquí irá información sobre ti...'
  },
  [INTERACTIVE_OBJECTS.DEVELOPMENT]: {
    title: 'Desarrollo',
    content: 'Aquí irán tus proyectos de desarrollo...'
  },
  [INTERACTIVE_OBJECTS.RESEARCH]: {
    title: 'Investigación',
    content: 'Aquí irán tus investigaciones...'
  },
  [INTERACTIVE_OBJECTS.COURSES]: {
    title: 'Cursos y Certificaciones',
    content: 'Aquí irán tus cursos y certificaciones...'
  }
}; 