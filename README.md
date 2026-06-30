# Responsive Button Row — Shopify Checkout UI Extension

A small [Shopify checkout UI extension](https://shopify.dev/docs/api/checkout-ui-extensions)
that renders **1–10 equal-width buttons in a single row** inside a bordered card.
The buttons shrink evenly as the viewport narrows, so they **always stay on one
line** — they never wrap and never overflow the card.

Built with Preact and [Polaris web components](https://shopify.dev/docs/api/checkout-ui-extensions/latest/polaris-web-components)
(`s-grid`, `s-clickable`, `s-box`), targeting API version **2026-01**.

```
┌────────────────────────────────────────────────┐
│  [ 1 ] [ 2 ] [ 3 ] [ 4 ] [ 5 ] ... [ 10 ]       │
└────────────────────────────────────────────────┘
```

## How it works

The row is a CSS grid with one column per button:

```js
const columns = Array.from({ length: BUTTON_COUNT }, () => "minmax(0, 1fr)").join(" ");
```

The important detail is **`minmax(0, 1fr)`** rather than plain `1fr`. A bare `1fr`
track is really `minmax(auto, 1fr)`, and the `auto` floor is the child's intrinsic
width — so with many buttons the row grows wider than its container and overflows.
`minmax(0, 1fr)` removes that floor, letting every column shrink equally so the
whole row always fits.

Each button is an `s-clickable` wrapping an `s-box` (instead of `s-button`, which
enforces a minimum width that would overlap at narrow sizes). This gives full
control over sizing so the cells divide the available width evenly.

## Using it in your app

1. Copy this folder into your Shopify app's `extensions/` directory (e.g.
   `extensions/responsive-button-row/`).
2. From your app root, run the dev server and select a store/app to preview:

   ```bash
   shopify app dev
   ```

   The CLI assigns a `uid` in `shopify.extension.toml` automatically on first run.
3. In the checkout editor, add the **responsive-button-row** block wherever you
   want it to appear.
4. To ship it:

   ```bash
   shopify app deploy
   ```

> Requires the Shopify CLI and an app with checkout extensibility. See the
> [getting started guide](https://shopify.dev/docs/apps/checkout).

## Configuration

The number of buttons is a single constant at the top of `src/Checkout.jsx`,
clamped to the 1–10 range:

```js
const BUTTON_COUNT = Math.min(10, Math.max(1, 10)); // change the last number
```

## Customizing

- **Click handling** — each button logs to the console; replace the handler in
  `src/Checkout.jsx`:

  ```jsx
  <s-clickable onClick={() => console.log(`Button clicked: ${n}`)}>
  ```

- **Spacing** — change the grid `gap` (`small-300` by default; `small-400`,
  `small-500`, or `none` for tighter rows).
- **Labels** — the buttons render the number `n`; swap `{n}` for any content.

## Project structure

```
shopify.extension.toml   Extension config + target
src/Checkout.jsx         The component
shopify.d.ts             Type declaration for the extension API
tsconfig.json            TypeScript config
locales/                 Translatable strings
```

## License

[MIT](./LICENSE)
