// Configuración del CV
export const CV_CONFIG = {
  GIST_BASE_URL: 'https://gist.githubusercontent.com/gsmkev/252dc8cc2c8ed9ece6d717350e3932b2/raw',
  LANGUAGES: {
    EN: 'en',
    ES: 'es'
  },
  FILES: {
    EN: 'cv_en.yml',
    ES: 'cv_es.yml'
  }
};

// Mapeo de secciones del CV
export const CV_SECTIONS = {
  EDUCATION: 'education',
  CERTIFICATIONS: 'certifications',
  CONTACT: 'contact',
  ABOUT: 'about',
  DEVELOPMENT: 'development',
  RESEARCH: 'research',
  COURSES: 'courses'
};

// Títulos de los modales
export const MODAL_TITLES = {
  [CV_SECTIONS.EDUCATION]: '📚 Educación',
  [CV_SECTIONS.CERTIFICATIONS]: '🏆 Certificaciones',
  [CV_SECTIONS.CONTACT]: '📞 Contacto',
  [CV_SECTIONS.ABOUT]: '👨‍💻 Acerca de mí',
  [CV_SECTIONS.DEVELOPMENT]: '💻 Proyectos',
  [CV_SECTIONS.RESEARCH]: '🔬 Investigación',
  [CV_SECTIONS.COURSES]: '🎓 Cursos y Certificaciones'
}; 