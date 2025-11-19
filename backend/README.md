# Backend API - Shopping List

API REST pour l'application de gestion de menus et liste de courses.

## 🚀 Démarrage Rapide

```bash
npm install
node server.js
```

Le serveur démarre sur `http://localhost:3200`

## 📁 Structure

```
backend/
├── controllers/        # Logique métier des endpoints
│   ├── dish.js        # CRUD recettes
│   ├── ingredient.js  # CRUD ingrédients
│   ├── menu.js        # Gestion menus
│   └── user.js        # Authentification
├── models/            # Schémas MongoDB
│   ├── dish.js
│   ├── ingredient.js
│   ├── menu.js
│   └── user.js
├── routes/            # Définition des routes
├── middleware/        # Authentification & upload
├── images/            # Stockage des images
├── app.js            # Configuration Express
└── server.js         # Point d'entrée
```

## 🗄️ Modèles de Données

### User
```javascript
{
  email: String (unique),
  password: String (hashé avec bcrypt)
}
```

### Ingredient
```javascript
{
  name: String,
  category: String,
  subCategory: String,
  unit: String,
  image: String (URL)
}
```

### Dish
```javascript
{
  title: String,
  description: String,
  image: String (URL),
  category: String,
  difficulty: String,
  budget: String,
  ingredients: [{
    _id: ObjectId (référence Ingredient),
    quantity: Number
  }]
}
```

### Menu
```javascript
{
  date: String (YYYY-MM-DD, unique),
  dish: [{
    _id: ObjectId (référence Dish)
  }]
}
```

## 🔌 API Endpoints

### Authentification

#### POST `/api/auth/signup`
Créer un nouveau compte utilisateur.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Réponse (201):**
```json
{
  "message": "Utilisateur créé !"
}
```

#### POST `/api/auth/login`
Se connecter et obtenir un token JWT.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Réponse (200):**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Recettes (Dishes)

#### GET `/api/dish/all`
Récupérer toutes les recettes.

**Réponse (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Spaghetti Carbonara",
    "description": "Recette italienne traditionnelle",
    "image": "http://localhost:3200/images/dish/...",
    "category": "Pâtes",
    "difficulty": "Facile",
    "budget": "€",
    "ingredients": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "quantity": 200
      }
    ]
  }
]
```

#### GET `/api/dish/:id`
Récupérer une recette spécifique avec les détails des ingrédients (populated).

**Réponse (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Spaghetti Carbonara",
  "ingredients": [
    {
      "_id": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Spaghetti",
        "category": "Pâtes",
        "unit": "g"
      },
      "quantity": 200
    }
  ]
}
```

#### POST `/api/dish`
Créer une nouvelle recette.

**Content-Type:** `multipart/form-data`

**Body:**
- `title`: String
- `description`: String
- `category`: String
- `difficulty`: String
- `budget`: String
- `ingredients`: String (JSON stringifié)
- `image`: File

**Réponse (201):**
```json
{
  "message": "Recette créée !",
  "dish": { ... }
}
```

#### PATCH `/api/dish/:id`
Modifier une recette existante.

**Content-Type:** `multipart/form-data`

**Body:** (tous les champs optionnels)
- `title`: String
- `description`: String
- `category`: String
- `difficulty`: String
- `budget`: String
- `ingredients`: String (JSON stringifié)
- `image`: File

**Réponse (200):**
```json
{
  "message": "Recette modifiée !"
}
```

#### DELETE `/api/dish/:id`
Supprimer une recette.

**Réponse (200):**
```json
{
  "message": "Recette supprimée !"
}
```

---

### Ingrédients

#### GET `/api/ingredient/all`
Récupérer tous les ingrédients.

**Réponse (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Spaghetti",
    "category": "Pâtes",
    "subCategory": "Pâtes sèches",
    "unit": "g",
    "image": "http://localhost:3200/images/ingredient/..."
  }
]
```

#### GET `/api/ingredient/:id`
Récupérer un ingrédient spécifique.

#### POST `/api/ingredient`
Créer un nouvel ingrédient.

**Content-Type:** `multipart/form-data`

**Body:**
- `name`: String
- `category`: String
- `subCategory`: String
- `unit`: String
- `file`: File (image)

**Réponse (201):**
```json
{
  "message": "Ingrédient créé !"
}
```

#### PATCH `/api/ingredient/:id`
Modifier un ingrédient.

#### DELETE `/api/ingredient/:id`
Supprimer un ingrédient.

---

### Menus

#### POST `/api/menu/save`
Sauvegarder ou mettre à jour un menu pour une date donnée.

**Body:**
```json
{
  "date": "2025-11-19",
  "dish": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439013"]
}
```

**Réponse (200):**
```json
{
  "message": "Menu sauvegardé avec succès",
  "menu": { ... }
}
```

#### GET `/api/menu/day/:date`
Récupérer le menu pour une date spécifique (avec détails des plats).

**Exemple:** `GET /api/menu/day/2025-11-19`

**Réponse (200):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "date": "2025-11-19",
  "dish": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Spaghetti Carbonara",
      "description": "...",
      "image": "...",
      "ingredients": [...]
    }
  ]
}
```

---

## 🔐 Authentification

L'API utilise **JWT (JSON Web Tokens)** pour l'authentification.

Pour les routes protégées, incluez le token dans l'en-tête :
```
Authorization: Bearer <token>
```

Le middleware d'authentification est dans `middleware/auth.js`.

## 📤 Upload d'Images

Les images sont gérées avec **Multer**.

- Configuration : `middleware/multer-config.js`
- Destination : `images/dish/` ou `images/ingredient/`
- Formats acceptés : JPEG, JPG, PNG

Les images sont ensuite accessibles via : `http://localhost:3200/images/<type>/<filename>`

## 🔧 Configuration

### Variables d'Environnement

Créer un fichier `.env` (optionnel) :
```env
JWT_SECRET=monSuperSecretKey123
MONGO_URI=mongodb://localhost:27017/shoppinglist
PORT=3200
```

### Base de Données

MongoDB doit être démarrée localement ou utiliser MongoDB Atlas.

Connection string par défaut : `mongodb://127.0.0.1:27017/shoppinglist`

## 🛠️ Dépendances

```json
{
  "express": "^4.21.2",
  "mongoose": "^8.9.5",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2",
  "multer": "^1.4.5-lts.1",
  "mongoose-unique-validator": "^4.0.1"
}
```

## 🧪 Tests

*(À implémenter)*

```bash
npm test
```

## 🚨 Codes d'Erreur Courants

- **400** : Requête invalide (champs manquants ou format incorrect)
- **401** : Non authentifié (token manquant ou invalide)
- **404** : Ressource non trouvée
- **500** : Erreur serveur

## 📝 Notes

- Les mots de passe sont hashés avec **bcrypt** (10 rounds de salting)
- Les tokens JWT expirent après **24 heures**
- CORS est activé pour toutes les origines (à restreindre en production)
- Les images sont stockées localement (envisager un CDN pour la production)
