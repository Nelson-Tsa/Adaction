import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.css'
})
export class DeleteButtonComponent {
  @Input() entityId: bigint = 0n; // 'association', 'volunteer', etc.
  @Output() deleteClicked = new EventEmitter<void>();

  onDeleteClicked() {
    console.log('Bouton de suppression cliqué pour l\'entité ID:', this.entityId);
    this.deleteClicked.emit();
  }
}
