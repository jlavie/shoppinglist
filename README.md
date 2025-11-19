# 🍽️ Shopping List - Application de Gestion de Menus et Liste de Courses

Une application web moderne pour planifier vos menus hebdomadaires et générer automatiquement vos listes de courses, vous permettant de faire vos achats de manière efficace et économique.

![Angular](https://img.shields.io/badge/Angular-19.1-red?logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-blue?logo=tailwindcss)

## ✨ Fonctionnalités

- 📝 **Gestion des recettes** : Créez, modifiez et organisez vos recettes avec images, catégories, et niveau de difficulté
- 🥕 **Gestion des ingrédients** : Base de données d'ingrédients avec recherche et filtrage
- 📅 **Planification hebdomadaire** : Glissez-déposez vos recettes dans un calendrier hebdomadaire
- 🛒 **Liste de courses automatique** : Génération automatique de la liste de courses basée sur votre menu
- 🔐 **Authentification sécurisée** : Système de connexion avec JWT pour protéger vos données
- 🎨 **Interface moderne** : Design épuré avec palette de couleurs pastel bleue

## 🏗️ Architecture

### Frontend
- **Framework** : Angular 19 (standalone components)
- **Styling** : TailwindCSS 4.0 + Angular Material + DaisyUI
- **Fonctionnalités** : 
  - Drag & Drop (Angular CDK)
  - Signals pour la réactivité
  - Routing avec guards d'authentification
  - Responsive design

### Backend
- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : MongoDB (Mongoose ODM)
- **Sécurité** : 
  - JWT pour l'authentification
  - Bcrypt pour le hashage des mots de passe
  - CORS configuré
- **Upload d'images** : Multer

### Structure du Projet

```
shoppinglist/
├── backend/              # API Node.js/Express
│   ├── controllers/      # Logique métier
│   ├── models/          # Modèles MongoDB
│   ├── routes/          # Définition des routes
│   ├── middleware/      # Middlewares (auth, multer)
│   └── images/          # Stockage des images uploadées
│
└── frontend/
    └── shoppinglist/    # Application Angular
        └── src/
            └── app/
                ├── dishes/          # Module recettes
                ├── ingredients/     # Module ingrédients
                ├── weekly-menu/     # Module menu hebdomadaire
                ├── pages/           # Pages (login, menu)
                ├── components/      # Composants réutilisables
                └── guards/          # Guards de navigation
```

## 🚀 Installation et Démarrage

### Prérequis

- **Node.js** : Version 18.x ou supérieure
- **MongoDB** : Version 6.x ou supérieure (local ou MongoDB Atlas)
- **npm** : Version 9.x ou supérieure

### 1. Cloner le Repository

```bash
git clone <repository-url>
cd shoppinglist
```

### 2. Configuration Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` à la racine du dossier backend (optionnel, les valeurs par défaut fonctionnent) :
```env
JWT_SECRET=monSuperSecretKey123
MONGO_URI=mongodb://localhost:27017/shoppinglist
PORT=3200
```

Démarrer MongoDB localement (si vous utilisez une installation locale) :
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongodb
```

Lancer le serveur backend :
```bash
# Mode développement (avec nodemon)
npm run dev

# OU mode production
node server.js
```

Le serveur démarre sur `http://localhost:3200`

### 3. Configuration Frontend

```bash
cd frontend/shoppinglist
npm install
```

Lancer l'application Angular :
```bash
npm start
# ou
ng serve
```

L'application est accessible sur `http://localhost:4200`

## 📚 API Endpoints

Le backend expose une API REST sur le port **3200** :

### Authentification
- `POST /api/auth/signup` - Créer un compte
- `POST /api/auth/login` - Se connecter

### Recettes (Dishes)
- `GET /api/dish/all` - Récupérer toutes les recettes
- `GET /api/dish/:id` - Récupérer une recette
- `POST /api/dish` - Créer une recette (avec image)
- `PATCH /api/dish/:id` - Modifier une recette
- `DELETE /api/dish/:id` - Supprimer une recette

### Ingrédients
- `GET /api/ingredient/all` - Récupérer tous les ingrédients
- `GET /api/ingredient/:id` - Récupérer un ingrédient
- `POST /api/ingredient` - Créer un ingrédient (avec image)
- `PATCH /api/ingredient/:id` - Modifier un ingrédient
- `DELETE /api/ingredient/:id` - Supprimer un ingrédient

### Menus
- `GET /api/menu/all` - Récupérer tous les menus
- `POST /api/menu` - Créer/mettre à jour un menu
- `GET /api/menu/:date` - Récupérer un menu par date
- `DELETE /api/menu/:id` - Supprimer un menu

> 📖 Pour plus de détails sur l'API, consultez [backend/README.md](backend/README.md)

## 🎨 Design System

L'application utilise une palette de couleurs pastel bleue moderne :

- **Couleur primaire** : `#A8DADC` (bleu clair pastel)
- **Couleur secondaire** : `#457B9D` (bleu moyen)
- **Arrière-plan** : `#F5F9FC` (blanc cassé bleuté)
- **Titres** : `#2a4d69` (bleu foncé)

Typographie :
- **Texte** : Montserrat
- **Titres** : Quicksand

## 🧪 Tests

### Frontend
```bash
cd frontend/shoppinglist
npm test
```

### Backend
```bash
cd backend
npm test
```

## 📦 Build Production

### Frontend
```bash
cd frontend/shoppinglist
npm run build
```

Les fichiers optimisés sont générés dans `frontend/shoppinglist/dist/`

### Backend
Le backend peut être déployé directement avec Node.js. Assurez-vous de configurer les variables d'environnement en production.

## 🛠️ Scripts Disponibles

### Backend
- `npm run dev` - Démarre le serveur avec nodemon (rechargement auto)
- `node server.js` - Démarre le serveur en mode production

### Frontend
- `npm start` - Lance le serveur de développement (port 4200)
- `npm run build` - Build de production
- `npm test` - Lance les tests unitaires
- `ng serve` - Alternative pour lancer le serveur de dev

## 🗺️ Roadmap

- [ ] Export PDF de la liste de courses
- [ ] Gestion du budget avec prix des ingrédients
- [ ] Informations nutritionnelles des recettes
- [ ] Suggestions de recettes intelligentes
- [ ] Mode sombre
- [ ] Application mobile (PWA)
- [ ] Partage de menus entre utilisateurs

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines.

## 📄 Licence

Ce projet est sous licence MIT.

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Développé avec ❤️ pour simplifier la planification des repas et les courses**
