document$.subscribe(() => {
  if (typeof mermaid === "undefined") {
    return;
  }
  document.querySelectorAll(".mermaid-warmup").forEach((el) => el.remove());

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    fontFamily: 'Excalifont, cursive', // Use Excalifont
    layout: "elk",
    look: "handDrawn",
    theme: "base", // You can also try 'neutral', 'dark', 'forest', 'default'
    themeVariables: {
      'fontFamily': 'Excalifont, cursive',
      'fontSize': '16px',
      'primaryColor': '#ecccff',
      'primaryTextColor': '#000000',
      'primaryBorderColor': '#000000',
      'lineColor': '#000000',
      'textColor': '#000000',
      'handDrawnCurve': true // Enable hand-drawn style
    },
    flowchart: {
      curve: 'linear',
      htmlLabels: true,
      useMaxWidth: true,
    },
    sequence: {
      actorFontFamily: 'Excalifont, cursive',
      messageFrontFontFamily: 'Excalifont, cursive',
      noteFontFamily: 'Excalifont, cursive',
    },
  });

  const blocks = document.querySelectorAll("pre.mermaid:not(.mermaid-warmup)");

  blocks.forEach((block, index) => {
    const code = block.querySelector("code");
    const text = code ? code.textContent : block.textContent;
    const div = document.createElement("div");
    div.classList.add("mermaid");
    div.id = "mermaid-" + Date.now() + "-" + index;
    div.textContent = text || "";
    block.replaceWith(div);
  });

  Promise.allSettled([
      document.fonts.load("16px 'Excalifont'"),
      document.fonts.load("16px 'Cascadia Code'"),
      ]).then(() => {
        mermaid.run({
          querySelector: ".mermaid:not([data-processed])",
        }).then(() => {
          requestAnimationFrame(() => fixActorBoxPadding(12));
        }).catch((err) => {
          console.warn("Mermaid rendering error:", err);
          mermaid.run({
            querySelector: ".mermaid:not([data-processed])",
          }).then(() => {
            requestAnimationFrame(() => fixActorBoxPadding(12));
          }).catch((err) => {
          console.warn("Mermaid retry error:", err);
          });
        });
      });
});

/**
 * After Mermaid renders a sequence diagram, the actor/participant boxes may be sized using fallback-font metrics.
 * This function uses the live getBBox() of each rendered element to compute the true width, expands the surrounding
 * <rect>, and re-centers the label so every box has at least `padding` pixels of clear space.
 */
function fixActorBoxPadding(padding) {
  document.querySelectorAll("div.mermaid svg").forEach((svg) => {
    svg.querySelectorAll("rect.actor").forEach((rect) => {
      const g = rect.parentElement;
      if (!g) return;
      const text = g.querySelector("text");
      if (!text) return;

      let tBBox, rBBox;
      try {
        tBBox = text.getBBox();
        rBBox = rect.getBBox();
      } catch (e) {
        return;
      }

      if (tBBox.width === 0) return;

      const needed = tBBox.width + padding *2;
      if (needed <= rBBox.width) return; // already fits

      const extra = needed - rBBox.width;
      const newX = rBBox.x - extra / 2;
      rect.setAttribute("x", newX);
      rect.setAttribute("width", needed);

      // Re-center the text label inside the expanded box
      const centerX = newX + (needed / 2);
      text.setAttribute("x", centerX);
      text.querySelectorAll("tspan[x]").forEach((ts) => {
        ts.setAttribute("x", centerX);
      });
    });
  });
}
