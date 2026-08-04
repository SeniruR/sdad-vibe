# Deploy CeylonCart on Render (one Web Service)

Simplest option: **one URL** for frontend + API. No Postgres needed (in-memory DB).

## 1. Push code to GitHub

Make sure this folder is on GitHub (`main` branch).

## 2. Create Web Service on Render

1. Render Dashboard → **New** → **Web Service**
2. Connect your GitHub repo
3. Settings:

| Field | Value |
|-------|--------|
| **Name** | `ceyloncart` (any name) |
| **Root Directory** | `my-website` |
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
