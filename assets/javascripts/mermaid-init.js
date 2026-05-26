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
      document.fonts.load("16px 'Cascadia'"),
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
          console.warn("Mermaid retry error:", err2);
          });
        });
      });
});
