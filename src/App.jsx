import React from 'react';
import SplineScene from './components/SplineScene';
import Modal from './components/Modal';
import { useSplineRef } from './hooks/useSplineRef';
import { useModal } from './hooks/useModal';
import { useSplineAnimations } from './hooks/useSplineAnimations';
import { useSplineEvents } from './hooks/useSplineEvents';
import { commonStyles } from './utils/styles';

function App() {
    // Hooks personalizados
    const { splineRef, onLoad } = useSplineRef();
    const { showDialog, dialogTitle, dialogContent, showContentDialog, closeDialog } = useModal();
    const { handleObjectClick, handleObjectHover } = useSplineAnimations();

    // Eventos de Spline
    const { handleSplineMouseDown } = useSplineEvents(splineRef, showContentDialog);

    // Manejar click en objetos
    const handleSplineMouseDownWithAnimation = (e) => {
        const objName = e.target.name;

        // Ejecutar animación de salto
        if (objName) {
            handleObjectClick(objName, splineRef);
        }

        // Ejecutar eventos originales (audio, modales, etc.)
        handleSplineMouseDown(e);
    };

    // Manejar hover en objetos
    const handleSplineMouseHover = (e) => {
        const objName = e.target.name;

        // Ejecutar animación de salto
        if (objName) {
            handleObjectHover(objName, splineRef);
        }
    };

    return (
        <main style={commonStyles.mainContainer}>
            <SplineScene
                onLoad={onLoad}
                onMouseDown={handleSplineMouseDownWithAnimation}
                onMouseHover={handleSplineMouseHover}
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
