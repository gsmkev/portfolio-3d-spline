import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { commonStyles } from '../utils/styles';

const SplineScene = ({ onLoad, onMouseDown, onMouseHover }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleTouchStart = (e) => {
        // Prevenir zoom en mobile
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    };

    const handleTouchMove = (e) => {
        // Prevenir scroll horizontal en mobile
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const element = e.target;

            if (element.scrollLeft === 0 && touch.clientX > 0) {
                e.preventDefault();
            }

            if (element.scrollLeft + element.offsetWidth >= element.scrollWidth && touch.clientX < window.innerWidth) {
                e.preventDefault();
            }
        }
    };

    const splineConfig = {
        // Configuración específica para mobile según Spline 3D
        mobile: isMobile,
        // Deshabilitar zoom en mobile para mejor experiencia
        disableZoom: isMobile,
        // Configurar sensibilidad de pan para mobile
        panSensitivity: isMobile ? 0.5 : 1,
        // Configurar sensibilidad de rotación para mobile
        rotationSensitivity: isMobile ? 0.3 : 1,
        // Habilitar gestos táctiles
        enableTouch: true,
        // Configurar límites de zoom
        minZoom: isMobile ? 0.5 : 0.1,
        maxZoom: isMobile ? 2 : 5,
        // Configurar límites de pan
        panLimits: isMobile ? {
            x: [-50, 50],
            y: [-30, 30],
            z: [-20, 20]
        } : undefined
    };

    return (
        <div
            style={{
                ...commonStyles.splineContainer,
                touchAction: isMobile ? 'none' : 'auto',
                WebkitOverflowScrolling: 'touch'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <Spline
                scene="/scene.splinecode"
                onLoad={onLoad}
                onSplineMouseDown={onMouseDown}
                onSplineMouseHover={onMouseHover}
                style={{
                    ...commonStyles.splineContainer,
                    touchAction: isMobile ? 'none' : 'auto'
                }}
                {...splineConfig}
            />
        </div>
    );
};

export default SplineScene; 