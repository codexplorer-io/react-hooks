import { useRef, useEffect } from 'react';
import { di } from 'react-magnetic-di';

export const useOnMountEffect = ({
    onMount,
    onUnmount
}) => {
    di(useEffect, useRef);

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
