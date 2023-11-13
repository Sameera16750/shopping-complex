import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndUpdateContractorComponent } from './add-and-update-contractor.component';

describe('AddAndUpdateContractorComponent', () => {
  let component: AddAndUpdateContractorComponent;
  let fixture: ComponentFixture<AddAndUpdateContractorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddAndUpdateContractorComponent]
    });
    fixture = TestBed.createComponent(AddAndUpdateContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
