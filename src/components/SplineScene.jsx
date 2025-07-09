import React from 'react';
import Spline from '@splinetool/react-spline';
import { commonStyles } from '../utils/styles';

const SplineScene = ({
    onLoad,
    onMouseDown
}) => {
    return (
        <Spline
            scene="/scene.splinecode"
            onLoad={onLoad}
            onSplineMouseDown={onMouseDown}
            style={commonStyles.splineContainer}
        />
    );
};

export default SplineScene; 