# Contract: section mount

Every home section follows the same contract so cleanup and scoping are uniform.

```ts
type Mount<T> = (root: HTMLElement, data: T, env: { reduce: boolean }) => () => void;
```

- The mount renders all of its markup inside `root` and reads elements only through `root`.
- It never writes to `document.body` or `window` state, except listeners registered with its own `AbortController`.
- Every `requestAnimationFrame`, interval, timeout, `IntersectionObserver` and `ResizeObserver` it starts is stopped by the returned function.
- The returned function leaves `root` empty.
- Loops run only while the section is on screen and the tab is visible.
- With `reduce: true` it renders the finished state and starts no movement.

The React side:

```tsx
<section className="home-wallet" ref={useMount(mountWallet, wallet)} />
```
