import { useEffect } from 'react';
import { useSocket } from '../../../providers/SocketIO';

const useResetEstimate = (estimate, estimates, setEstimate) => {
    const { emitResetEstimate, onResetEstimate, emitExpand } = useSocket();

    useEffect(() => {
        onResetEstimate(setEstimate);
    }, [estimates]);

    const handleResetEstimate = () => {
        setEstimate("?");
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