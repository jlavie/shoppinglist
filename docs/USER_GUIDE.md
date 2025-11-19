# 📖 Guide Utilisateur - Shopping List

Bienvenue dans **Shopping List**, votre assistant personnel pour planifier vos menus de la semaine et générer automatiquement vos listes de courses !

## 🎯 Qu'est-ce que Shopping List ?

Shopping List est une application web qui vous aide à :
- 📝 Organiser vos recettes favorites
- 📅 Planifier vos menus hebdomadaires
- 🛒 Générer automatiquement votre liste de courses
- 💰 Faire des économies en optimisant vos achats

## 🚀 Premier Pas

### 1. Créer un Compte

1. Ouvrez l'application dans votre navigateur : `http://localhost:4200`
2. Cliquez sur **"S'inscrire"** ou naviguez vers `/register`
3. Entrez votre adresse email et créez un mot de passe
4. Cliquez sur **"Créer un compte"**

![Inscription](../assets/screenshots/signup.png)

### 2. Se Connecter

1. Sur la page de connexion (`/login`)
2. Entrez vos identifiants (email et mot de passe)
3. Cliquez sur **"Se connecter"**
4. Vous êtes redirigé vers la page des recettes

![Connexion](../assets/screenshots/login.png)

## 🥕 Gérer les Ingrédients

### Consulter la Liste des Ingrédients

1. Cliquez sur **"Ingrédients"** dans le menu de navigation
2. Vous voyez tous les ingrédients disponibles
3. Utilisez la **barre de recherche** pour trouver un ingrédient spécifique

### Ajouter un Nouvel Ingrédient

1. Sur la page **Ingrédients**, cliquez sur le bouton **"+ Nouvel ingrédient"**
2. Remplissez le formulaire :
   - **Nom** : ex. "Tomates"
   - **Catégorie** : ex. "Légumes"
   - **Sous-catégorie** : ex. "Légumes frais"
   - **Unité** : ex. "g", "ml", "unité"
   - **Image** : Uploadez une photo (optionnel)
3. Cliquez sur **"Ajouter"**

![Ajout ingrédient](../assets/screenshots/add-ingredient.png)

### Modifier un Ingrédient

1. Cliquez sur un ingrédient dans la liste
2. Vous accédez à la page de détail
3. Modifiez les informations souhaitées
4. Cliquez sur **"Sauvegarder"**

### Supprimer un Ingrédient

1. Sur la page de détail d'un ingrédient
2. Cliquez sur le bouton **"Supprimer"**
3. Confirmez la suppression

> ⚠️ **Attention** : Supprimer un ingrédient le retirera de toutes les recettes qui l'utilisent.

## 🍽️ Gérer les Recettes

### Consulter les Recettes

1. Cliquez sur **"Recettes"** dans le menu (ou allez sur `/dish`)
2. Toutes vos recettes s'affichent sous forme de cartes
3. Chaque carte affiche :
   - Photo du plat
   - Nom de la recette
   - Catégorie (Pâtes, Viandes, Poissons, etc.)
   - Difficulté (Facile, Moyen, Difficile)
   - Budget (€, €€, €€€)

![Liste recettes](../assets/screenshots/dish-list.png)

### Créer une Nouvelle Recette

1. Sur la page **Recettes**, cliquez sur **"+ Nouvelle recette"**
2. Remplissez le formulaire :
   - **Titre** : Nom de votre recette
   - **Description** : Instructions de préparation
   - **Catégorie** : Type de plat (Pâtes, Viandes, Soupes, etc.)
   - **Difficulté** : Facile, Moyen ou Difficile
   - **Budget** : €, €€ ou €€€
   - **Image** : Photo du plat
3. **Ajouter les ingrédients** :
   - Sélectionnez un ingrédient dans la liste
   - Entrez la quantité nécessaire
   - Cliquez sur **"Ajouter"**
   - Répétez pour chaque ingrédient
4. Cliquez sur **"Créer la recette"**

![Création recette](../assets/screenshots/create-dish.png)

### Voir le Détail d'une Recette

1. Cliquez sur une recette dans la liste
2. Vous accédez à la page de détail avec :
   - Photo grande taille
   - Description complète
   - Liste des ingrédients avec quantités
   - Infos : catégorie, difficulté, budget

### Modifier une Recette

1. Sur la page de détail d'une recette
2. Cliquez sur **"Modifier"**
3. Changez les informations souhaitées
4. Cliquez sur **"Sauvegarder"**

### Supprimer une Recette

1. Sur la page de détail
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

## 📅 Planifier le Menu de la Semaine

C'est la fonctionnalité principale de l'application !

### Vue Menu Hebdomadaire

1. Cliquez sur **"Menu"** dans la navigation (`/menu`)
2. Vous voyez :
   - À gauche : **Liste de toutes vos recettes**
   - À droite : **Calendrier de la semaine** (Lundi à Dimanche)

![Menu hebdomadaire](../assets/screenshots/weekly-menu.png)

### Ajouter une Recette à un Jour

**Méthode 1 : Drag & Drop (Glisser-Déposer)**
1. Cliquez et maintenez sur une recette dans la liste de gauche
2. Glissez la recette vers le jour souhaité
3. Relâchez pour l'ajouter au jour

**Méthode 2 : Clic**
1. Cliquez sur une recette
2. Sélectionnez le jour dans le menu déroulant
3. Validez

### Retirer une Recette d'un Jour

1. Sur le calendrier, cliquez sur la recette à retirer
2. Glissez-la en dehors du calendrier
3. Ou cliquez sur l'icône de suppression (🗑️)

### Réorganiser les Recettes

Vous pouvez glisser-déposer les recettes :
- D'un jour à un autre
- Pour changer l'ordre dans la même journée

## 🛒 Générer la Liste de Courses

### Fonctionnement Automatique

La liste de courses se génère **automatiquement** en fonction de votre menu hebdomadaire !

1. Une fois votre menu planifié
2. Tous les ingrédients des recettes sont ajoutés à la liste
3. Les quantités sont **automatiquement additionnées** si le même ingrédient apparaît plusieurs fois

**Exemple :**
- Lundi : Spaghetti Carbonara (200g de pâtes)
- Mercredi : Pâtes au pesto (150g de pâtes)
- **Liste de courses** : Pâtes - 350g

### Consulter la Liste de Courses

1. Sur la page **Menu**, la liste de courses s'affiche automatiquement
2. Les ingrédients sont **regroupés par catégorie** :
   - 🥖 Féculents
   - 🥕 Légumes
   - 🥩 Viandes et Poissons
   - 🥛 Produits laitiers
   - etc.

![Liste de courses](../assets/screenshots/shopping-list.png)

### Exporter la Liste

*(Fonctionnalité à venir)*
- Export PDF pour imprimer
- Envoi par email
- Partage sur mobile

## 💡 Conseils et Astuces

### Optimiser ses Courses

1. **Planifiez en avance** : Créez votre menu le dimanche pour la semaine suivante
2. **Réutilisez les ingrédients** : Choisissez des recettes qui partagent des ingrédients
3. **Variez les plats** : Alternez pâtes, viandes, poissons, végétarien

### Bien Organiser ses Recettes

1. **Utilisez des catégories claires** : Pâtes, Soupes, Salades, etc.
2. **Indiquez la difficulté** : Réservez les plats difficiles pour le weekend
3. **Notez le budget** : Équilibrez les plats chers et économiques

### Gérer les Portions

- Les quantités dans les recettes sont généralement **pour 4 personnes**
- Ajustez mentalement selon votre nombre de convives
- *(Calculateur de portions à venir)*

## 🔧 Paramètres et Préférences

### Se Déconnecter

1. Cliquez sur votre nom ou icône utilisateur
2. Sélectionnez **"Déconnexion"**

### Modifier son Mot de Passe

*(Fonctionnalité à venir)*

## ❓ FAQ

**Q : Puis-je utiliser l'application sans connexion Internet ?**  
A : Pour l'instant, non. Une version PWA hors ligne est prévue.

**Q : Mes données sont-elles sécurisées ?**  
A : Oui, les mots de passe sont hashés avec bcrypt et l'authentification utilise JWT.

**Q : Puis-je partager mes recettes avec d'autres utilisateurs ?**  
A : Pas encore, mais c'est prévu dans les prochaines mises à jour.

**Q : L'application est-elle disponible sur mobile ?**  
A : L'interface web est responsive et fonctionne sur mobile. Une app native est en projet.

**Q : Combien de recettes puis-je créer ?**  
A : Il n'y a pas de limite !

## 🐛 Problèmes Courants

### Je n'arrive pas à me connecter
- Vérifiez votre email et mot de passe
- Assurez-vous d'avoir créé un compte
- Essayez de vider le cache du navigateur

### Les images ne s'affichent pas
- Vérifiez que le backend est bien démarré sur le port 3200
- Vérifiez les permissions du dossier `backend/images/`

### La liste de courses ne se génère pas
- Assurez-vous d'avoir ajouté au moins une recette au menu
- Vérifiez que les recettes contiennent des ingrédients

## 📧 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez le support à : support@shoppinglist.app *(à venir)*

---

**Bon appétit et bonnes courses ! 🍽️🛒**
