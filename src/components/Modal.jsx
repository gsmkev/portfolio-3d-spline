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
        justifyContent: isMobile ? 'center' : 'flex-end',
        alignItems: isMobile ? 'center' : 'stretch',
        zIndex: 1000,
        padding: 0,
        touchAction: 'manipulation',
    };

    const sidebarStyle = {
        backgroundColor: 'white',
        width: isMobile ? '100vw' : '600px',
        height: isMobile ? '100vh' : '100vh',
        maxWidth: isMobile ? '100vw' : '600px',
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

    const cardStyle = {
        background: '#f7f7fa',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        padding: '1.2rem 1rem',
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    };

    const cardTitleStyle = {
        fontWeight: 600,
        fontSize: '1.1rem',
        color: '#222',
        margin: 0,
        marginBottom: '0.5rem',
    };

    const cardContentStyle = {
        color: '#555',
        fontSize: '0.95rem',
        margin: 0,
        lineHeight: 1.6,
        whiteSpace: 'pre-line',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const formatContent = (text) => {
        if (!text) return '';

        const sections = text.split('\n\n');

        return sections.map((section, index) => {
            const lines = section.split('\n');
            const firstLine = lines[0];
            const remainingLines = lines.slice(1);

            const isTitle = firstLine.match(/^[🎓🏆📞👨‍💻💻🔬🎓💼🚀🔧]/);

            return (
                <div key={index} style={cardStyle}>
                    {isTitle && <h3 style={cardTitleStyle}>{firstLine}</h3>}
                    <div style={cardContentStyle}>
                        {isTitle ? remainingLines.join('\n') : section}
                    </div>
                </div>
            );
        });
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
                <div style={{ marginTop: '1rem' }}>
                    {formatContent(content)}
                </div>
            </div>
        </div>
    );
};

export default Modal; 