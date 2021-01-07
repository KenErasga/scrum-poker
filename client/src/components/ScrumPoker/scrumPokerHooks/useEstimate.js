import { useState, useEffect } from 'react';
import { useSocket } from '../../../providers/SocketIO';

const useEstimate = () => {
    const [estimate, setEstimate] = useState('N/A');
    const [estimates, setEstimates] = useState([]);

    const { onEstimate, emitSendEstimate } = useSocket();

    useEffect(() => {
        onEstimate(setEstimates);
    }, [estimates, estimate]);

    const handleEstimate = (e) => {
        emitSendEstimate(setEstimate, e);
    };

    return {
        estimate,
        estimates,
        setEstimate,
        setEstimates,
        handleEstimate
    }
};

export default useEstimate;