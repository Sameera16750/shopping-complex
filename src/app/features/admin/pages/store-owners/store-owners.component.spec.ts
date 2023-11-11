import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOwnersComponent } from './store-owners.component';

describe('StoreOwnersComponent', () => {
  let component: StoreOwnersComponent;
  let fixture: ComponentFixture<StoreOwnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreOwnersComponent]
    });
    fixture = TestBed.createComponent(StoreOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
