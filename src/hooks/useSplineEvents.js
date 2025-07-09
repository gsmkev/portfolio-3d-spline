import { useCallback } from 'react';
import { INTERACTIVE_OBJECTS, DIALOG_CONTENT } from '../constants/objects';
import { audioService } from '../services/audioService';

export const useSplineEvents = (splineRef, showContentDialog) => {
  const handleSplineMouseDown = useCallback((e) => {
    const objName = e.target.name;
    if (!objName) return;

    const eventHandlers = {
      [INTERACTIVE_OBJECTS.SPEAKERS]: () => audioService.playMusic(),
      [INTERACTIVE_OBJECTS.DEVELOPMENT]: () => showContentDialog(
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.DEVELOPMENT].title,
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.DEVELOPMENT].content
      ),
      [INTERACTIVE_OBJECTS.RESEARCH]: () => showContentDialog(
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.RESEARCH].title,
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.RESEARCH].content
      ),
      [INTERACTIVE_OBJECTS.GUITAR]: () => audioService.playGuitarNotes(),
      [INTERACTIVE_OBJECTS.COURSES]: () => showContentDialog(
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.COURSES].title,
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.COURSES].content
      )
    };

    const handler = eventHandlers[objName];
    if (handler) handler();
  }, [showContentDialog]);

  return { handleSplineMouseDown };
}; 