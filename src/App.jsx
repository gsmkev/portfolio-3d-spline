import React, { useEffect } from 'react';
import SplineScene from './components/SplineScene';
import Modal from './components/Modal';
import { useSplineRef } from './hooks/useSplineRef';
import { useModal } from './hooks/useModal';
import { useSplineAnimations } from './hooks/useSplineAnimations';
import { useSplineEvents } from './hooks/useSplineEvents';
import { commonStyles } from './utils/styles';
import { audioService } from './services/audioService';

function App() {
    // Hooks personalizados
    const { splineRef, onLoad } = useSplineRef();
    const { showDialog, dialogTitle, dialogContent, showContentDialog, closeDialog } = useModal();
    const { handleObjectHover, handleObjectOut, cleanupAnimations } = useSplineAnimations();

    // Eventos de Spline
    const { handleSplineMouseDown } = useSplineEvents(splineRef, showContentDialog);

    // Manejar hover y out de objetos
    const handleSplineMouseHover = (e) => {
        const objName = e.target.name;
        if (objName) {
            handleObjectHover(objName, splineRef);
        }
    };

    const handleSplineMouseOut = (e) => {
        const objName = e.target.name;
        if (objName) {
            handleObjectOut(objName, splineRef);
        }
    };

    // Limpiar recursos al desmontar el componente
    useEffect(() => {
        return () => {
            cleanupAnimations();
            audioService.stopAllAudio();
        };
    }, [cleanupAnimations]);

    return (
        <main style={commonStyles.mainContainer}>
            <SplineScene
                onLoad={onLoad}
                onMouseDown={handleSplineMouseDown}
                onMouseHover={handleSplineMouseHover}
                onMouseOut={handleSplineMouseOut}
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
