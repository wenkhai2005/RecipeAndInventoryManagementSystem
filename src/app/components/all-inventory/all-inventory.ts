import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../services/inventory.service';
import { ExpiredInventoriesPipe } from '../../pipes/expired-inventory-pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-inventory',
  standalone: true,
  imports: [CommonModule, ExpiredInventoriesPipe, RouterModule],
  templateUrl: './all-inventory.html',
  styleUrls: ['./all-inventory.css'],
})
export class AllInventoryComponent {
  inventories: any[] = [];
  lowStock: any[] = [];
  totalValue: number = 0;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getInventories().subscribe({
      next: (data: any) => {

        this.inventories = data.inventories || [];
        this.lowStock = data.lowStock || [];
        this.totalValue = data.totalValue || 0;
      },
      error: (err) => {
        console.error('Error loading inventory:', err);
      },
    });
  }
}
