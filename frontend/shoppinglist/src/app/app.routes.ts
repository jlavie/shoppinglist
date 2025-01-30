import { Routes } from '@angular/router';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { IngredientItemComponent } from './ingredients/ingredient-item/ingredient-item.component';
import { DishesComponent } from './dishes/dishes.component';
import { DishItemComponent } from './dishes/dish-item/dish-item.component';

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
        path: 'dish',
        component: DishesComponent
    },
    {
        path: 'dish/:id',
        component: DishItemComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
