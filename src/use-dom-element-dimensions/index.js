import { useEffect, useState } from 'react';

export const useDomElementDimensions = ({ elementRef }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const getDimensions = () => ({
            width: elementRef.current.offsetWidth,
            height: elementRef.current.offsetHeight
        });

        const handleResize = () => {
            elementRef.current && setDimensions(getDimensions());
        };

        elementRef.current && setDimensions(getDimensions());

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [elementRef]);

    return dimensions;
};
