import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntityFormComponent } from '../requete/entity-form/entity-form.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  
  constructor(private dialog: MatDialog) { }
  
  openEntityForm(entityType: string, entity?: any): Observable<any> {
    return this.dialog.open(EntityFormComponent, {
      width: '500px',
      data: { entityType, entity }
    }).afterClosed();
  }
}