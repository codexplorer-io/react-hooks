import { act } from 'react-dom/test-utils';
import { runHookWithDi } from '@codexporer.io/react-test-utils';
import { useOnMountEffect } from './index';

describe('useOnMountEffect', () => {
    const defaultProps = {
        onMount: jest.fn(),
        onUnmount: jest.fn()
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call onMount only after component is mounted', () => {
        const props = { ...defaultProps };

        const hookRunner = runHookWithDi(
            () => useOnMountEffect(props)
        );

        expect(defaultProps.onMount).toHaveBeenCalledTimes(1);
        expect(props.onMount).toHaveBeenCalledTimes(1);
        expect(defaultProps.onUnmount).not.toHaveBeenCalled();

        act(() => {
            hookRunner.update();
        });

        expect(defaultProps.onMount).toHaveBeenCalledTimes(1);
        expect(props.onMount).toHaveBeenCalledTimes(1);
        expect(defaultProps.onUnmount).not.toHaveBeenCalled();

        props.onMount = jest.fn();

        act(() => {
            hookRunner.update();
        });

        expect(defaultProps.onMount).toHaveBeenCalledTimes(1);
        expect(props.onMount).not.toHaveBeenCalled();
        expect(defaultProps.onUnmount).not.toHaveBeenCalled();
    });

    it('should not call onMount if not passed', () => {
        const props = { ...defaultProps, onMount: undefined };

        runHookWithDi(
            () => useOnMountEffect(props)
        );

        expect(defaultProps.onMount).not.toHaveBeenCalled();
        expect(defaultProps.onUnmount).not.toHaveBeenCalled();
    });

    it('should call onUnmount when component is unmounted', () => {
        const props = { ...defaultProps };

        const hookRunner = runHookWithDi(
            () => useOnMountEffect(props)
        );

        expect(defaultProps.onUnmount).not.toHaveBeenCalled();
        expect(props.onUnmount).not.toHaveBeenCalled();
        expect(defaultProps.onMount).toHaveBeenCalledTimes(1);

        act(() => {
            hookRunner.unmount();
        });

        expect(defaultProps.onUnmount).toHaveBeenCalledTimes(1);
        expect(props.onUnmount).toHaveBeenCalledTimes(1);
        expect(defaultProps.onMount).toHaveBeenCalledTimes(1);
    });

    it('should not call onUnmount if not passed', () => {
        const props = { ...defaultProps, onUnmount: undefined };

        const hookRunner = runHookWithDi(
            () => useOnMountEffect(props)
        );

        act(() => {
            hookRunner.unmount();
        });

        expect(defaultProps.onUnmount).not.toHaveBeenCalled();
        expect(defaultProps.onMount).toHaveBeenCalledTimes(1);
    });
});
