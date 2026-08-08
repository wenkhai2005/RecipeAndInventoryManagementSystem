import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

import { AddUser } from './components/add-user/register';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';

import { AddRecipeComponent } from './components/add-recipe/add-recipe';
import { DeleteRecipeComponent } from './components/delete-recipe/delete-recipe';
import { ChooseRecipeComponent } from './components/choose-recipe/choose-recipe';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe';
import { AllRecipesComponent } from './components/all-recipe/all-recipe';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe';
import { AiAnalysisComponent } from './components/ai-analysis/ai-analysis';
import { TranslationComponent } from './components/language-translation/language-translation';

import { AllInventoryComponent } from './components/all-inventory/all-inventory';
import { AddInventoryComponent } from './components/add-inventory/add-inventory';
import { ChooseInventoryComponent } from './components/choose-inventory/choose-inventory';
import { EditInventoryComponent } from './components/edit-inventory/edit-inventory';
import { DeleteInventoryComponent } from './components/delete-inventory/delete-inventory';

import { AccessDenied } from './components/access-denied/access-denied';
import { ErrorPageComponent } from './components/error-page/error-page';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard-34389792', pathMatch: 'full' },
  { path: 'dashboard-34389792', component: DashboardComponent },

  { path: 'login-34389792', component: LoginComponent },
  { path: 'register-34389792', component: AddUser },

  { path: 'recipes-34389792', component: AllRecipesComponent, canActivate: [authGuard], data: { roles: ['chef'] } },
  { path: 'add-recipe-34389792', component: AddRecipeComponent, canActivate: [authGuard], data: { roles: ['chef'] } },
  { path: 'delete-recipe-34389792', component: DeleteRecipeComponent, canActivate: [authGuard], data: { roles: ['chef'] } },
  { path: 'choose-recipe-34389792', component: ChooseRecipeComponent, canActivate: [authGuard], data: { roles: ['chef'] } },
  { path: 'edit-recipe-34389792/:id', component: EditRecipeComponent, canActivate: [authGuard], data: { roles: ['chef'] } },
  { path: 'view-recipe-34389792/:id', component: ViewRecipeComponent, canActivate: [authGuard], data: { roles: ['chef'] } },
  { path: 'ai-analysis-34389792/:id', component: AiAnalysisComponent, canActivate: [authGuard], data: { roles: ['chef'] } },
  { path: 'translate-recipe-34389792/:id', component: TranslationComponent, canActivate: [authGuard], data: { roles: ['chef'] } },


  { path: 'inventory-34389792', component: AllInventoryComponent, canActivate: [authGuard], data: { roles: ['admin', 'chef', 'manager'] } },
  { path: 'add-inventory-34389792', component: AddInventoryComponent, canActivate: [authGuard], data: { roles: ['admin', 'chef', 'manager'] } },
  { path: 'choose-inventory-34389792', component: ChooseInventoryComponent, canActivate: [authGuard], data: { roles: ['admin', 'chef', 'manager'] } },
  { path: 'edit-inventory-34389792/:id', component: EditInventoryComponent, canActivate: [authGuard], data: { roles: ['admin', 'chef', 'manager'] } },
  { path: 'delete-inventory-34389792', component: DeleteInventoryComponent, canActivate: [authGuard], data: { roles: ['admin', 'chef', 'manager'] } },

  { path: 'access-denied', component: AccessDenied },
  { path: '**', component: ErrorPageComponent }
];
