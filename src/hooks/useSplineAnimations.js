import { useCallback, useRef } from 'react';
import { ANIMATION_CONFIG } from '../constants/objects';

export const useSplineAnimations = () => {
  // Guardar posiciones originales de cada elemento
  const originalPositions = useRef(new Map());
  const animatingObjects = useRef(new Set());

  // Función de salto (reutilizable para click y hover)
  const performJump = useCallback((objName, splineRef) => {
    if (!objName || !splineRef.current) return;
    
    const obj = splineRef.current.findObjectByName(objName);
    if (!obj) return;

    // Si ya está animando, no iniciar otra animación
    if (animatingObjects.current.has(objName)) {
      return;
    }

    console.log('Salto para:', objName);

    // Guardar posición original si no existe
    if (!originalPositions.current.has(objName)) {
      originalPositions.current.set(objName, obj.position.y);
    }

    const originalY = originalPositions.current.get(objName);
    
    // Marcar como animando
    animatingObjects.current.add(objName);
    
    // Animación simple de salto
    const { LEVITATION_HEIGHT, ANIMATION_DURATION } = ANIMATION_CONFIG;
    let startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

      // Salto simple: sube y baja
      const jumpProgress = Math.sin(progress * Math.PI);
      obj.position.y = originalY + (LEVITATION_HEIGHT * jumpProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        obj.position.y = originalY; // Asegurar posición final exacta
        animatingObjects.current.delete(objName); // Ya no está animando
      }
    }

    animate();
  }, []);

  // Función para click
  const handleObjectClick = useCallback((objName, splineRef) => {
    performJump(objName, splineRef);
  }, [performJump]);

  // Función para hover
  const handleObjectHover = useCallback((objName, splineRef) => {
    performJump(objName, splineRef);
  }, [performJump]);

  return {
    handleObjectClick,
    handleObjectHover
  };
}; 