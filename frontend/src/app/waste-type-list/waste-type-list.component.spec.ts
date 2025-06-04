import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteTypeListComponent } from './waste-type-list.component';

describe('WasteTypeListComponent', () => {
  let component: WasteTypeListComponent;
  let fixture: ComponentFixture<WasteTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasteTypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasteTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
