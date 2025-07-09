import React from 'react';
import SplineScene from './components/SplineScene';
import Modal from './components/Modal';
import { useSplineRef } from './hooks/useSplineRef';
import { useModal } from './hooks/useModal';
import { useSplineAnimations } from './hooks/useSplineAnimations';
import { useSplineEvents } from './hooks/useSplineEvents';
import { commonStyles } from './utils/styles';

function App() {
    const { splineRef, onLoad } = useSplineRef();
    const { showDialog, dialogTitle, dialogContent, showContentDialog, closeDialog } = useModal();
    const { handleObjectClick, handleObjectHover } = useSplineAnimations();
    const { handleSplineMouseDown } = useSplineEvents(splineRef, showContentDialog);

    const handleMouseDown = (e) => {
        const objName = e.target.name;
        if (objName) handleObjectClick(objName, splineRef);
        handleSplineMouseDown(e);
    };

    const handleMouseHover = (e) => {
        const objName = e.target.name;
        if (objName) handleObjectHover(objName, splineRef);
    };

    return (
        <main style={commonStyles.mainContainer}>
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
