import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectListComponent } from './collect-list.component';

describe('CollectListComponent', () => {
  let component: CollectListComponent;
  let fixture: ComponentFixture<CollectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
