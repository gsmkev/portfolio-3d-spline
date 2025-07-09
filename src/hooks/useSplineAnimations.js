import { useState, useRef, useCallback } from 'react';
import { ANIMATION_CONFIG } from '../constants/objects';

export const useSplineAnimations = () => {
  const [hoveredObjects, setHoveredObjects] = useState(new Set());
  const [animationFrames, setAnimationFrames] = useState(new Map());
  const hoveredObjectsRef = useRef(new Set());

  // Iniciar animación de levitación
  const startLevitatingAnimation = useCallback((objName, originalY, splineRef) => {
    const obj = splineRef.current?.findObjectByName(objName);
    if (!obj) return;

    const { LEVITATION_HEIGHT, ANIMATION_DURATION } = ANIMATION_CONFIG;
    let startTime = Date.now();

    function animate() {
      // Verificar si el objeto sigue en hover usando la referencia directa
      if (!hoveredObjectsRef.current.has(objName)) {
        // Si ya no está en hover, regresar a posición original y detener
        console.log('Deteniendo animación para:', objName);
        obj.position.y = originalY;
        return;
      }

      const elapsed = Date.now() - startTime;
      const progress = (elapsed % ANIMATION_DURATION) / ANIMATION_DURATION;

      // Función sinusoidal para movimiento suave arriba y abajo
      // Usar valor absoluto para que solo suba, no baje más allá de la posición original
      const levitationProgress = Math.abs(Math.sin(progress * Math.PI * 2));
      obj.position.y = originalY + (LEVITATION_HEIGHT * levitationProgress);

      // Continuar animación
      const frameId = requestAnimationFrame(animate);
      setAnimationFrames(prev => new Map(prev).set(objName, frameId));
    }

    animate();
  }, []);

  // Manejar hover de objetos
  const handleObjectHover = useCallback((objName, splineRef) => {
    if (objName && splineRef.current && !hoveredObjectsRef.current.has(objName)) {
      const obj = splineRef.current.findObjectByName(objName);
      if (obj) {
        console.log('Iniciando levitación:', objName);

        // Marcar objeto como en hover (ambos estado y referencia)
        setHoveredObjects(prev => new Set(prev).add(objName));
        hoveredObjectsRef.current.add(objName);

        // Guardar posición original
        const originalY = obj.position.y;
        obj.userData = obj.userData || {};
        obj.userData.originalY = originalY;

        // Iniciar animación de levitación continua
        startLevitatingAnimation(objName, originalY, splineRef);
      }
    }
  }, [startLevitatingAnimation]);

  // Manejar salida de hover de objetos
  const handleObjectOut = useCallback((objName, splineRef) => {
    if (objName && hoveredObjectsRef.current.has(objName)) {
      console.log('Deteniendo levitación para:', objName);

      // Remover de objetos en hover (ambos estado y referencia)
      setHoveredObjects(prev => {
        const newSet = new Set(prev);
        newSet.delete(objName);
        return newSet;
      });
      hoveredObjectsRef.current.delete(objName);

      // Cancelar animación
      const frameId = animationFrames.get(objName);
      if (frameId) {
        cancelAnimationFrame(frameId);
        setAnimationFrames(prev => {
          const newMap = new Map(prev);
          newMap.delete(objName);
          return newMap;
        });
      }

      // Regresar a posición original
      const obj = splineRef.current?.findObjectByName(objName);
      if (obj && obj.userData.originalY !== undefined) {
        obj.position.y = obj.userData.originalY;
      }
    }
  }, [animationFrames]);

  // Limpiar todas las animaciones
  const cleanupAnimations = useCallback(() => {
    animationFrames.forEach(frameId => {
      cancelAnimationFrame(frameId);
    });
    setAnimationFrames(new Map());
    setHoveredObjects(new Set());
    hoveredObjectsRef.current.clear();
  }, [animationFrames]);

  return {
    hoveredObjects,
    handleObjectHover,
    handleObjectOut,
    cleanupAnimations
  };
}; 