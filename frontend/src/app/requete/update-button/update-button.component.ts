import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({

  selector: 'app-update-button',
  standalone: true,
  imports: [],
  templateUrl: './update-button.component.html',
  styleUrl: './update-button.component.css'

})
export class UpdateButtonComponent {
  @Input() entityId: bigint = 0n; // 'association', 'volunteer', etc.
  @Output() updateClicked = new EventEmitter<void>();

  onUpdateClicked() {
    console.log('Bouton de modification cliqué pour l\'entité ID:', this.entityId);
    this.updateClicked.emit();
  }
}
