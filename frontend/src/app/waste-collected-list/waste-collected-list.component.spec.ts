import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteCollectedListComponent } from './waste-collected-list.component';

describe('WasteCollectedListComponent', () => {
  let component: WasteCollectedListComponent;
  let fixture: ComponentFixture<WasteCollectedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasteCollectedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasteCollectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
