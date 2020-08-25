import {useState, useEffect} from 'react';
import {onEstimate, emitSendEstimate} from '../../providers/SocketIO/SocketIO';

const useEstimate = () => {
    const [estimate, setEstimate] = useState("1");
    const [estimates, setEstimates] = useState([]);

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