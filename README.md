# wdschei.TheScheideggers.com (wdschei.github.io)

This is my personal portfolio website, built with ~MkDocs~[ProperDocs](https://properdocs.org/) and the [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) theme.

## Local Development

To run this project locally, you'll need Python 3.11 or higher installed.

### 1. Clone the repository
```bash
git clone https://github.com/wdschei/wdschei.github.io.git
cd wdschei.github.io
```

### 2. Install dependencies
It is recommended to use a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Run the development server
Start the live-reloading server:
```bash
properdocs serve --strict --livereload -f mkdocs.yml
```
The site will be available at `http://localhost:8000`.

## Building the Site

To generate the static HTML files:
```bash
properdocs build --strict -f mkdocs.yml
```
The output will be in the `site/` directory.

## Deployment

This project is automatically deployed to GitHub Pages via GitHub Actions whenever changes are pushed to the `main` branch.
See `.github/workflows/deploy.yml` for the workflow configuration.

## Project Structure

- `requirements.txt`: Python dependencies.
- `mkdocs.yml`: The configuration file for the site.
- `docs/`: Contains the markdown source files.
