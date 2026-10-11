# AGENTS.md — `@codexporer.io/react-hooks`

## Package Overview
Collection of foundational React and React Native hooks: `usePrevious`, `useDimensions`, `useDomElementDimensions`, and `useOnMountEffect`.

## Key Exports
- `usePrevious(value)`: Returns previous render's value.
- `useDimensions('window' | 'screen')`: Returns reactive `ScaledSize`.
- `useDomElementDimensions({ elementRef })`: Returns `{ width, height }` for web elements.
- `useOnMountEffect({ onMount?, onUnmount? })`: Declarative lifecycle hook.

## Critical Guidelines for AI Agents
- Use `usePrevious` to compare transition states (e.g. `const prevShouldOpen = usePrevious(shouldOpen)`).
- Remember `useDimensions` takes a required parameter (`'window'` or `'screen'`).
- `useOnMountEffect` takes an object with optional `{ onMount, onUnmount }`, avoiding empty dependency array eslint warnings.
