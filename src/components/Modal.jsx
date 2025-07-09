import React, { useEffect, useState } from 'react';
import { MODAL_CONFIG } from '../constants/objects';
import { commonStyles } from '../utils/styles';

const CONTENT_TYPES = [
    'EDUCATION', 'CERTIFICATION', 'POSITION', 'PROJECT', 'SKILLS',
    'Phone', 'Email', 'LinkedIn', 'GitHub'
];

const Modal = ({ isOpen, onClose, title, content }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);

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
        justifyContent: isMobile ? 'center' : 'flex-end',
        alignItems: isMobile ? 'center' : 'stretch',
        zIndex: 1000,
        padding: 0,
        touchAction: 'manipulation',
        backdropFilter: 'blur(4px)',
    };

    const sidebarStyle = {
        backgroundColor: '#fafafa',
        width: isMobile ? '100vw' : '750px',
        height: isMobile ? '100vh' : '100vh',
        maxWidth: isMobile ? '100vw' : '750px',
        maxHeight: '100vh',
        boxShadow: isMobile ? 'none' : '-8px 0 32px rgba(0,0,0,0.2)',
        borderRadius: isMobile ? 0 : '24px 0 0 24px',
        padding: isMobile ? '1rem' : '2.5rem',
        position: 'relative',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        animation: 'slideInSidebar 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    };

    // Animación para el sidebar
    const styleSheet = document.styleSheets[0];
    if (styleSheet && !Array.from(styleSheet.cssRules).find(r => r.name === 'slideInSidebar')) {
        styleSheet.insertRule(`@keyframes slideInSidebar { 
      from { transform: translateX(100%); opacity: 0; } 
      to { transform: translateX(0); opacity: 1; } 
    }`, styleSheet.cssRules.length);
    }

    const closeBtnStyle = {
        position: 'absolute',
        top: isMobile ? '16px' : '20px',
        right: isMobile ? '16px' : '20px',
        fontSize: isMobile ? '22px' : '26px',
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '50%',
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        color: '#666',
        zIndex: 10,
    };

    const contentGridStyle = {
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '1.25rem',
        marginTop: '1rem',
        paddingTop: '1rem',
    };

    const cardStyle = {
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        padding: '1.75rem',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '120px',
    };

    const cardHoverStyle = {
        transform: 'translateY(-4px) scale(1.02)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
        borderColor: 'rgba(0, 0, 0, 0.08)',
    };

    const cardTitleStyle = {
        fontWeight: 700,
        fontSize: '1.15rem',
        color: '#1a1a1a',
        margin: 0,
        marginBottom: '1rem',
        lineHeight: 1.3,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    };

    const cardContentStyle = {
        color: '#4a4a4a',
        fontSize: '0.92rem',
        margin: 0,
        lineHeight: 1.7,
        whiteSpace: 'pre-line',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transform: 'none',
        boxShadow: 'none',
        borderColor: 'transparent',
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleCardHover = (e, isEntering) => {
        const cardElement = e.currentTarget;
        if (isEntering) {
            cardElement.style.transform = cardHoverStyle.transform;
            cardElement.style.boxShadow = cardHoverStyle.boxShadow;
            cardElement.style.borderColor = cardHoverStyle.borderColor;
        } else {
            cardElement.style.transform = 'translateY(0) scale(1)';
            cardElement.style.boxShadow = cardStyle.boxShadow;
            cardElement.style.borderColor = cardStyle.borderColor;
        }
    };

    const formatContent = (text) => {
        if (!text) return '';

        const sections = text.split('\n\n');

        return sections.map((section, index) => {
            const lines = section.split('\n');
            const firstLine = lines[0];
            const remainingLines = lines.slice(1);

            const typeMatch = firstLine.match(new RegExp(`^(${CONTENT_TYPES.join('|')}):`));

            if (typeMatch) {
                const type = typeMatch[1];
                const title = firstLine.replace(new RegExp(`^(${CONTENT_TYPES.join('|')}):`), '').trim();

                return (
                    <div
                        key={index}
                        style={cardStyle}
                        onMouseEnter={(e) => handleCardHover(e, true)}
                        onMouseLeave={(e) => handleCardHover(e, false)}
                    >
                        <h3 style={cardTitleStyle}>
                            <span style={{
                                fontSize: '0.9rem',
                                color: '#666',
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {type}
                            </span>
                        </h3>
                        <div style={{
                            ...cardTitleStyle,
                            fontSize: '1.1rem',
                            marginBottom: '0.75rem',
                            color: '#1a1a1a'
                        }}>
                            {title}
                        </div>
                        <div style={cardContentStyle}>
                            {remainingLines.join('\n')}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div
                        key={index}
                        style={{
                            ...cardStyle,
                            gridColumn: isMobile ? '1' : 'span 2',
                            background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                        }}
                        onMouseEnter={(e) => handleCardHover(e, true)}
                        onMouseLeave={(e) => handleCardHover(e, false)}
                    >
                        <div style={cardContentStyle}>
                            {section}
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <div style={overlayStyle} onClick={handleOverlayClick}>
            <div style={sidebarStyle}>
                <button
                    onClick={onClose}
                    style={closeBtnStyle}
                    aria-label="Cerrar"
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 1)';
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.color = '#333';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                        e.target.style.transform = 'scale(1)';
                        e.target.style.color = '#666';
                    }}
                >
                    ✕
                </button>

                <div style={contentGridStyle}>
                    {formatContent(content)}
                </div>
            </div>
        </div>
    );
};

export default Modal; 