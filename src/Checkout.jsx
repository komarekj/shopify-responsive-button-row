import '@shopify/ui-extensions/preact';
import { render } from "preact";
import { useState } from "preact/hooks";

// Number of buttons to render. Clamped to 1-10.
// Change this constant to adjust how many buttons appear in the row.
const BUTTON_COUNT = Math.min(10, Math.max(1, 10));

export default async () => {
  render(<Extension />, document.body);
};

function Extension() {
  const buttons = Array.from({ length: BUTTON_COUNT }, (_, i) => i + 1);

  // Equal-width columns keep every button on a single row at any viewport
  // width. "minmax(0, 1fr)" (not plain "1fr", which floors at the child's
  // intrinsic width and overflows) lets each column shrink evenly so 10
  // buttons always fit inside the card instead of spilling past its edge.
  //
  // The buttons are custom s-clickable + s-box cells (NOT s-button, which has
  // a fixed minimum width and would overlap once there are many in a row).
  const columns = Array.from({ length: BUTTON_COUNT }, () => "minmax(0, 1fr)").join(" ");

  // Track which button is currently selected so it can be highlighted.
  const [selected, setSelected] = useState(null);

  /** @param {number} n */
  function handleClick(n) {
    setSelected(n);
    console.log(`Button clicked: ${n}`);
  }

  return (
    <s-box border="base" borderWidth="base" borderRadius="base" padding="base">
      <s-grid gridTemplateColumns={columns} gap="small-300">
        {buttons.map((n) => {
          const isSelected = selected === n;
          return (
            <s-clickable key={n} onClick={() => handleClick(n)}>
              {/* The box fill can only be gray (base/subdued/transparent), so
                  the selected state is signalled with color on the content: a
                  green check icon + bold green number, plus a thicker border. */}
              <s-box
                border="base"
                borderWidth={isSelected ? "large" : "base"}
                borderRadius="base"
                padding="small-100"
                background={isSelected ? "subdued" : "transparent"}
              >
                <s-stack direction="block" gap="small-500" alignItems="center">
                  {isSelected && <s-icon type="check" tone="success" size="base" />}
                  <s-text type={isSelected ? "strong" : undefined} tone={isSelected ? "success" : "auto"}>
                    {n}
                  </s-text>
                </s-stack>
              </s-box>
            </s-clickable>
          );
        })}
      </s-grid>
    </s-box>
  );
}
