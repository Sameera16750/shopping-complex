import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndUpdateFloorComponent } from './add-and-update-floor.component';

describe('AddAndUpdateFloorComponent', () => {
  let component: AddAndUpdateFloorComponent;
  let fixture: ComponentFixture<AddAndUpdateFloorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddAndUpdateFloorComponent]
    });
    fixture = TestBed.createComponent(AddAndUpdateFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
