import React, { useEffect } from 'react';
import { XIcon } from './Icons';

interface ToastProps {
    message: string;
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 5000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className="fixed top-5 right-5 z-50 bg-accent text-white p-4 rounded-lg shadow-lg flex items-center gap-4 animate-slide-in">
            <p className="text-sm font-semibold">{message}</p>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
                <XIcon className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Toast;