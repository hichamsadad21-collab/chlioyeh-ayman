# Application MERN : examen pratique

## Objectif

Application full stack MERN (MongoDB, Express, HTML/CSS/JS, Node.js) qui permet d'afficher et d'ajouter des éléments. Le frontend est déployé sur Vercel, avec deux backends (Vercel et Cloudflare Workers) et une bascule automatique vers le backend de secours.

## Structure

```
backend/    API Node.js / Express / Mongoose
frontend/   Interface HTML, CSS, JavaScript natif
```

## Installation

```bash
git clone <URL_DU_DEPOT_GITHUB>
cd <nom-du-depot>/backend
npm install
```

Crée le fichier `backend/.env` à partir de `backend/.env.example`, puis renseigne tes valeurs. Ne commite jamais ce fichier.

## Variables d'environnement

| Variable | Description |
|---|---|
| `PORT` | Port local du serveur (défaut : 4001) |
| `MONGODB_URI` | URI de connexion MongoDB Atlas (secret) |

## Scripts (dans `backend/`)

| Commande | Rôle |
|---|---|
| `npm start` | Lance le serveur avec Node.js |
| `npm run hicham` | Lance le serveur avec nodemon (développement) |

## Lancer le frontend

Ouvre `frontend/index.html` avec Live Server (VS Code). Les URLs des backends sont dans `frontend/config.js`.

## Routes API

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/health` | Vérifie que l'API répond |
| GET | `/api/items` | Liste les éléments |
| POST | `/api/items` | Crée un élément (`name` requis, `description` optionnel) |

Codes HTTP : `200` succès, `201` création, `400` données invalides, `404` route inconnue, `500` erreur serveur, `503` base indisponible.

## Déploiement

| Service | URL |
|---|---|
| Dépôt GitHub | _à compléter_ |
| Frontend (Vercel) | _à compléter_ |
| Backend (Vercel) | _à compléter_ |
| Backend (Cloudflare) | _à compléter_ |

## Sécurité

- Aucun secret n'est commité (`.env` est dans `.gitignore`).
- Les secrets sont configurés dans les paramètres de Vercel et de Cloudflare.
- La règle réseau `0.0.0.0/0` d'Atlas sert uniquement à l'examen et doit être retirée après l'évaluation.