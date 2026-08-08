import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { RecipeService } from '../../services/recipe.service';
import { InventoryService } from '../../services/inventory.service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent {
  constructor(
    public userService: UserService,
    public recipeService: RecipeService,
    public inventoryService: InventoryService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login-34389792']);
      return;
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadAllData();
      });

    this.loadAllData();
  }

  private loadAllData() {
    this.userService.loadUsers();
    this.recipeService.loadRecipes();
    this.inventoryService.loadInventories();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login-34389792']);
  }

  get users() {
    return this.userService.users;
  }

  get recipes() {
    return this.recipeService.recipes;
  }

  get inventories() {
    return this.inventoryService.inventories;
  }
}
