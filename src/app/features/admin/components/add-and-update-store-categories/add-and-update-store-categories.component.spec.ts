import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndUpdateStoreCategoriesComponent } from './add-and-update-store-categories.component';

describe('AddAndUpdateStoreCategoriesComponent', () => {
  let component: AddAndUpdateStoreCategoriesComponent;
  let fixture: ComponentFixture<AddAndUpdateStoreCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddAndUpdateStoreCategoriesComponent]
    });
    fixture = TestBed.createComponent(AddAndUpdateStoreCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
