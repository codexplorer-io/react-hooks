import { useRef, useEffect } from 'react';
import { di } from 'react-magnetic-di';

export const usePrevious = value => {
    di(useEffect, useRef);

    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};
