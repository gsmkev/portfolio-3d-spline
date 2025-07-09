import { useCallback, useRef } from 'react';
import { ANIMATION_CONFIG } from '../constants/objects';

export const useSplineAnimations = () => {
  const originalPositions = useRef(new Map());
  const animatingObjects = useRef(new Set());

  const jumpAnimation = useCallback((objName, splineRef) => {
    if (!objName || !splineRef.current) return;
    
    const obj = splineRef.current.findObjectByName(objName);
    if (!obj || animatingObjects.current.has(objName)) return;

    // Guardar posición original si es la primera vez
    if (!originalPositions.current.has(objName)) {
      originalPositions.current.set(objName, obj.position.y);
    }

    const originalY = originalPositions.current.get(objName);
    animatingObjects.current.add(objName);
    
    const { LEVITATION_HEIGHT, ANIMATION_DURATION } = ANIMATION_CONFIG;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
      const jumpProgress = Math.sin(progress * Math.PI);
      
      obj.position.y = originalY + (LEVITATION_HEIGHT * jumpProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        obj.position.y = originalY;
        animatingObjects.current.delete(objName);
      }
    };

    animate();
  }, []);

  return {
    handleObjectClick: jumpAnimation,
    handleObjectHover: jumpAnimation
  };
}; 