// Application configuration
export const APP_CONFIG = {
  MOBILE_BREAKPOINT: 768,
  ANIMATION_DURATION: 400,
  LEVITATION_HEIGHT: 20,
  MODAL_OVERLAY_OPACITY: 0.7,
  MODAL_WIDTH: {
    MOBILE: '100vw',
    DESKTOP: '750px'
  },
  MODAL_PADDING: {
    MOBILE: '1rem',
    DESKTOP: '2.5rem'
  }
};

// Content types for CV sections
export const CONTENT_TYPES = {
  EDUCATION: 'EDUCATION',
  CERTIFICATION: 'CERTIFICATION',
  POSITION: 'POSITION',
  PROJECT: 'PROJECT',
  SKILLS: 'SKILLS',
  Phone: 'Phone',
  Email: 'Email',
  LinkedIn: 'LinkedIn',
  GitHub: 'GitHub'
};

// Animation easing functions
export const EASING = {
  SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
  BOUNCE: 'cubic-bezier(0.16, 1, 0.3, 1)',
  EASE: 'ease'
}; 