import { useCallback } from 'react';
import { INTERACTIVE_OBJECTS, DIALOG_CONTENT } from '../constants/objects';
import { audioService } from '../services/audioService';

export const useSplineEvents = (splineRef, showContentDialog) => {
  // Manejar click en objetos
  const handleSplineMouseDown = useCallback((e) => {
    console.log('Mouse down en:', e.target);
    console.log('Nombre del objeto:', e.target.name);

    const objName = e.target.name;

    switch (objName) {
      case INTERACTIVE_OBJECTS.SPEAKERS:
        audioService.playMusic();
        break;
      case INTERACTIVE_OBJECTS.DEVELOPMENT:
        showContentDialog(
          DIALOG_CONTENT[INTERACTIVE_OBJECTS.DEVELOPMENT].title,
          DIALOG_CONTENT[INTERACTIVE_OBJECTS.DEVELOPMENT].content
        );
        break;
      case INTERACTIVE_OBJECTS.RESEARCH:
        showContentDialog(
          DIALOG_CONTENT[INTERACTIVE_OBJECTS.RESEARCH].title,
          DIALOG_CONTENT[INTERACTIVE_OBJECTS.RESEARCH].content
        );
        break;
      case INTERACTIVE_OBJECTS.GUITAR:
        audioService.playGuitarNotes();
        break;
      case INTERACTIVE_OBJECTS.COURSES:
        showContentDialog(
          DIALOG_CONTENT[INTERACTIVE_OBJECTS.COURSES].title,
          DIALOG_CONTENT[INTERACTIVE_OBJECTS.COURSES].content
        );
        break;
      default:
        break;
    }
  }, [showContentDialog]);

  // Manejar hover en objetos
  const handleSplineMouseHover = useCallback((e) => {
    const objName = e.target.name;
    if (objName) {
      // Esta función será proporcionada por el hook de animaciones
      return objName;
    }
  }, []);

  // Manejar salida de hover en objetos
  const handleSplineMouseOut = useCallback((e) => {
    const objName = e.target.name;
    if (objName) {
      // Esta función será proporcionada por el hook de animaciones
      return objName;
    }
  }, []);

  return {
    handleSplineMouseDown,
    handleSplineMouseHover,
    handleSplineMouseOut
  };
}; 