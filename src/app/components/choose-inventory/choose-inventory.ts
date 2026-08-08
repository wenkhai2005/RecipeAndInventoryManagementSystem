import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-choose-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './choose-inventory.html',
  styleUrls: ['./choose-inventory.css'],
})
export class ChooseInventoryComponent {
  inventories: any[] = [];
  selectedId: string = '';

  constructor(private inventoryService: InventoryService, private router: Router) {}

  ngOnInit() {
    this.inventoryService.getInventories().subscribe({
      next: (data: any) => (this.inventories = data.inventories || []),
      error: (err) => console.error('Error loading inventories:', err),
    });

  }

  onConfirm() {
    if (this.selectedId) {
      this.router.navigate([`/edit-inventory-34389792/${this.selectedId}`]);
    }
  }
}
