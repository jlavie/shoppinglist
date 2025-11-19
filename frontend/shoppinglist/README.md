# Frontend - Shopping List Application

Application Angular moderne pour la gestion de menus hebdomadaires et listes de courses.

## 🚀 Démarrage

```bash
npm install
npm start
```

L'application est accessible sur `http://localhost:4200`

## 🏗️ Architecture

**Framework:** Angular 19 (Standalone Components)  
**Styling:** TailwindCSS 4.0 + Angular Material + DaisyUI  
**Design:** Palette pastel bleue moderne

## 📁 Structure des Composants

```
src/app/
├── dishes/                    # Module Recettes
│   ├── dishes.component.ts    # Page principale recettes
│   ├── dish-list/             # Liste des recettes
│   ├── dish-item/             # Détail d'une recette
│   ├── dish-new/              # Création/édition recette
│   └── dish.service.ts        # Service API recettes
│
├── ingredients/               # Module Ingrédients
│   ├── ingredients.component.ts
│   ├── ingredient-list/       # Liste avec recherche
│   ├── ingredient-item/       # Détail ingrédient
│   ├── ingredient-new/        # Création/édition
│   ├── ingredient-search/     # Barre de recherche
│   └── ingredient.service.ts
│
├── pages/                     # Pages principales
│   ├── login/                 # Connexion/Inscription
│   ├── front/menu/            # Planification menu
│   ├── admin/                 # Page admin
│   └── not-found/             # 404
│
├── weekly-menu/               # Planificateur hebdomadaire
│   ├── weekly-menu.component.ts
│   └── weekly-menu.service.ts
│
├── components/                # Composants réutilisables
│   ├── button/
│   ├── badge/
│   └── sign/
│
├── header/                    # En-tête navigation
├── guards/                    # Guards de routing
│   └── is-logged-in.guard.ts
├── interceptors/              # HTTP interceptors
│   └── auth.interceptor.ts
└── user/                      # Service utilisateur
    └── user.service.ts
```

## 🎨 Design System

### Couleurs (variables CSS)

```css
--primary-color: #A8DADC;           /* Bleu clair pastel */
--secondary-color: #457B9D;         /* Bleu moyen */
--secondary-color-hover: #305B76;   /* Bleu moyen foncé */
--white-color: #F5F9FC;             /* Blanc cassé bleuté */
--background-color: #F5F9FC;
--background-strong-color: #d9efff;
--title-color: #2a4d69;             /* Bleu foncé titres */
--paragraph-color: #666666;

--error-color: #ff686b;
--success-color: #84dcc6;
--info-color: #70d6ff;
```

### Typographie

- **Texte:** Montserrat (--text-font-family)
- **Titres:** Quicksand (--title-font-family)
- **Tailles:** 16px (texte), 40px (h1), 32px (h2), 24px (h3)

### Espacements

- **Small:** 6px
- **Medium:** 12px
- **Large:** 18px
- **XLarge:** 24px

### Radius

- **Small:** 8px
- **Medium:** 12px
- **Large:** 16px

## 🔌 Services

### DishService
Gestion des recettes via l'API backend.

```typescript
getAll()              // Récupérer toutes les recettes
getOne(id)            // Récupérer une recette
add(formData)         // Créer une recette
updateOne(id, dish)   // Modifier une recette
deleteOne(id)         // Supprimer une recette
```

### IngredientService
Gestion des ingrédients.

```typescript
getAll()              // Récupérer tous les ingrédients
getOne(id)            // Récupérer un ingrédient
add(ingredient)       // Créer un ingrédient
updateOne(id, data)   // Modifier un ingrédient
deleteOne(id)         // Supprimer un ingrédient
```

### WeeklyMenuService
Gestion du menu hebdomadaire.

```typescript
addDishToDay(day, dish)        // Ajouter un plat à un jour
removeDishFromDay(day, dishId) // Retirer un plat d'un jour
```

### IngredientsShoppingListService
Génération de la liste de courses.

```typescript
addIngredients(ingredients)     // Ajouter des ingrédients
removeIngredients(ingredients)  // Retirer des ingrédients
shoppingList                    // Signal avec la liste complète
```

### UserService
Authentification et gestion utilisateur.

```typescript
signup(email, password)   // Créer un compte
login(email, password)    // Se connecter
logout()                  // Se déconnecter
isAuthenticated()         // Vérifier l'authentification
```

## 🛣️ Routing

```typescript
/                  → Redirige vers /dish
/login             → Page de connexion
/register          → Page d'inscription
/dish              → Liste des recettes
/dish/:id          → Détail d'une recette
/ingredient        → Liste des ingrédients
/ingredient/:id    → Détail d'un ingrédient (protégé)
/menu              → Planification du menu hebdomadaire
/**                → Page 404
```

### Guards
- **isLoggedInGuard:** Protège les routes nécessitant une authentification

## 🔐 Authentification

L'application utilise JWT pour l'authentification :

1. Connexion via `UserService.login()`
2. Token stocké dans `localStorage`
3. Token ajouté automatiquement aux requêtes via `AuthInterceptor`
4. Vérification avec `isLoggedInGuard` sur les routes protégées

## 🎯 Fonctionnalités Principales

### 1. Gestion des Recettes
- Affichage en cartes avec images
- Création/édition avec formulaire
- Catégorisation (Pâtes, Viandes, Poissons, etc.)
- Niveau de difficulté (Facile, Moyen, Difficile)
- Budget (€, €€, €€€)
- Association d'ingrédients avec quantités

### 2. Gestion des Ingrédients
- Liste complète avec recherche
- Création/édition avec upload d'images
- Catégorisation et sous-catégorisation
- Unités de mesure (g, ml, unité, etc.)

### 3. Planification Menu
- Vue hebdomadaire (7 jours)
- **Drag & Drop** : Glisser-déposer les recettes dans le calendrier
- Génération automatique de la liste de courses
- Regroupement des ingrédients par catégorie

## 🎨 Composants Réutilisables

### ButtonComponent
Bouton personnalisé avec styles cohérents.

```html
<app-button [text]="'Valider'" [type]="'submit'" />
```

### BadgeComponent
Badge pour afficher des informations (difficulté, budget).

```html
<app-badge [text]="'Facile'" [color]="'success'" />
```

### SignComponent
Composant d'affichage stylisé pour les informations.

## 📦 Dépendances Principales

```json
{
  "@angular/core": "^19.1.0",
  "@angular/material": "^19.1.0",
  "@angular/cdk": "^19.1.3",
  "@angular/router": "^19.1.0",
  "@angular/forms": "^19.1.0",
  "tailwindcss": "^4.0.0",
  "date-fns": "^4.1.0"
}
```

## 🧪 Tests

Lancer les tests unitaires :
```bash
npm test
```

Génération du rapport de couverture :
```bash
ng test --code-coverage
```

## 🏗️ Build

### Développement
```bash
npm start
# ou
ng serve
```

### Production
```bash
npm run build
```

Les fichiers optimisés sont dans `dist/shoppinglist/browser/`

## 🎨 Personnalisation

### Modifier les Couleurs

Éditer `src/styles.css` et changer les variables CSS :root.

### Ajouter une Page

1. Créer le composant : `ng generate component pages/ma-page`
2. Ajouter la route dans `app.routes.ts`
3. Ajouter le lien dans le header si nécessaire

## 💡 Best Practices

### Signals
L'application utilise les **Signals Angular** pour la réactivité :

```typescript
// Dans un service
dishData = signal<Dish[]>([]);

// Dans un composant
dishes = computed(() => this.dishService.dishData());
```

### Standalone Components
Tous les composants sont standalone (pas de NgModule) :

```typescript
@Component({
  selector: 'app-dish-list',
  imports: [CommonModule, DishItemComponent],
  standalone: true
})
```

### Unsubscribe
Utiliser `takeUntilDestroyed()` pour éviter les fuites mémoire :

```typescript
constructor() {
  this.dishService.getAll()
    .pipe(takeUntilDestroyed())
    .subscribe();
}
```

## 🔄 État de l'Application

### Gestion des Données
- **Services avec Signals** pour les données réactives
- **HTTP Interceptors** pour l'authentification automatique
- **LocalStorage** pour la persistance du token

### Flow de Données

```
Component → Service → HTTP → Backend API
    ↑          ↓
    └── Signal ─┘
```

## 🐛 Debugging

### Activer les Source Maps
Les source maps sont activées par défaut en mode développement.

### Angular DevTools
Installer l'extension Angular DevTools pour Chrome/Edge pour inspecter les composants et leur état.

## 📝 Notes

- L'application utilise **OnPush change detection** pour de meilleures performances
- Les images sont servies depuis le backend : `http://localhost:3200/images/`
- Le drag & drop utilise `@angular/cdk/drag-drop`
- TailwindCSS 4.0 est chargé via CDN (mode browser) pour le développement
