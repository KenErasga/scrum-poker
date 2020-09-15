import { useState, useEffect } from 'react';
import { useSocket } from '../../providers/SocketIO';
import useEstimate from './useEstimate';

const useResetEstimate = (estimate, estimates, setEstimate) => {
    const { emitResetEstimate, onResetEstimate } = useSocket();

    useEffect(() => {
        onResetEstimate(setEstimate);
    }, [estimates]);

    const handleResetEstimate =  () => {
        emitResetEstimate();
    };

    return {
        estimate,
        estimates,
        handleResetEstimate
    }
};

export default useResetEstimate;