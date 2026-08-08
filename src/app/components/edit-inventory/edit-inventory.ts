import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-inventory.html',
  styleUrls: ['./edit-inventory.css'],
})
export class EditInventoryComponent {
  inventory: any = {};
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (this.id) {
      this.inventoryService.getInventoryById(this.id).subscribe({
        next: (data: any) => {
          this.inventory = {
            ...data,
            purchaseDate: data.purchaseDate
              ? data.purchaseDate.substring(0, 10)
              : '',
            expirationDate: data.expirationDate
              ? data.expirationDate.substring(0, 10)
              : '',
          };
        },
        error: (err) => console.error('Error loading inventory:', err),
      });
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.inventoryService.updateInventory(this.id, this.inventory).subscribe({
      next: () => {
        alert('Inventory updated successfully!');
        this.router.navigate(['/inventory-34389792']);
      },
      error: (err) => {
        console.error('Error updating inventory:', err);
        alert('Failed to update inventory.');
      },
    });
  }
}
