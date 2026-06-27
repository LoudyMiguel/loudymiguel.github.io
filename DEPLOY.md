# 🚀 Deploy to GitHub Pages

This is a **static site** (no build step) — you just push the files and turn on Pages.

> ⚠️ **About the URL:** A GitHub *user* site must be named `<your-username>.github.io`.
> Your GitHub username is **`LoudyMiguel`**, so your free URL will be
> **`https://loudymiguel.github.io`** — *not* `torrejas.github.io`.
> `torrejas.github.io` would require a GitHub account literally named `torrejas`.
> (If you own a custom domain like `torrejas.com`, you can point it at this site later — see the bottom.)

---

## Option A — User site at `loudymiguel.github.io` (recommended)

### 1. Create the repository
On GitHub, create a **new repository** named **exactly**:

```
loudymiguel.github.io
```

Leave it empty (no README/license — you already have files).

### 2. Push your files
From this folder (`c:\My Portfolio`) in a terminal:

```bash
git init
git add .
git commit -m "Launch portfolio"
git branch -M main
git remote add origin https://github.com/LoudyMiguel/loudymiguel.github.io.git
git push -u origin main
```

### 3. Enable Pages
1. Repo → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **`main`**, folder: **`/ (root)`** → **Save**.
4. Wait ~1 minute. Your site is live at **https://loudymiguel.github.io** 🎉

---

## Option B — Project site (keeps your username site free)

Use this if you'd rather host it under a repo like `portfolio`:

1. Create a repo named `portfolio`.
2. Push the same way (just change the remote URL to `.../portfolio.git`).
3. Settings → Pages → Source: `main` / root.
4. Live at **https://loudymiguel.github.io/portfolio/**

> ⚠️ For Option B the URL has a subpath, but all asset links in this project are
> **relative** (`assets/...`, `css/...`, `js/...`), so they work either way. ✅

---

## Updating the site later
Every time you change files:

```bash
git add .
git commit -m "Update content"
git push
```

Pages redeploys automatically in under a minute.

---

## Adding your résumé
The Resume button links to `assets/Loudy_Miguel_Torrejas_CV.pdf`.
Drop your PDF there with that exact name (or edit the link in `index.html`),
then commit & push.

---

## Adding a profile photo
The hero currently shows an `LMT` monogram. To use a real photo:
1. Put the image at `assets/images/profile.jpg`.
2. In `index.html`, find the `<span class="monogram">LMT</span>` line and replace it with:
   ```html
   <img src="assets/images/profile.jpg" alt="Loudy Miguel Torrejas"
        style="width:100%;height:100%;object-fit:cover;" />
   ```

---

## (Optional) Custom domain — e.g. `torrejas.com`
If you buy a domain and want `torrejas.com` instead of the github.io URL:
1. Repo → Settings → Pages → **Custom domain** → enter `www.torrejas.com` → Save.
2. At your domain registrar, add a **CNAME** record pointing `www` → `loudymiguel.github.io`.
3. Tick **Enforce HTTPS** once the certificate is issued.

> Note: you **cannot** get `torrejas.github.io` this way — that subdomain is reserved
> for a GitHub account named `torrejas`. A custom domain you own is the way to get a
> "torrejas" web address.
