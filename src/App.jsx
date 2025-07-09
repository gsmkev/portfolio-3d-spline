import React, { useEffect, useState } from 'react';
import SplineScene from './components/SplineScene';
import Modal from './components/Modal';
import { useSplineRef } from './hooks/useSplineRef';
import { useModal } from './hooks/useModal';
import { useSplineAnimations } from './hooks/useSplineAnimations';
import { useSplineEvents } from './hooks/useSplineEvents';
import { commonStyles } from './utils/styles';

function App() {
    const [isMobile, setIsMobile] = useState(false);
    const { splineRef, onLoad } = useSplineRef();
    const { showDialog, dialogTitle, dialogContent, showContentDialog, closeDialog } = useModal();
    const { handleObjectClick, handleObjectHover } = useSplineAnimations();
    const { handleSplineMouseDown } = useSplineEvents(splineRef, showContentDialog);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Prevenir scroll en mobile
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

    const handleMouseDown = (e) => {
        const objName = e.target.name;
        if (objName) handleObjectClick(objName, splineRef);
        handleSplineMouseDown(e);
    };

    const handleMouseHover = (e) => {
        const objName = e.target.name;
        if (objName) handleObjectHover(objName, splineRef);
    };

    // Aplicar estilos específicos para mobile
    const containerStyle = isMobile
        ? { ...commonStyles.mainContainer, ...commonStyles.mobileStyles.mainContainer }
        : commonStyles.mainContainer;

    return (
        <main style={containerStyle}>
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
