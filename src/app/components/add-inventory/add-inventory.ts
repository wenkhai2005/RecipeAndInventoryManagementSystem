import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';


@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-inventory.html',
  styleUrls: ['./add-inventory.css']
})
export class AddInventoryComponent {
  inventory: any = {
    userId: '',
    ingredientName: '',
    quantity: 0,
    unit: '',
    category: '',
    purchaseDate: '',
    expirationDate: '',
    location: '',
    cost: 0
  };

  successMessage = '';
  errorMessage = '';

  constructor(private inventoryService: InventoryService, private router: Router) {}

  addInventory(form: NgForm) {
    if (form.invalid) return;

    this.inventoryService.createInventory(this.inventory).subscribe({
      next: () => {
        this.successMessage = 'Inventory item added successfully!';
        this.errorMessage = '';
        this.router.navigate(['/inventory-34389792']);

        form.resetForm();
      },
      error: (err) => {
        const backendMsg = err.error?.message || 'Failed to add inventory item.';
        console.error('Add inventory error:', backendMsg);

        if (backendMsg.includes('Duplicate')) {
          this.errorMessage =
            'An inventory item with this ingredient already exists for this user.';
        } else if (backendMsg.includes('userId format')) {
          this.errorMessage = 'Invalid User ID format. Use U-XXXXX (5 digits).';
        } else if (backendMsg.includes('User ID not found')) {
          this.errorMessage =
            'This User ID does not exist. Please register first.';
        } else {
          this.errorMessage = backendMsg;
        }

        this.successMessage = '';
      }
    });
  }
}
