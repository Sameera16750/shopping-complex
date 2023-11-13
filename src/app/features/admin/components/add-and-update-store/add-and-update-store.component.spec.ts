import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndUpdateStoreComponent } from './add-and-update-store.component';

describe('AddAndUpdateStoreComponent', () => {
  let component: AddAndUpdateStoreComponent;
  let fixture: ComponentFixture<AddAndUpdateStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddAndUpdateStoreComponent]
    });
    fixture = TestBed.createComponent(AddAndUpdateStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
