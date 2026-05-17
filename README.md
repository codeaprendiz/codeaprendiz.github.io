## Static Portfolio Website Using Github Pages

## Run Locally

**Option 1 — Named Docker volume (gems managed by Docker):**

```bash
docker run --rm -it \
  --platform linux/amd64 \
  -v "$PWD:/srv/jekyll" \
  -v jekyll-gems:/usr/local/bundle \
  -p 4000:4000 \
  jekyll/jekyll:latest \
  jekyll serve --watch
```

**Option 2 — Local folder cache (gems visible in repo, ignored by git):**

```bash
docker run --rm -it \
  --platform linux/amd64 \
  -v "$PWD:/srv/jekyll" \
  -v "$PWD/.jekyll-bundle:/usr/local/bundle" \
  -p 4000:4000 \
  jekyll/jekyll:latest \
  jekyll serve --watch
```

Open http://localhost:4000
