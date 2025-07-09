import { useCallback } from 'react';
import { INTERACTIVE_OBJECTS, DIALOG_CONTENT } from '../constants/objects';
import { audioService } from '../services/audioService';

export const useSplineEvents = (splineRef, showContentDialog) => {
  const handleSplineMouseDown = useCallback((e) => {
    const objName = e.target.name;
    if (!objName) return;

    const eventHandlers = {
      [INTERACTIVE_OBJECTS.EDUCATION]: () => showContentDialog(
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.EDUCATION].title,
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.EDUCATION].content
      ),
      [INTERACTIVE_OBJECTS.CERTIFICATIONS]: () => showContentDialog(
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.CERTIFICATIONS].title,
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.CERTIFICATIONS].content
      ),
      [INTERACTIVE_OBJECTS.CONTACT]: () => showContentDialog(
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.CONTACT].title,
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.CONTACT].content
      ),
      [INTERACTIVE_OBJECTS.ABOUT]: () => showContentDialog(
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.ABOUT].title,
        DIALOG_CONTENT[INTERACTIVE_OBJECTS.ABOUT].content
      ),
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