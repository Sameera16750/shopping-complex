import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndUpdateStoreOwnerComponent } from './add-and-update-store-owner.component';

describe('AddAndUpdateStoreOwnerComponent', () => {
  let component: AddAndUpdateStoreOwnerComponent;
  let fixture: ComponentFixture<AddAndUpdateStoreOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddAndUpdateStoreOwnerComponent]
    });
    fixture = TestBed.createComponent(AddAndUpdateStoreOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
