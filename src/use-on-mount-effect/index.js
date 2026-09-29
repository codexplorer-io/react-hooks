import { useRef, useEffect } from 'react';

export const useOnMountEffect = ({
    onMount,
    onUnmount
}) => {
    const dependenciesRef = useRef();
    dependenciesRef.current = {
        onMount,
        onUnmount
    };

    useEffect(() => {
        const {
            onMount,
            onUnmount
        } = dependenciesRef.current;

        onMount?.();

        return () => {
            onUnmount?.();
        };
    }, []);
};
