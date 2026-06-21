import mkdocs_gen_files
import logging

from pathlib import Path
from typing import Any

IMAGE_EXT = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg"}
IMAGES_DIR = Path("src/main/docs/site/assets/images/ExcaliDraw") # relative to the project root, since the mkdocs_gen_files executes from where the mkdocs/properdocs command is executes.
IMAGES_FILE = "assets/images/ExcaliDraw/index.md"  # relative to the docs root and mkdocs_gen_files will place it in the correct location.

log = logging.getLogger(f"mkdocs.plugins.{__name__}")

def generate_excalidraw_thumbnails() -> None:
    """Generate an ExcaliDraw Image Gallery with thumbnails of all images matching assets/images/ExcaliDraw"""
    if not IMAGES_DIR.exists():
        log.warning(f"Skipping since {IMAGES_DIR} does not exist.")
        return

    image_files = sorted(
        [
            p
            for p in IMAGES_DIR.iterdir()
            if p.is_file() and p.suffix.lower() in IMAGE_EXT
        ],
        key=lambda p: p.name.casefold(),
    )

    if not image_files:
        log.warning(f"Skipping since no images exist in {IMAGES_DIR}.")
        return

    log.info(f"Generating Image Gallery to {IMAGES_FILE}.")
    with mkdocs_gen_files.open(IMAGES_FILE, "w", encoding="utf-8") as f:
        print("# Image Gallery", file=f)
        print("", file=f)
        print("Click any thumbnail to open the full-size image.", file=f)
        print("", file=f)

        for image_path in image_files:
            safe_name = image_path.name.replace("`", "")
            alt_text = image_path.stem.replace("_", " ").replace("-", " ")
            # Since Thumbnails.html is in assets/images/, use just the filename as the relative path.
            rel_path = f"./{safe_name}"
            print(f'<p style="margin: 0 0 2rem 0;"><a href="{rel_path}"><img src="{rel_path}" alt="{alt_text}" width="480"/></a><br/><code>{safe_name}</code></p>\n', file=f)

generate_excalidraw_thumbnails()
