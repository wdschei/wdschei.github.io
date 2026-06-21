from __future__ import annotations

from pathlib import Path
from typing import Any

_MERMAID_WARMUP_HTML = (
    '<pre class="mermaid mermaid-warmup"'
    ' style="height: 0; overflow: hidden; margin: 0; padding: 0; border: none; opacity: 0; pointer-events: none;">'
    '<code>flowchart TD</code>'
    '</pre>\n'
)

def on_page_content(html, page, config, files, **kwargs):
    """Inject a warmup <pre class="mermaid"> element at the beginning of the page content to ensure that Mermaid is loaded before any diagrams are rendered."""
    if "mermaid" not in html.lower():
        return html
    return _MERMAID_WARMUP_HTML + html
