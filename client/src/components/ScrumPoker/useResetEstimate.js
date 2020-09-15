import { useState, useEffect } from 'react';
import { useSocket } from '../../providers/SocketIO';
import useEstimate from './useEstimate';

const useResetEstimate = (estimate, estimates, setEstimate) => {
    const { emitResetEstimate, onResetEstimate, emitExpand } = useSocket();

    useEffect(() => {
        onResetEstimate(setEstimate);
    }, [estimates]);

    const handleResetEstimate = () => {
        setEstimate("N/A");
        emitResetEstimate();
        emitExpand(true);
    };

    return {
        estimate,
        estimates,
        handleResetEstimate
    }
};

export default useResetEstimate;