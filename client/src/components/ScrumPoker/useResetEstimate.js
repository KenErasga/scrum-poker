import { useState, useEffect } from 'react';
import { useSocket } from '../../providers/SocketIO';
import useEstimate from './useEstimate';

const useResetEstimate = () => {
    const { emitResetEstimate, onResetEstimate } = useSocket();
    const { estimate, setEstimate, estimates, setEstimates } = useEstimate();

    useEffect(() => {
        onResetEstimate(setEstimate);
    }, [estimates]);

    const handleResetEstimate =  () => {
        emitResetEstimate(setEstimate, 'N/A');
    };

    return {
        estimate,
        estimates,
        handleResetEstimate
    }
};

export default useResetEstimate;