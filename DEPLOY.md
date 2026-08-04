# Deploy CeylonCart on Render (one Web Service)

Simplest option: **one URL** for frontend + API. No Postgres needed (in-memory DB).

## 1. Push code to GitHub

Hosting files must be on the branch Render deploys (usually `main`).

If hosting changes are only on your feature branch:

```bash
git checkout main
git pull
git merge feature/seniru   # or your branch with hosting commits
git push origin main
```

Or in Render → **Settings** → set **Branch** to `feature/seniru` temporarily.

## 2. Create Web Service on Render

1. Render Dashboard → **New** → **Web Service**
2. Connect your GitHub repo
3. Settings:

| Field | Value |
|-------|--------|
| **Name** | `ceyloncart` (any name) |
| **Branch** | `main` (must include hosting commits — see below) |
| **Root Directory** | *(leave blank)* — repo root is already the app |
| **Runtime** | Node |
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |
| **Instance** | Free |

4. Click **Deploy**

## 3. Open your app

After deploy finishes, open:

`https://YOUR-SERVICE-NAME.onrender.com`

Test API: `https://YOUR-SERVICE-NAME.onrender.com/api/health`

## Demo accounts

- Admin: `admin@ceyloncart.lk` / `admin123`
- Customer: `customer@ceyloncart.lk` / `customer123`

## Notes

- Free tier sleeps after ~15 min idle — first load may take 30–60s
- In-memory data resets when the service restarts
- Local dev is unchanged: run `server` + `client` separately as before

## Optional: Static Site + Web Service (2 URLs)

Only if you prefer split hosting:

1. **Web Service** — Root: `my-website/server`, Build: `npm install`, Start: `npm start`
2. **Static Site** — Root: `my-website/client`, Build: `npm install && npm run build`, Publish: `dist`  
   Env: `VITE_API_URL=https://YOUR-API.onrender.com/api`  
   Rewrite: `/*` → `/index.html`
