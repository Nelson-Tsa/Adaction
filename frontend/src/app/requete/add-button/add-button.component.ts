import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  standalone: true,
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent {
  @Input() entityType: string = ''; // 'association', 'volunteer', etc.
  @Output() addClicked = new EventEmitter<void>();

  onClick() {
    this.addClicked.emit();
  }
}
