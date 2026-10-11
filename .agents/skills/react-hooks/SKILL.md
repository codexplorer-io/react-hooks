---
name: react-hooks
description: Instructions and guidelines for using @codexporer.io/react-hooks (React Hooks) in React Native and Expo applications.
---

# `@codexporer.io/react-hooks` Skill

## Overview
`@codexporer.io/react-hooks` provides cross-platform utility hooks for tracking previous values, managing mount/unmount lifecycles, and subscribing to screen dimension changes.

---

## When to Use
- Comparing current vs previous props or state (`usePrevious`).
- Subscribing to screen or window dimension changes (`useDimensions`).
- Running initial mount or teardown logic cleanly (`useOnMountEffect`).

---

## Usage Examples

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { usePrevious, useDimensions, useOnMountEffect } from '@codexporer.io/react-hooks';

export function ScreenMonitor({ activeStep }: { activeStep: number }) {
  const prevStep = usePrevious(activeStep);
  const { width, height } = useDimensions('window');

  useOnMountEffect({
    onMount: () => console.log('Mounted'),
    onUnmount: () => console.log('Cleaned up')
  });

  return (
    <View style={{ width, height }}>
      <Text>Step changed from {prevStep} to {activeStep}</Text>
    </View>
  );
}
```

---

## API Reference

### `usePrevious<T>(value: T): T | undefined`
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `value` | `T` | Current value |
| **Returns** | `T \| undefined` | Value from previous render |

### `useDimensions(type: 'window' | 'screen'): ScaledSize`
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `type` | `'window' \| 'screen'` | Dimensions target |
| **Returns** | `{ width: number, height: number, scale: number, fontScale: number }` | Dimensions object |

### `useOnMountEffect(props): void`
| Option | Type | Description |
| :--- | :--- | :--- |
| `onMount` | `() => void` | Runs once when component mounts |
| `onUnmount` | `() => void` | Runs once when component unmounts |

---

## Critical Rules & Guidelines
1. **Pass Target to `useDimensions`**: Must supply either `'window'` or `'screen'`.
2. **First Render Undefined**: Be aware that `usePrevious` returns `undefined` on the very first render.
