import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { injectable } from 'react-magnetic-di';
import { mountWithDi } from '@codexporer.io/react-test-utils';
import { useDimensions } from './index';

Dimensions.get = type => ({ width: `type: ${type}` });
const removeEventListener = jest.fn();
Dimensions.addEventListener = jest.fn(() => ({ remove: removeEventListener }));

describe('useDimensions', () => {
    const createHookRenderer = ({ result, type = 'window' }) => () => {
        const dimensions = useDimensions(type);
        result.dimensions = dimensions;
        return null;
    };

    const createMockUseState = ({
        data = 1000,
        setData = jest.fn()
    }) => jest.fn().mockReturnValue([data, setData]);

    const mockUseEffect = jest.fn(fn => fn());

    const defaultDeps = [
        injectable(useEffect, mockUseEffect)
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return dimensions', () => {
        const result = {};
        const Renderer = createHookRenderer({ result });

        mountWithDi(<Renderer />, {
            deps: defaultDeps
        });

        expect(result.dimensions).toEqual({ width: 'type: window' });
    });

    it('should add event listener', () => {
        const result = {};
        const Renderer = createHookRenderer({ result });

        mountWithDi(<Renderer />, {
            deps: defaultDeps
        });

        expect(Dimensions.addEventListener).toHaveBeenCalledTimes(1);
        expect(Dimensions.addEventListener).toHaveBeenNthCalledWith(
            1,
            'change',
            expect.any(Function)
        );
    });

    it('should set data when listener is invoked', () => {
        const result = {};
        const Renderer = createHookRenderer({ result });
        const setData = jest.fn();
        mountWithDi(<Renderer />, {
            deps: [
                ...defaultDeps,
                injectable(useState, createMockUseState({ setData }))
            ]
        });
        const onChange = Dimensions.addEventListener.mock.calls[0][1];

        expect(setData).not.toHaveBeenCalled();

        onChange({ first: 1, window: 2, other: 3 });

        expect(setData).toHaveBeenCalledTimes(1);
        expect(setData).toHaveBeenNthCalledWith(1, 2);
    });

    it('should remove listener', () => {
        let removeHandler;
        mockUseEffect.mockImplementation(fn => {
            removeHandler = fn();
        });
        const result = {};
        const Renderer = createHookRenderer({ result });
        const setData = jest.fn();
        mountWithDi(<Renderer />, {
            deps: [
                ...defaultDeps,
                injectable(useState, createMockUseState({ setData }))
            ]
        });

        expect(removeEventListener).not.toHaveBeenCalled();

        removeHandler();

        expect(removeEventListener).toHaveBeenCalledTimes(1);
    });
});
