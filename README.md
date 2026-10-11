# `@codexporer.io/react-hooks`

Essential cross-platform React and React Native utility hooks for component lifecycle, previous value tracking, screen dimensions, and element measurement.

## Installation & Peer Dependencies

```bash
yarn add @codexporer.io/react-hooks
```

Peer dependencies:
- `react` (`*`)
- `react-native` (`*`)

## Quick Start

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {
  usePrevious,
  useDimensions,
  useOnMountEffect
} from '@codexporer.io/react-hooks';

export function DemoComponent({ count }: { count: number }) {
  const previousCount = usePrevious(count);
  const windowDimensions = useDimensions('window');

  useOnMountEffect({
    onMount: () => console.log('Component mounted'),
    onUnmount: () => console.log('Component unmounted')
  });

  return (
    <View style={{ width: windowDimensions.width }}>
      <Text>Current: {count}, Previous: {previousCount}</Text>
      <Text>Screen Width: {windowDimensions.width}</Text>
    </View>
  );
}
```

## API Reference

### `usePrevious<T>(value: T): T | undefined`
Stores and returns the value of a prop or state from the previous render cycle via a ref. Returns `undefined` on initial mount.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `value` | `T` | The current value to track |

### `useDimensions(type: 'window' | 'screen'): ScaledSize`
Subscribes to React Native `Dimensions` changes and updates component state whenever window or screen dimensions change (e.g. orientation rotation, split screen).

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `'window' \| 'screen'` | — | Dimension target to monitor |

### `useDomElementDimensions(props): { width: number; height: number }`
Web-compatible hook that measures dimensions of a DOM element using `ResizeObserver` / `getBoundingClientRect`.

| Property | Type | Description |
| :--- | :--- | :--- |
| `elementRef` | `{ current: HTMLElement \| null }` | React ref attached to the target DOM element |

### `useOnMountEffect(props): void`
Declarative mount and unmount lifecycle hook wrapping `useEffect(..., [])`.

| Property | Type | Description |
| :--- | :--- | :--- |
| `onMount` | `() => void` | Callback executed on initial component mount |
| `onUnmount` | `() => void` | Callback executed when component unmounts |

## License

MIT
