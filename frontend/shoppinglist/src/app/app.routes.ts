import { Routes } from '@angular/router';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { IngredientItemComponent } from './ingredients/ingredient-item/ingredient-item.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: IngredientsComponent
    },
    {
        path: 'ingredient/:id',
        component: IngredientItemComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
