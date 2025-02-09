import { Routes } from '@angular/router';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { IngredientItemComponent } from './ingredients/ingredient-item/ingredient-item.component';
import { DishesComponent } from './dishes/dishes.component';
import { DishItemComponent } from './dishes/dish-item/dish-item.component';
import { LoginComponent } from './pages/login/login.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { MenuComponent } from './pages/front/menu/menu.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dish',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: LoginComponent
    },
    {
        path: 'ingredient',
        component: IngredientsComponent
    },
    {
        path: 'ingredient/:id',
        component: IngredientItemComponent,
        canActivate: [isLoggedInGuard]
    },
    {
        path: 'menu',
        component: MenuComponent
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
