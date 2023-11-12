import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndUpdateSpaceComponent } from './add-and-update-space.component';

describe('AddAndUpdateSpaceComponent', () => {
  let component: AddAndUpdateSpaceComponent;
  let fixture: ComponentFixture<AddAndUpdateSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddAndUpdateSpaceComponent]
    });
    fixture = TestBed.createComponent(AddAndUpdateSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
