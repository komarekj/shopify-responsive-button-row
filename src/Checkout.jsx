import '@shopify/ui-extensions/preact';
import { render } from "preact";

// Number of buttons to render. Clamped to 1-10.
// Change this constant to adjust how many buttons appear in the row.
const BUTTON_COUNT = Math.min(10, Math.max(1, 10));

export default async () => {
  render(<Extension />, document.body);
};

function Extension() {
  const buttons = Array.from({ length: BUTTON_COUNT }, (_, i) => i + 1);

  // Equal-width columns keep every button on a single row at any viewport
  // width. "minmax(0, 1fr)" (not plain "1fr", which floors at the button's
  // intrinsic width and overflows) lets each column shrink evenly so 10
  // buttons always fit inside the card instead of spilling past its edge.
  const columns = Array.from({ length: BUTTON_COUNT }, () => "minmax(0, 1fr)").join(" ");

  return (
    <s-box border="base" borderWidth="base" borderRadius="base" padding="base">
      <s-grid gridTemplateColumns={columns} gap="small-300">
        {buttons.map((n) => (
          <s-clickable key={n} onClick={() => console.log(`Button clicked: ${n}`)}>
            <s-box border="base" borderRadius="base" padding="small-100">
              <s-stack direction="inline" justifyContent="center" alignItems="center">
                <s-text>{n}</s-text>
              </s-stack>
            </s-box>
          </s-clickable>
        ))}
      </s-grid>
    </s-box>
  );
}
