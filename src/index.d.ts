import type { ScaledSize } from 'react-native';

export declare function usePrevious<T>(value: T): T | undefined;

export declare function useDimensions(type: 'window' | 'screen'): ScaledSize;

export declare function useDomElementDimensions(props: {
    elementRef: { current: HTMLElement | null };
}): { width: number; height: number };

export declare function useOnMountEffect(props: {
    onMount?: () => void;
    onUnmount?: () => void;
}): void;
