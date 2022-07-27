import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { di } from 'react-magnetic-di';

export const useDimensions = type => {
    di(useEffect, useState);

    const [data, setData] = useState(Dimensions.get(type));

    useEffect(() => {
        const handler = Dimensions.addEventListener('change', result => {
            setData(result[type]);
        });

        return () => {
            handler.remove();
        };
    }, [setData, type]);

    return data;
};
