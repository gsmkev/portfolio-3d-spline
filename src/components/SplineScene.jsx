import React from 'react';
import Spline from '@splinetool/react-spline';
import { commonStyles } from '../utils/styles';

const SplineScene = ({
    onLoad,
    onMouseDown,
    onMouseHover,
    onMouseOut
}) => {
    return (
        <Spline
            scene="/scene.splinecode"
            onLoad={onLoad}
            onSplineMouseDown={onMouseDown}
            onSplineMouseHover={onMouseHover}
            onSplineMouseOut={onMouseOut}
            style={commonStyles.splineContainer}
        />
    );
};

export default SplineScene; 