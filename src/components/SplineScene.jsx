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
            />
        </div>
    );
};

export default SplineScene; 