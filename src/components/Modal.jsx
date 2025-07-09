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

    // Sidebar overlay y modal lateral
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: `rgba(0, 0, 0, ${MODAL_CONFIG.OVERLAY_OPACITY})`,
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'flex-end',
        alignItems: isMobile ? 'center' : 'stretch',
        zIndex: 1000,
        padding: 0,
        touchAction: 'manipulation',
    };

    const sidebarStyle = {
        backgroundColor: 'white',
        width: isMobile ? '100vw' : '400px',
        height: isMobile ? '100vh' : '100vh',
        maxWidth: isMobile ? '100vw' : '400px',
        maxHeight: '100vh',
        boxShadow: isMobile ? 'none' : '-2px 0 16px rgba(0,0,0,0.12)',
        borderRadius: isMobile ? 0 : '16px 0 0 16px',
        padding: isMobile ? '1.5rem 1rem' : '2rem 1.5rem',
        position: 'relative',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        animation: 'slideInSidebar 0.3s cubic-bezier(.4,1.3,.6,1)'
    };

    // Animación para el sidebar
    const styleSheet = document.styleSheets[0];
    if (styleSheet && !Array.from(styleSheet.cssRules).find(r => r.name === 'slideInSidebar')) {
        styleSheet.insertRule(`@keyframes slideInSidebar { from { transform: translateX(100%); } to { transform: translateX(0); } }`, styleSheet.cssRules.length);
    }

    const closeBtnStyle = {
        ...commonStyles.closeButton,
        top: isMobile ? '8px' : '10px',
        right: isMobile ? '8px' : '10px',
        fontSize: isMobile ? '18px' : '20px',
        background: '#f8f8f8',
        border: '1px solid #eee',
    };

    // Card style
    const cardStyle = {
        background: '#f7f7fa',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        padding: '1.2rem 1rem',
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    };
    const cardTitleStyle = {
        fontWeight: 600,
        fontSize: '1.1rem',
        color: '#222',
        margin: 0,
    };
    const cardContentStyle = {
        color: '#555',
        fontSize: '1rem',
        margin: 0,
        lineHeight: 1.5,
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Permitir que content sea string o array de cards
    const renderCards = () => {
        if (Array.isArray(content)) {
            return content.map((card, idx) => (
                <div key={idx} style={cardStyle}>
                    {card.title && <h3 style={cardTitleStyle}>{card.title}</h3>}
                    <div style={cardContentStyle}>{card.content}</div>
                </div>
            ));
        }
        // Si es string, mostrar una sola card
        return (
            <div style={cardStyle}>
                {title && <h3 style={cardTitleStyle}>{title}</h3>}
                <div style={cardContentStyle}>{content}</div>
            </div>
        );
    };

    return (
        <div style={overlayStyle} onClick={handleOverlayClick}>
            <div style={sidebarStyle}>
                <button
                    onClick={onClose}
                    style={closeBtnStyle}
                    aria-label="Cerrar"
                >
                    ✕
                </button>
                {renderCards()}
            </div>
        </div>
    );
};

export default Modal; 