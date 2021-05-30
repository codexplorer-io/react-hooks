import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { di } from 'react-magnetic-di';

export const useDimensions = type => {
    di(useEffect, useState);

    const [data, setData] = useState(Dimensions.get(type));

    useEffect(() => {
        const onChange = result => {
            setData(result[type]);
        };

        Dimensions.addEventListener('change', onChange);

        return () => {
            Dimensions.removeEventListener('change', onChange);
        };
    }, [setData, type]);

    return data;
};
