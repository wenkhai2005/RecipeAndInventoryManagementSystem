import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/userInventory';
@Component({
  selector: 'app-delete-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './delete-inventory.html',
  styleUrls: ['./delete-inventory.css']
})
export class DeleteInventoryComponent {
  inventories: Inventory[] = [];
  selectedInventoryId: string = '';
  private modalService = inject(NgbModal);

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getInventories().subscribe((data: any) => {
      this.inventories = data.inventories || [];
    });
  }

  openConfirmationDialog(content: any) {
    if (!this.selectedInventoryId) return;

    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    modalRef.result
      .then((result) => {
        if (result === 'yes') this.deleteInventory();
      })
      .catch(() => {});
  }

  deleteInventory() {
    this.inventoryService.deleteInventory(this.selectedInventoryId).subscribe({
      next: () => {
        alert('Inventory deleted successfully!');
        this.inventories = this.inventories.filter(
          (item) => item.inventoryId !== this.selectedInventoryId
        );
        this.selectedInventoryId = '';
      },
      error: (err) => {
        console.error('Error deleting inventory:', err);
        alert('Failed to delete inventory. Please try again.');
      }
    });
  }
}
