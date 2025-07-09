import { useRef, useCallback } from 'react';

export const useSplineRef = () => {
  const splineRef = useRef();

  const onLoad = useCallback((spline) => {
    splineRef.current = spline;
  }, []);

  return { splineRef, onLoad };
}; 