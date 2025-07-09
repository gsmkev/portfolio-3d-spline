import React, { useEffect, useState } from 'react';
import { MODAL_CONFIG } from '../constants/objects';
import { commonStyles } from '../utils/styles';

const Modal = ({ isOpen, onClose, title, content }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!isOpen) return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: `rgba(0, 0, 0, ${MODAL_CONFIG.OVERLAY_OPACITY})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        // Mejoras para mobile
        padding: isMobile ? '1rem' : '0',
        touchAction: 'manipulation'
    };

    const modalStyle = {
        backgroundColor: 'white',
        padding: isMobile ? '1.5rem' : '2rem',
        borderRadius: isMobile ? '8px' : '10px',
        maxWidth: isMobile ? 'calc(100vw - 2rem)' : MODAL_CONFIG.MAX_WIDTH,
        maxHeight: isMobile ? 'calc(100vh - 2rem)' : MODAL_CONFIG.MAX_HEIGHT,
        width: isMobile ? '100%' : 'auto',
        overflow: 'auto',
        position: 'relative',
        // Mejoras para mobile
        touchAction: 'manipulation',
        WebkitOverflowScrolling: 'touch',
        // Prevenir scroll horizontal
        overflowX: 'hidden',
        // Mejorar legibilidad en mobile
        fontSize: isMobile ? '16px' : 'inherit'
    };

    const titleStyle = {
        marginTop: 0,
        color: '#333',
        fontSize: isMobile ? '1.25rem' : '1.5rem',
        marginBottom: '1rem',
        lineHeight: '1.3',
        // Prevenir wrap de palabras largas
        wordBreak: 'break-word'
    };

    const contentStyle = {
        color: '#666',
        lineHeight: '1.6',
        margin: 0,
        fontSize: isMobile ? '0.95rem' : '1rem',
        // Mejorar legibilidad en mobile
        textAlign: 'left',
        // Prevenir scroll horizontal
        wordBreak: 'break-word',
        overflowWrap: 'break-word'
    };

    const handleOverlayClick = (e) => {
        // Solo cerrar si se hace clic en el overlay, no en el modal
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div style={overlayStyle} onClick={handleOverlayClick}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    style={{
                        ...commonStyles.closeButton,
                        // Ajustes específicos para mobile
                        top: isMobile ? '8px' : '10px',
                        right: isMobile ? '8px' : '10px',
                        fontSize: isMobile ? '18px' : '20px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    onTouchStart={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                    onTouchEnd={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    ✕
                </button>
                <h2 style={titleStyle}>{title}</h2>
                <p style={contentStyle}>{content}</p>
            </div>
        </div>
    );
};

export default Modal; 