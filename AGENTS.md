# AGENTS.md — `@codexporer.io/react-hooks`

## Package Overview
Collection of foundational React and React Native utility hooks: `usePrevious`, `useDimensions`, `useDomElementDimensions`, and `useOnMountEffect`.

## Peer Dependencies
```json
{
  "react": "*",
  "react-native": "*"
}
```

## TypeScript Contracts (`src/index.d.ts`)

```typescript
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
```

## Key Exports & Implementation Details
- **`usePrevious<T>(value: T): T | undefined`**:
  - Uses `useRef` updated in `useEffect`. Returns `ref.current`.
  - Returns `undefined` on initial mount.
- **`useDimensions(type: 'window' | 'screen'): ScaledSize`**:
  - Initializes state with `Dimensions.get(type)`.
  - Subscribes to `Dimensions.addEventListener('change', ...)` and updates state with `result[type]`. Cleans up with `handler.remove()`.
- **`useDomElementDimensions({ elementRef }): { width: number, height: number }`**:
  - Web-compatible hook reading `elementRef.current.offsetWidth` and `offsetHeight`.
  - Subscribes to `window.addEventListener('resize', ...)` and cleans up on unmount.
- **`useOnMountEffect({ onMount?, onUnmount? }): void`**:
  - Stores callbacks in a mutable ref (`dependenciesRef.current = { onMount, onUnmount }`) so callbacks always access the latest values without triggering re-runs.
  - Runs `onMount?.()` on mount and `onUnmount?.()` on cleanup in a single `useEffect(..., [])`.

## Critical Guidelines for AI Agents
- **`usePrevious`**: Ideal for checking transition flags (e.g. `const prevShouldOpen = usePrevious(shouldOpen)`). Expect `undefined` on the first render.
- **`useDimensions`**: Must pass `'window'` or `'screen'`. Do not call without a parameter.
- **`useOnMountEffect`**: Use in place of `useEffect(..., [])` when you need declarative mount and teardown handlers without ESLint exhaustive-deps warnings.
