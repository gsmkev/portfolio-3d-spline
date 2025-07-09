import React, { useEffect, useState, useCallback, useRef } from 'react';
import SplineScene from './components/SplineScene';
import Modal from './components/Modal';
import { useSplineRef } from './hooks/useSplineRef';
import { useModal } from './hooks/useModal';
import { useSplineAnimations } from './hooks/useSplineAnimations';
import { INTERACTIVE_OBJECTS } from './constants/objects';
import { audioService } from './services/audioService';
import { useCV } from './hooks/useCV';
import { commonStyles } from './utils/styles';
import { CV_CONFIG, CV_SECTIONS } from './config/cv';

function App() {
    const [isMobile, setIsMobile] = useState(false);
    const [language, setLanguage] = useState(CV_CONFIG.LANGUAGES.EN);
    const { cvData, loading, error, getContentForSection } = useCV(language);
    const { splineRef, onLoad } = useSplineRef();
    const { showDialog, dialogTitle, dialogContent, showContentDialog, closeDialog } = useModal();
    const { handleObjectClick, handleObjectHover } = useSplineAnimations();

    // Refs para mantener estado siempre actualizado
    const cvDataRef = useRef(cvData);
    const loadingRef = useRef(loading);
    const getContentForSectionRef = useRef(getContentForSection);

    // Actualizar refs cuando cambie el estado
    useEffect(() => {
        cvDataRef.current = cvData;
        loadingRef.current = loading;
        getContentForSectionRef.current = getContentForSection;
    }, [cvData, loading, getContentForSection]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const preventScroll = (e) => {
            if (isMobile) {
                e.preventDefault();
            }
        };

        if (isMobile) {
            document.addEventListener('touchmove', preventScroll, { passive: false });
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            document.removeEventListener('touchmove', preventScroll);
        };
    }, [isMobile]);

    const handleMouseDown = useCallback((e) => {
        const objName = e.target.name;
        if (objName) {
            handleObjectClick(objName, splineRef);
        }
        handleSplineMouseDown(e);
    }, [handleObjectClick, splineRef]);

    const handleMouseHover = useCallback((e) => {
        const objName = e.target.name;
        if (objName) handleObjectHover(objName, splineRef);
    }, [handleObjectHover, splineRef]);

    const handleSplineMouseDown = useCallback((e) => {
        const objName = e.target.name;
        if (!objName) return;

        const eventHandlers = {
            [INTERACTIVE_OBJECTS.EDUCATION]: () => {
                const content = getContentForSectionRef.current(CV_SECTIONS.EDUCATION);
                showContentDialog('📚 Educación', content);
            },
            [INTERACTIVE_OBJECTS.CERTIFICATIONS]: () => {
                const content = getContentForSectionRef.current(CV_SECTIONS.CERTIFICATIONS);
                showContentDialog('🏆 Certificaciones', content);
            },
            [INTERACTIVE_OBJECTS.CONTACT]: () => {
                const content = getContentForSectionRef.current(CV_SECTIONS.CONTACT);
                showContentDialog('📞 Contacto', content);
            },
            [INTERACTIVE_OBJECTS.ABOUT]: () => {
                const content = getContentForSectionRef.current(CV_SECTIONS.ABOUT);
                showContentDialog('👨‍💻 Acerca de mí', content);
            },
            [INTERACTIVE_OBJECTS.DEVELOPMENT]: () => {
                const content = getContentForSectionRef.current(CV_SECTIONS.DEVELOPMENT);
                showContentDialog('💻 Proyectos', content);
            },
            [INTERACTIVE_OBJECTS.RESEARCH]: () => {
                const content = getContentForSectionRef.current(CV_SECTIONS.RESEARCH);
                showContentDialog('🔬 Investigación', content);
            },
            [INTERACTIVE_OBJECTS.GUITAR]: () => {
                audioService.playGuitarNotes();
            },
            [INTERACTIVE_OBJECTS.COURSES]: () => {
                const content = getContentForSectionRef.current(CV_SECTIONS.COURSES);
                showContentDialog('🎓 Cursos y Certificaciones', content);
            }
        };

        const handler = eventHandlers[objName];
        if (handler) {
            handler();
        }
    }, [showContentDialog]);

    const toggleLanguage = useCallback(() => {
        setLanguage(prev => prev === CV_CONFIG.LANGUAGES.EN ? CV_CONFIG.LANGUAGES.ES : CV_CONFIG.LANGUAGES.EN);
    }, []);

    const containerStyle = isMobile
        ? { ...commonStyles.mainContainer, ...commonStyles.mobileStyles.mainContainer }
        : commonStyles.mainContainer;

    return (
        <main style={containerStyle}>
            {/* Selector de idioma */}
            <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000,
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif',
                transition: 'background 0.3s ease'
            }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
                onClick={toggleLanguage}
            >
                {language === CV_CONFIG.LANGUAGES.EN ? '🇪🇸 ES' : '🇺🇸 EN'}
            </div>

            <SplineScene
                onLoad={onLoad}
                onMouseDown={handleMouseDown}
                onMouseHover={handleMouseHover}
            />
            <Modal
                isOpen={showDialog}
                onClose={closeDialog}
                title={dialogTitle}
                content={dialogContent}
            />
        </main>
    );
}

export default App;
