# Responsive Button Row — Shopify Checkout UI Extension

A small [Shopify checkout UI extension](https://shopify.dev/docs/api/checkout-ui-extensions)
that renders **1–10 equal-width buttons in a single row** inside a bordered card.
The buttons shrink evenly as the viewport narrows, so they **always stay on one
line** — they never wrap and never overflow the card. Clicking a button selects
it and highlights it.

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

## Selection state

Clicking a button marks it as selected and highlights it prominently — a green
check icon appears above a bold, green (`success` tone) number, on a `subdued`
background with a thicker (`large`) border.

Note: the box fill can only be gray (`s-box background` accepts just
`base`/`subdued`/`transparent`), so the color in the highlight comes from the
icon and text, not a colored fill. A colored *filled* button would require
`s-button variant="primary"`, but `s-button` has a fixed minimum width and
overlaps once several sit in one row — which is exactly what this layout avoids.

Selection is tracked with a `useState` hook and the clicked value
is logged to the console — replace the body of `handleClick` in
`src/Checkout.jsx` to wire it up to your own logic:

```jsx
const [selected, setSelected] = useState(null);

function handleClick(n) {
  setSelected(n);
  console.log(`Button clicked: ${n}`);
}
```

## Customizing

- **Highlight style** — the selected cell combines `background="subdued"`,
  `borderWidth="large"`, a green check `s-icon`, and a bold `s-text`
  (`type="strong"` + `tone="success"`). Tune any of these on the inner
  `s-box` / `s-text` / `s-icon`. Valid values: `background` —
  `base`/`subdued`/`transparent`; `borderWidth` — `base`/`large`; `tone` —
  `auto`/`neutral`/`info`/`success`/`warning`/`critical`.

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
