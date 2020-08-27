import { useState, useEffect } from 'react';
import { useSocket } from '../../providers/SocketIO/SocketIO';

const useExpand = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandAll, setExpandAll] = useState(false);

    const { onExpand, emitExpand } = useSocket();

    useEffect(() => {
        onExpand(setExpandAll, isExpanded);
    }, [isExpanded]);

    const handleExpandClick = async (e) => {
        e.preventDefault();

        setIsExpanded(!isExpanded);

        emitExpand(isExpanded);
    };
    return {
        isExpanded,
        expandAll,
        handleExpandClick
    }
};

export default useExpand;