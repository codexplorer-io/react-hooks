import React, { useRef, useEffect } from 'react';
import { injectable } from 'react-magnetic-di';
import { mountWithDi } from '@codexporer.io/react-test-utils';
import { usePrevious } from './index';

describe('usePrevious', () => {
    const createHookRenderer = ({ result, value }) => () => {
        const hookResult = usePrevious(value);
        result.value = hookResult;
        return null;
    };

    const mockUseEffect = fn => fn();
    const mockUseRef = jest.fn().mockReturnValue({ current: null });

    const defaultDeps = [
        injectable(useEffect, mockUseEffect),
        injectable(useRef, mockUseRef)
    ];

    it('should return value', () => {
        const result = {};
        const Renderer = createHookRenderer({ result, value: 'mockValue' });

        mountWithDi(<Renderer />, {
            deps: defaultDeps
        });

        expect(result.value).toBe('mockValue');
    });
});
