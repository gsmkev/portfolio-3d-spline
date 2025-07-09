import React from 'react';
import Spline from '@splinetool/react-spline';
import { commonStyles } from '../utils/styles';

const SplineScene = ({ onLoad, onMouseDown, onMouseHover }) => (
    <Spline
        scene="/scene.splinecode"
        onLoad={onLoad}
        onSplineMouseDown={onMouseDown}
        onSplineMouseHover={onMouseHover}
        style={commonStyles.splineContainer}
    />
);

export default SplineScene; 