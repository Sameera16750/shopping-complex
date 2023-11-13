import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndUpdateMaintenanceComponent } from './add-and-update-maintenance.component';

describe('AddAndUpdateMaintanenceComponent', () => {
  let component: AddAndUpdateMaintenanceComponent;
  let fixture: ComponentFixture<AddAndUpdateMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddAndUpdateMaintenanceComponent]
    });
    fixture = TestBed.createComponent(AddAndUpdateMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
