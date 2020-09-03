import { useState, useEffect } from 'react';
import { useSocket } from '../../providers/SocketIO';

const useEstimate = () => {
    const [estimate, setEstimate] = useState("1");
    const [estimates, setEstimates] = useState([]);

    const { onEstimate, emitSendEstimate } = useSocket();

    useEffect(() => {
        onEstimate(setEstimates);
    }, [estimates]);

    const handleEstimate = (e) => {
        emitSendEstimate(setEstimate, e);
    };

    return {
        estimate,
        estimates,
        handleEstimate
    }
};

export default useEstimate;