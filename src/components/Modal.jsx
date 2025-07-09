import React from 'react';
import { MODAL_CONFIG } from '../constants/objects';
import { commonStyles } from '../utils/styles';

const Modal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: `rgba(0, 0, 0, ${MODAL_CONFIG.OVERLAY_OPACITY})`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}
            onClick={onClose} // Cerrar al hacer click en el overlay
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '10px',
                    maxWidth: MODAL_CONFIG.MAX_WIDTH,
                    maxHeight: MODAL_CONFIG.MAX_HEIGHT,
                    overflow: 'auto',
                    position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()} // Evitar que se cierre al hacer click en el contenido
            >
                <button
                    onClick={onClose}
                    style={commonStyles.closeButton}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f0f0f0';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                    }}
                >
                    ✕
                </button>

                <h2 style={{
                    marginTop: 0,
                    color: '#333',
                    fontSize: '1.5rem',
                    marginBottom: '1rem'
                }}>
                    {title}
                </h2>

                <p style={{
                    color: '#666',
                    lineHeight: '1.6',
                    margin: 0,
                    fontSize: '1rem'
                }}>
                    {content}
                </p>
            </div>
        </div>
    );
};

export default Modal; 